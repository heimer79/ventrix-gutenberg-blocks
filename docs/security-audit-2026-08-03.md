# Auditoría de Seguridad — ventrix-gutenberg-blocks

- **Fecha:** 2026-08-03
- **Rama auditada:** `feature/3.17.0`
- **Alcance:** Todo el código fuente del plugin (`/src`), 65 archivos PHP + 50 archivos JS
- **Herramienta:** Agente `security-scanner-wordpress` (solo lectura)
- **Recomendación general:** **Arreglar antes de merge** — hay vulnerabilidades explotables sin autenticación desde internet.

## Resumen

| Severidad | Cantidad |
|---|---|
| Crítico | 1 |
| Alto | 2 |
| Medio | 3 (grupos) |
| Bajo | 4 |

---

## CRÍTICO

### 1. SSRF sin autenticación — proxy AJAX público

**Archivo:** `src/blocks/salaries_careers/inc/proxy_api.php:66-88`
**Categoría:** OWASP A10:2021 – Server-Side Request Forgery

La función `proxy_request_to_api()` acepta un parámetro `api_url` desde `$_GET`, hace una solicitud HTTP desde el servidor hacia esa URL con `wp_remote_get()`, y devuelve el cuerpo de la respuesta al cliente. Está registrada como `wp_ajax_nopriv_proxy_request_to_api`, por lo que cualquier usuario **no autenticado** puede invocarla. No hay verificación de nonce, no hay lista blanca de URLs permitidas, y `esc_url_raw()` no restringe el destino.

**Escenario de explotación:**
```
GET /wp-admin/admin-ajax.php?action=proxy_request_to_api&api_url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ HTTP/1.1
```
El servidor hace la solicitud al metadata endpoint de AWS (u otro proveedor cloud) y devuelve las credenciales IAM en la respuesta JSON al atacante. También permite escanear servicios internos (`localhost`, `10.0.0.x`, `192.168.x.x`), extraer respuestas de APIs internas sin autenticación, y forzar al servidor a interactuar con servicios no expuestos públicamente.

**Fix requerido:**
```php
// 1. Verificación de nonce
if (!isset($_GET['nonce']) || !wp_verify_nonce($_GET['nonce'], 'proxy_request_to_api')) {
    wp_send_json_error('Invalid nonce');
    return;
}
// 2. Verificación de capacidad
if (!current_user_can('edit_posts')) {
    wp_send_json_error('Insufficient permissions');
    return;
}
// 3. Lista blanca estricta de dominios
$allowed_domains = ['api.bls.gov', 'projectionscentral.com'];
$parsed = parse_url($api_url);
if (!in_array($parsed['host'] ?? '', $allowed_domains, true)) {
    wp_send_json_error('URL not allowed');
    return;
}
```
Adicionalmente, eliminar el hook `wp_ajax_nopriv_proxy_request_to_api` por completo si el proxy no necesita ser accesible para usuarios no autenticados.

---

## ALTO

### 2. Enumeración completa de usuarios WordPress vía REST API pública

**Archivo:** `src/blocks/testimonial-card/inc/class-users-api.php:52-81`
**Categoría:** OWASP A01:2021 – Broken Access Control

El endpoint `GET /wp-json/cafeto/v1/users` usa `'permission_callback' => '__return_true'`, haciéndolo completamente público. Devuelve para TODOS los usuarios de WordPress (incluidos administradores): ID, `display_name`, `user_link` (expone el slug/username real), `credentials` y `avatar_url`.

**Escenario de explotación:** Cualquier persona anónima puede llamar `GET /wp-json/cafeto/v1/users`, obtener la lista completa de usuarios incluyendo admins, extraer sus nombres de usuario reales de los slugs de autor, y usarlos para ataques de fuerza bruta, phishing dirigido o enumeración de cuentas privilegiadas.

**Fix requerido:**
```php
register_rest_route('cafeto/v1', '/users', array(
    'methods' => 'GET',
    'callback' => array($this, 'get_users'),
    'permission_callback' => function() {
        return current_user_can('edit_posts'); // Solo editores+
    },
));
```
Si el endpoint necesita ser público (para el editor de Gutenberg), autenticar vía nonce de WordPress y restringir al contexto del editor: `if (!is_user_logged_in()) return new WP_Error('rest_forbidden', ..., ['status' => 401]);`

### 3. SQL Injection en endpoint REST `get_table_columns`

**Archivo:** `src/blocks/salaries_careers/inc/proxy_api.php:180-193`
**Categoría:** OWASP A03:2021 – Injection

La función `get_table_columns()` recupera el parámetro `table` del request sin sanitizar y lo concatena directamente en dos consultas SQL sin usar `$wpdb->prepare()`:

