# Auditoría de Seguridad y Performance — ventrix-gutenberg-blocks

- **Fecha:** 2026-10-26
- **Rama auditada:** `master` (commit `610bbc3`)
- **Versión del plugin:** 3.18.0
- **Alcance:** PHP de `/src` y archivo principal `cafeto-gutenberg-blocks.php`. Del JS solo se revisaron sinks de HTML (`innerHTML`, `dangerouslySetInnerHTML`, etc.).
- **Referencias:** WordPress Coding Standards (WPCS), WordPress Plugin Security Handbook, buenas prácticas de PHP.
- **Modalidad:** revisión estática de solo lectura; no se modificó código.

## Resumen

| Área | Severidad | Cantidad |
|---|---|---|
| Seguridad | Alto | 1 |
| Seguridad | Medio | 2 |
| Seguridad | Bajo | 5 |
| Performance | — | 5 grupos |
| Estándares WP/PHP | — | 11 |

**Recomendación general:** corregir **S1** antes del próximo release; es el único hallazgo con riesgo real de fuga de datos.

---

## Estado de la auditoría anterior (2026-08-03)

| # | Hallazgo previo | Estado |
|---|---|---|
| 1 | SSRF en proxy AJAX | ✅ Corregido (capability + nonce + lista de dominios permitidos, sin `nopriv`) |
| 2 | Enumeración de usuarios vía REST | ✅ Corregido (requiere `edit_posts`; ver S6) |
| 3 | SQL injection en `get_table_columns` | ✅ Corregido (`prepare` + `esc_sql`) |
| 4–6 | XSS en contenido / ACF | ✅ Contenido pasa por `wp_kses_post` |
| 7 | SVG inline sin sanear | ✅ `cafeto_sanitize_inline_svg` |
| 8 | CORS `.local` con credenciales | ⚠️ Acotado a rutas del plugin, pero sigue activo en producción (S4) |
| 10 | `/ventrix/v1/current-site` público | ⚠️ Sin cambios (S5) |

---

## SEGURIDAD

### S1 — ALTO: El bloque `salaries_careers` puede mostrar cualquier tabla de la BD en el frontend

**Archivos:** `src/blocks/salaries_careers/inc/helpers.php:32-44`, `:185-236`; `src/blocks/salaries_careers/inc/proxy_api.php:23-54`
**Categoría:** OWASP A01:2021 – Broken Access Control / exposición de datos sensibles

`cafeto_get_block_data()` toma `selectedTable` y `selectedColumns` de los atributos del bloque. Solo valida que la tabla exista con el prefijo `$wpdb->prefix` y que las columnas existan en ella. No hay lista de tablas permitidas.

**Escenario de explotación:** un usuario con rol **Contributor** inserta el bloque con:

```json
{ "selectedTable": "users",
  "selectedColumns": [{"name":"user_login"},{"name":"user_email"},{"name":"user_pass"}] }
```

Como `wp_users` no tiene columna `asset_url`, el `SELECT` no se filtra y la vista previa muestra hashes de contraseña y correos de **todos** los usuarios. Un **Author** puede publicarlo para el público. Los endpoints `GET /salaries-careers/v1/tables` y `/columns` (solo requieren `edit_posts`) le entregan el mapa del esquema.

**Fix requerido:**

```php
function cafeto_salaries_allowed_tables() {
    return apply_filters( 'cafeto_salaries_allowed_tables', array(
        'salary_standard', 'salary_bridge', 'salary_geo',
        'career_standard', 'career_bridge',
    ) );
}

// En cafeto_get_block_data(), get_wordpress_tables(), get_table_columns()
// y check_salaries_table_has_data():
if ( ! in_array( $selected_table, cafeto_salaries_allowed_tables(), true ) ) {
    return new WP_Error( 'invalid_table', 'Table not allowed.' );
}
```

Opcional: lista de columnas permitidas o denegadas (`user_pass`, `user_email`, `option_value`, …).

---

### S2 — MEDIO: Ruptura del `<script>` JSON-LD (XSS almacenado)

**Archivo:** `src/blocks/edumed_rankings/render.php:365-367`, `:394`
**Categoría:** OWASP A03:2021 – Injection (XSS)

`vtx_build_rankings_schema_item()` aplica `wp_strip_all_tags()` y **después** `html_entity_decode()`. `vtx_render_rankings_schema_script()` codifica con `JSON_UNESCAPED_SLASHES` y sin `JSON_HEX_TAG`.

**Escenario:** un título o primer párrafo de un ranking con `&lt;/script&gt;&lt;img src=x onerror=alert(1)&gt;` sobrevive al strip, se decodifica a `</script><img …>` y queda literal dentro de `<script type="application/ld+json">`, cerrando el bloque y ejecutando HTML arbitrario. Afecta a quien edite rankings sin `unfiltered_html` (multisite o `DISALLOW_UNFILTERED_HTML`).