```php
$table = $request->get_param('table');   // Sin sanitización
$table_name = $wpdb->prefix . $table;

// Línea 186 — SQL injection
if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) { ... }

// Línea 192 — SQL injection
$columns = $wpdb->get_col("DESCRIBE $table_name", 0);
```

Requiere capacidad `edit_posts` para explotar. Contraste con `check_salaries_table_has_data()` (línea 138), que sí usa `$wpdb->prepare('SHOW TABLES LIKE %s', $table_name)` correctamente.

**Escenario de explotación:** Un editor con cuenta comprometida, o un atacante que haya escalado a editor, puede enviar `table=salary_standard' OR '1'='1` para forzar condiciones en la consulta `SHOW TABLES LIKE`, o `table=wp_users` en `DESCRIBE` para extraer estructura de tablas sensibles.

**Fix requerido:**
```php
function get_table_columns($request) {
    global $wpdb;
    $table = sanitize_text_field($request->get_param('table'));
    $table_name = $wpdb->prefix . $table;

    if ($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table_name)) !== $table_name) {
        return new WP_Error('invalid_table', '...', ['status' => 404]);
    }

    $columns = $wpdb->get_col("DESCRIBE `" . esc_sql($table_name) . "`", 0);
    return new WP_REST_Response($columns, 200);
}
```

---

## MEDIO

### 4. XSS almacenado — contenido de post sin `wp_kses_post()`

**Archivos:**
- `src/blocks/omd_rankings/inc/rankings-2026.php:148`
- `src/blocks/phds_rankings/inc/rankings-geo.php:169`
- `src/blocks/phds_rankings/inc/rankings-working-professionals.php:191`

**Categoría:** OWASP A03:2021 – XSS Almacenado

Los tres archivos hacen `echo $post['content']` donde el contenido proviene de `get_the_content()` sobre posts del CPT `latest_rankings`. WordPress no filtra el contenido al recuperarlo de base de datos — solo aplica kses al guardar para usuarios sin capacidad `unfiltered_html`. Admins y super-admins sí tienen esa capacidad y pueden guardar `<script>` o handlers de eventos.

Patrón inconsistente: `psd_rankings/inc/rankings-spring-2026.php:115` usa correctamente `wp_kses_post(wpautop($post['content']))` y `edumed_rankings/inc/tradicional-rankings.php:371` usa `wp_kses_post($post['content'])`.

**Fix requerido:**
```php
// Cambiar de:
<p class="description"><?php echo $post['content']; ?></p>

// A:
<div class="description"><?php echo wp_kses_post(wpautop($post['content'])); ?></div>
```

### 5. XSS almacenado — contenido ACF de metodología sin escaping

**Archivos:**
- `src/blocks/edumed_rankings/render.php:188`
- `src/blocks/omd_rankings/render.php:92`
- `src/blocks/phds_rankings/render.php:105`

**Categoría:** OWASP A03:2021 – XSS Almacenado

Tres bloques hacen `echo` directo del contenido del campo ACF de opciones sin escaping. Patrón inconsistente: `psd_rankings/render.php:201` usa `wp_kses_post($methodology_content)` correctamente.

Adicionalmente, `phds_rankings/render.php:105` tiene un **bug lógico**: se calcula la variable `$option` para indexar el array `$methodology_options`, pero luego se ignora ese índice y se hace `echo $methodology_options ?? ''` — volcando el resultado completo del campo ACF en lugar del elemento correcto.

```php
// phds_rankings/render.php — líneas 97-105
$methodology_options = get_field('rankings_text_2024', 'option');
$methodology_text_option = isset($first_post['acf_fields']['ranking_methodology_version']) ? ... : '1';
$option = (int)$methodology_text_option - 1;  // Se calcula pero NUNCA se usa
echo $methodology_options ?? '';              // Se vuelca el valor completo del campo
```

**Fix requerido:**
```php
// Para edumed y omd:
if (!empty($methodology_options) && isset($methodology_options[$option]['content_version'])) {
    echo wp_kses_post($methodology_options[$option]['content_version']);
}

// Para phds (además corregir el bug de $option):
if (!empty($methodology_options) && is_array($methodology_options) && isset($methodology_options[$option])) {
    echo wp_kses_post($methodology_options[$option]);
}
```

### 6. XSS almacenado — campos ACF `city`/`state` sin `esc_html()`

**Archivos:**
- `src/blocks/omd_rankings/inc/rankings-2026.php:134`
- `src/blocks/phds_rankings/inc/rankings-geo.php:141`
- `src/blocks/phds_rankings/inc/rankings-working-professionals.php:163`
- `src/blocks/psd_rankings/inc/rankings-spring-2026.php:93`
- `src/blocks/edumed_rankings/inc/rankings-2026-v2.php:209`

**Categoría:** OWASP A03:2021 – XSS Almacenado

Patrón repetido en todos estos archivos:
```php
<span class="item__location"><?php echo $fields['city'] . ', ' . $fields['state']; ?></span>
```