**Fix requerido:**

```php
return '<script type="application/ld+json">'
    . wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP )
    . '</script>';
```

---

### S3 — MEDIO: `site-info.php` borra el grupo ACF en cada request y depende de `HTTP_HOST`

**Archivo:** `src/includes/acf_fields/site-info.php:14-37`, `:106`

- La función está enganchada a `acf/include_fields`, que corre en **cada request**. Cada vez consulta `acf_get_field()` y puede ejecutar `acf_delete_field_group()`: operación destructiva + carga de BD constante.
- El registro del grupo depende de `$_SERVER['HTTP_HOST']`, controlado por el cliente. En WP-CLI, cron sin Host o dominios no reconocidos el grupo no se registra y `VENTRIX_CURRENT_SITE` cae en silencio a `edumed`.

**Fix sugerido:** registrar el grupo local sin borrar nada (ACF ya prioriza el JSON/local sobre BD) y eliminar la condición por dominio, o reemplazarla por `wp_get_environment_type()` / una constante en `wp-config.php`.

---

### S4 — BAJO: CORS de desarrollo activo en producción

**Archivo:** `src/blocks/salaries_careers/inc/proxy_api.php:122-152`

Refleja cualquier origen `http://*.local` con `Access-Control-Allow-Credentials: true` y refleja `Access-Control-Request-Headers` sin validar.

**Fix:** envolver la función en `if ( 'local' !== wp_get_environment_type() ) { return; }`.

### S5 — BAJO: `/ventrix/v1/current-site` público

**Archivo:** `cafeto-gutenberg-blocks.php:337-344`

Expone configuración interna. Si solo lo consume el editor, usar `permission_callback` con `current_user_can( 'edit_posts' )`.

### S6 — BAJO: `/cafeto/v1/users` devuelve todos los usuarios (incluidos admins)

**Archivo:** `src/blocks/testimonial-card/inc/class-users-api.php:68-84`

Cualquier Contributor recibe la lista completa, sin paginación. Limitar con `role__in` o `has_published_posts` y paginar (ver también P4).

### S7 — BAJO: `/cafeto/v1/salary-data` público y sin caché

**Archivo:** `src/blocks/salary_table/inc/class-salary-api.php:60-134`

- Transients comentadas: cada petición anónima ejecuta `SHOW TABLES` + `SELECT *` → vector de abuso/DoS.
- `SHOW TABLES LIKE '$table_name'` interpolado sin `prepare` (nombre constante, no explotable, pero incumple WPCS).
- `/salary-data/refresh` no declara `args` ni valida `state`.

### S8 — BAJO: Salida sin escapar

- `cafeto-gutenberg-blocks.php:116` — `implode()` en aviso de admin sin `esc_html` (hoy valores estáticos).
- `src/blocks/accordion-item/save.js:12-22` — `headingLink` y `headingText` interpolados en `dangerouslySetInnerHTML` sin validar la URL. Hoy lo mitiga `kses` al guardar para usuarios sin `unfiltered_html`.

---

## PERFORMANCE

### P1 — Registro de bloques costoso en cada request

**Archivo:** `cafeto-gutenberg-blocks.php:163-212`

- `scandir` + `file_get_contents` + `json_decode` de cada `block.json` en cada request; luego `register_block_type()` vuelve a leer el mismo archivo.
- `require_once` de **todos** los `render.php` en `init`, en cada request, haya o no bloques en la página (incluye los archivos grandes de rankings y `proxy_api.php`).

**Recomendación:** `wp_register_block_metadata_collection()` con `blocks-manifest.php` (WP 6.7+, `wp-scripts build-blocks-manifest`) y carga diferida de includes dentro del render callback.

### P2 — Consultas de rankings sin límite y caché inefectiva

**Archivos:** `src/blocks/{edumed,omd,phds,psd}_rankings/inc/*.php`

- `posts_per_page => -1` + `meta_query` sobre `version` (meta sin índice) + `tax_query` por `name`. Falta `'no_found_rows' => true`.
- ~33 `get_field()` por post; `get_field('program')` se llama dos veces (`edumed_rankings/inc/rankings-2026.php:403`). Un `get_fields( $id )` reduce el costo.
- Sin object cache persistente, `wp_cache_*` solo dura el request. En edumed no usa grupo ni expiración, y no hay invalidación en `save_post`: con Redis/Memcached los datos quedarían obsoletos indefinidamente.
- Bug: `psd_rankings/inc/rankings-spring-2026.php:225-228` hace `wp_cache_get` duplicado (sin y con grupo).

**Recomendación:** transients o grupo `rankings` con TTL, invalidados en `save_post_{cpt}`.

### P3 — `salaries_careers` repite consultas en cada render

**Archivo:** `src/blocks/salaries_careers/inc/helpers.php:36-297`

`SHOW TABLES` (lista toda la BD) + `DESC` + dos `SELECT` sin `LIMIT` en cada render, sin caché. `$_SERVER['REQUEST_URI']` se usa sin `wp_unslash`/sanitizar (línea 210). Cachear por tabla + slug.

### P4 — Usuarios: consulta sin límite y N+1

**Archivo:** `src/blocks/testimonial-card/inc/class-users-api.php`

`get_users()` sin límite; por cada usuario `get_user_meta` + `get_field('local_avatar')`.

### P5 — Carga temprana y trabajo innecesario

- `VENTRIX_CURRENT_SITE` se define al cargar el plugin llamando `get_field()` en options antes de `acf/init`.
- `vtx_load_acf_field_groups_for_site` hace `glob` + `require` en `init` en cada request; debería usar `acf/include_fields`.
- `admin_head` inyecta CSS en **todas** las páginas del admin; limitar con `$hook_suffix`.
- `testimonial-card/inc/site-config.php` arma la configuración en cada request del frontend y la añade a `wp-blocks`, que no se encola en el frontend (trabajo perdido).
- `omd_rankings/shortcode.php` encola assets con versión fija `'1.0'`; usar `filemtime` o `index.asset.php`.
- `require_once ABSPATH . 'wp-includes/rest-api.php'` es innecesario.
- `proxy_api.php:276-281` registra `salaries_careers` otra vez desde `inc/` (sin `block.json`): código muerto.

---

## ESTÁNDARES WORDPRESS / PHP

| Problema | Ubicación | Impacto |
|---|---|---|
| Header `Requires PHP: 7.0`, pero se usa `fn()` (PHP 7.4) y composer exige `>=7.4` | `salaries_careers/inc/helpers.php:225` | Error fatal en PHP 7.0–7.3 |
| Text domain inconsistente: header `ventrix-gutenberg-blocks`; código usa `ventrix`, `cafeto`, `cafeto-gutenberg-blocks` y `'text-domain'` (placeholder, 9 veces) | Varios | Las traducciones no cargan |
| `Domain Path: Ventrix` inválido | Header del plugin | Debe ser `/languages` |
| Funciones globales sin prefijo (`latest_rankings`, `proxy_request_to_api`, `get_table_columns`, `get_wordpress_tables`, `allow_cors_from_local`) | `action-functions.php`, `proxy_api.php` | Riesgo de colisión con otros plugins |
| `require_once 'inc/helpers.php'` con ruta relativa | `salaries_careers/render.php:5-6` | Depende de `include_path`; usar `__DIR__` |
| Archivos sin guarda `ABSPATH` | `proxy_api.php`, `helpers.php`, `site-info.php`, `shortcode.php` | Ejecutables por acceso directo |
| Rutas REST sin `args`/schema/`sanitize_callback` (`columns` llega como array crudo) | `proxy_api.php` | Incumple el estándar REST |
| Sin PHPCS/WPCS ni PHPStan (composer permite el instalador de phpcodesniffer pero no lo requiere) | `composer.json` | WPCS + PHPCompatibilityWP en CI habrían detectado el punto del PHP 7.0 |
| `build/` en `.gitignore`, pero el header usa `GitHub Plugin URI` y el plugin hace `require_once build/...` | `cafeto-gutenberg-blocks.php:96` | Fatal si se instala desde el repo; confirmar que se despliega desde zip/release |
| CPT `latest_rankings` con `public => false` y `has_archive => true`, más `trackbacks` y `post-formats` | `action-functions.php` | Configuración contradictoria |
| La "security check" es en realidad una verificación de dependencias y corre en cada carga | `security-checks.php` | Nombre engañoso sobre lo que protege |

---

## Próximos pasos sugeridos

1. **S1** — lista de tablas permitidas en `salaries_careers` (bloque + 3 endpoints REST). Añadir test en `tests/wp-unit/` que verifique que `users`/`options` son rechazadas.
2. **S2** — flags de `wp_json_encode` en el JSON-LD (cambio de una línea) + test de regresión en `XssRegressionTest.php`.
3. **S3 / P5** — mover lógica ACF a sus hooks, eliminar el borrado del grupo por request y la dependencia de `HTTP_HOST`.
4. **P2 / P3** — caché persistente con TTL e invalidación para rankings y salarios.
5. **Estándares** — corregir `Requires PHP` y text domain; añadir PHPCS (WPCS + PHPCompatibilityWP) en CI.
6. **S4–S8** — endurecimientos menores, agrupables en un solo PR.