Los campos `city` y `state` provienen de posts del CPT `latest_rankings` / `school_ranking`. Un admin o editor con acceso a esos posts puede guardar un valor de ciudad como `<img src=x onerror=alert(document.cookie)>` que se renderiza directamente en el HTML de páginas públicas de alto tráfico.

**Fix requerido:**
```php
<span class="item__location">
    <?php echo esc_html($fields['city']) . ', ' . esc_html($fields['state']); ?>
</span>
```

---

## BAJO

### 7. SVG inline sin sanear en plantillas mobile de tablas salariales

**Archivos:**
- `src/blocks/salaries_careers/inc/salary-basic-table-mobile.php:128`
- `src/blocks/salaries_careers/inc/career-basic-table-mobile.php:128`
- `src/blocks/salaries_careers/inc/partials/mobile-double-row-cards.php:50`

El contenido de archivos SVG se lee del disco con `file_get_contents()` y se inyecta directamente con `echo $state_icon_svg`. Los SVG admiten handlers de eventos (`onload`, `onclick`) y `<script>` embebidos. La ruta está correctamente restringida por `sanitize_title()` en el nombre del estado (sin path traversal posible) y los archivos provienen del propio directorio de assets del plugin. Riesgo actual bajo; se volvería crítico si algún `.svg` en `/assets/state-icons/` fuera reemplazado por uno malicioso.

**Recomendación:** Usar `wp_kses()` con un conjunto de tags SVG seguros, o eliminar atributos de evento antes del echo.

### 8. CORS con credentials habilitado para orígenes `.local` aplicado globalmente

**Archivo:** `src/blocks/salaries_careers/inc/proxy_api.php:97-117`

La función `allow_cors_from_local()` está hookeada a `add_action('init', ...)` y corre en TODAS las requests de WordPress (no solo las de la API). Para requests con `HTTP_ORIGIN` que matcheen `*.local`, establece `Access-Control-Allow-Origin` (reflejado) y `Access-Control-Allow-Credentials: true`. En preflight OPTIONS, refleja `Access-Control-Allow-Headers` sin validar. Aunque limitado a dominios `.local`, el hecho de correr globalmente con `Allow-Credentials: true` amplifica cualquier vulnerabilidad SSRF existente en entornos de desarrollo.

### 9. Lógica invertida en las funciones de verificación de seguridad

**Archivo:** `src/includes/security-checks.php:66, 85, 143, 149, 155`

Las funciones `ventrix_check_wordpress_core_functions()` y `ventrix_check_wordpress_core_classes()` contienen lógica invertida: cuando una función/clase requerida NO existe, retornan `true` en lugar de `false`. Igualmente, `ventrix_comprehensive_security_check()` establece `$status['overall_status'] = true` dentro de los bloques de error, por lo que `overall_status` siempre es `true` sin importar si hay errores. Consecuencia: la notificación de admin para fallos de seguridad **nunca se muestra**, aunque ACF no esté instalado.

Es un bug funcional, no una vulnerabilidad directa, pero indica que el mecanismo de guardia existe solo en apariencia.

### 10. Endpoint REST público que expone configuración del sitio

**Archivo:** `cafeto-gutenberg-blocks.php:357-362`

`GET /wp-json/ventrix/v1/current-site` usa `'permission_callback' => '__return_true'` y devuelve el identificador del sitio activo (`edumed`, `psd`, `omd`, etc.). El valor está validado contra una lista blanca antes de retornarse, por lo que el riesgo de explotación directa es mínimo. Aun así, exponer configuración interna sin necesidad no es buena práctica.

---

## Archivos clave con los hallazgos más críticos

- `src/blocks/salaries_careers/inc/proxy_api.php`
- `src/blocks/testimonial-card/inc/class-users-api.php`
- `src/blocks/omd_rankings/inc/rankings-2026.php`
- `src/blocks/phds_rankings/inc/rankings-geo.php`
- `src/blocks/phds_rankings/inc/rankings-working-professionals.php`
- `src/blocks/edumed_rankings/render.php`
- `src/blocks/omd_rankings/render.php`
- `src/blocks/phds_rankings/render.php`

## Próximos pasos sugeridos

1. Corregir el SSRF (crítico) y los dos hallazgos de severidad alta antes de cualquier despliegue a producción — son explotables sin autenticación desde internet.
2. Aplicar `esc_html()` / `wp_kses_post()` de forma consistente en los bloques de rankings (medio), siguiendo el patrón ya usado correctamente en `psd_rankings`.
3. Revisar y corregir la lógica invertida en `security-checks.php` para que las notificaciones de fallo de seguridad funcionen como se espera.
4. Evaluar si los endpoints públicos de bajo riesgo (`current-site`, CORS `.local`) deben restringirse por defensa en profundidad.