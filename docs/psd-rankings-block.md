# PSD Rankings Block — Documentación técnica

> **Plugin:** `ventrix-gutenberg-blocks`
> **Bloque:** `psd_rankings`
> **Última actualización:** Marzo 2026

---

## Tabla de contenidos

1. [Descripción general](#1-descripción-general)
2. [Estructura de archivos](#2-estructura-de-archivos)
3. [Arquitectura del bloque](#3-arquitectura-del-bloque)
4. [Diseños disponibles (`block_design`)](#4-diseños-disponibles-block_design)
5. [ACF Fields — Campos de página](#5-acf-fields--campos-de-página)
6. [ACF Fields — Campos de school ranking (Spring 2026)](#6-acf-fields--campos-de-school-ranking-spring-2026)
7. [ACF Fields — Ranking Methodology (Options Page)](#7-acf-fields--ranking-methodology-options-page)
8. [Función: `psd_render_methodology_popup_section`](#8-función-psd_render_methodology_popup_section)
9. [Función: `vtx_get_rankings_spring_data_2026`](#9-función-vtx_get_rankings_spring_data_2026)
10. [Convenciones y reglas de seguridad](#10-convenciones-y-reglas-de-seguridad)

---

## 1. Descripción general

El bloque `psd_rankings` es un bloque Gutenberg personalizado que muestra un listado interactivo de rankings de escuelas para el sitio PSD. Soporta múltiples diseños visuales seleccionables por página a través de un campo ACF (`block_design`). El bloque usa un patrón de **dispatcher** en `render.php` para cargar el partial correcto según el diseño activo.

---

## 2. Estructura de archivos

```
src/blocks/psd_rankings/
├── block.json                        # Registro del bloque en Gutenberg
├── render.php                        # Dispatcher principal + funciones compartidas
├── methodology-texts.php             # (Legacy) textos de metodología hardcodeados
├── edit.js / index.js / view.js      # Lógica JS del editor y frontend
├── style.scss / editor.scss          # Estilos globales del bloque
│
├── inc/
│   ├── rankings-2025.php             # Partial: diseño Rankings 2025
│   └── rankings-spring-2026.php     # Partial: diseño Rankings Spring 2026
│
├── scss/
│   ├── _helpers.scss
│   ├── _rankings-2025.scss
│   └── _rankings-spring-2026.scss   # Estilos del diseño Spring 2026
│
├── js/
│   ├── rankings-2025.js
│   └── rankings-spring-2026.js      # JS interactivo del diseño Spring 2026
│
└── assets/icons-svg/                # Iconos SVG usados en el bloque

src/includes/acf_fields/psd/
├── ranking-default-fields.php        # Campos comunes a todos los rankings
├── ranking-page-settings.php         # Campos de configuración de la página ranking
├── ranking-methodology.php           # Campo de metodología (options page)
└── rankings-spring-2026.php         # Campos específicos del diseño Spring 2026
```

---

## 3. Arquitectura del bloque

### Flujo de renderizado

```
Gutenberg invoca render_cafeto_psd_rankings_block($attributes)
    │
    ├── Lee ACF field "block_design" de la página actual
    │   └── Fallback: $attributes['blockDesign'] → 'rankings_2025'
    │
    └── vtx_determine_psd_block_render($block_design, $attributes, $post_ID)
            │
            ├── 'rankings_spring_2026' → psd_render_block_rankings_spring_2026()
            └── 'rankings_2025'        → psd_render_block_rankings_2025()
```

### Funciones compartidas en `render.php`

| Función | Descripción |
|---------|-------------|
| `render_cafeto_psd_rankings_block($attributes)` | Entry point del bloque. Lee el diseño y delega al partial correcto. |
| `vtx_determine_psd_block_render($block_design, $attributes, $post_ID)` | Switch que llama al partial correspondiente. |
| `vtx_determine_psd_class_name($block_design)` | Retorna el CSS class modifier según el diseño (p.ej. `rankings-spring-2026`). |
| `psd_leveling_year_value($default_level_year)` | Convierte el slug `two-year` / `four-year` al label usado en la `meta_query`. |
| `psd_render_methodology_popup_section($version = 1)` | Renderiza el popup "About the Ranking" con el texto de metodología del ACF. |

---

## 4. Diseños disponibles (`block_design`)

El campo ACF `block_design` en la página determina qué partial se carga.

| Valor del campo | Partial cargado | CSS class |
|----------------|-----------------|-----------|
| `rankings_2025` | `inc/rankings-2025.php` | `rankings-2025` |
| `rankings_spring_2026` | `inc/rankings-spring-2026.php` | `rankings-spring-2026` |

> **Para agregar un nuevo diseño:** crear el partial en `inc/`, añadir el `case` en `vtx_determine_psd_block_render()` y `vtx_determine_psd_class_name()`, y registrar la opción en el ACF field `block_design`.

---

## 5. ACF Fields — Campos de página

Registrados en `ranking-page-settings.php`. Aparecen en las páginas que usan el bloque `psd_rankings`.

| Campo ACF | `name` | Tipo | Descripción |
|-----------|--------|------|-------------|
| Block Design | `block_design` | Select | Selecciona el diseño visual (`rankings_spring_2026`, `rankings_2025`). |
| Post Type | `post_type` | Text | CPT a consultar (default: `school_ranking`). |
| Program Category | `program_category` | Taxonomy | Categoría de programa (ej. `CNA`). Filtra los posts. |
| Version | `version` | Text | Año/edición del ranking (ej. `2025`, `2026`). Filtra los posts por `meta_query`. |
| Ranking Methodology Text | `ranking_methodology_text` | Number | Número de versión de metodología (1, 2, 3…). Determina qué fila del repeater de methodology se muestra en el popup. Default: `1`. |
| Level Year | *(default level year)* | Select | `two-year` / `four-year`. Afecta el filtro de nivel. |

---

## 6. ACF Fields — Campos de school ranking (Spring 2026)

Registrados en `rankings-spring-2026.php`. Aparecen en el CPT `school_ranking`.

**Grupo:** `group_psd_rankings_spring_2026`

### Sección: Enrollment & Scores

| Label | `name` ACF | Tipo | Descripción |
|-------|-----------|------|-------------|
| PMASTR / PTOTAL | `rp_pmastr_ptotal` | Text | Ratio de estudiantes master vs. total de posgrado. Decimal (ej. `0.82`). |
| Non-White Enrollment | `rp_non_white_enrollment` | Text | % de matrícula no blanca. |
| Graduate Enrollment | `rp_graduate_enrollment` | Text | Total de estudiantes de posgrado. |
| Graduation Rate | `rp_graduation_rate` | Text | Tasa de graduación. |
| Students with Disabilities | `rp_students_with_disabilities` | Text | % de estudiantes con discapacidad. |
| Net Price | `rp_net_price` | Number | Precio neto promedio en USD. |
| Avg. Tuition | `rp_avg_tuition` | Number | Colegiatura promedio en USD. |
| Alt. Tuition Plans | `rp_alt_tuition_plans` | Text | Planes alternativos de matrícula. |
| Pell Grant Recipients | `rp_pell_grant_recipients` | Text | % de receptores de Pell Grant. |
| Inst. Aid Recipients | `rp_inst_aid_recipients` | Text | % de receptores de ayuda institucional. |

### Campos heredados (Default Fields)

Registrados en `ranking-default-fields.php`. Compartidos por todos los diseños.

| Label | `name` ACF |
|-------|-----------|
| Version | `version` |
| Asset URL | `asset_url` |
| Online Program URL | `online_program_url` |
| Ranking Subject | `ranking_subject` |
| Ranking Unit ID | `ranking_unitid` |
| City | `city` |
| State | `state` |
| Online Enrollment | `ranking_online_enrollment` |
| School Type | `ranking_school_type` |
| Score | `ranking_score` |
| Blurb 1 / 2 / 3 | `blurb_1`, `blurb_2`, `blurb_3` |

---

## 7. ACF Fields — Ranking Methodology (Options Page)

Registrado en `ranking-methodology.php`.

**Grupo:** `group_psd_ranking_methodology`
**Ubicación:** Options Page → slug `ranking-methodology-settings`

Este campo group gestiona los textos del popup **"About the Ranking"** que aparece al hacer clic en el botón del top bar del bloque. Cada fila del repeater corresponde a una versión de metodología.

### Estructura del repeater

```
psd_ranking_methodology_options  (repeater)
└── psd_content_version          (wysiwyg)  ← texto completo de la metodología
```

| Campo | `name` | Tipo | Descripción |
|-------|--------|------|-------------|
| Methodology Versions | `psd_ranking_methodology_options` | Repeater | Cada fila = una versión. Fila 1 = versión 1, fila 2 = versión 2, etc. |
| Methodology Content | `psd_content_version` | WYSIWYG | Texto completo de la metodología para esta versión. Soporta HTML rico. |

> **Cómo funciona el versionado:** el campo `ranking_methodology_text` en la página ranking guarda un número entero (ej. `2`). La función `psd_render_methodology_popup_section(2)` accede a la fila con índice `2 - 1 = 1` del repeater, lo que permite gestionar N versiones desde WordPress sin tocar código.

---

## 8. Función: `psd_render_methodology_popup_section`

**Archivo:** `src/blocks/psd_rankings/render.php`

```php
psd_render_methodology_popup_section( int $version = 1 ): string
```

### Descripción

Renderiza el HTML del popup "About the Ranking". Lee el repeater ACF `psd_ranking_methodology_options` desde la options page y muestra el contenido WYSIWYG de la versión solicitada.

### Parámetros

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `$version` | `int` | `1` | Número de versión de metodología a mostrar (1-indexed). |

### Comportamiento

1. Sanitiza `$version` como entero positivo (`max(1, (int) $version)`).
2. Verifica que ACF esté activo (`function_exists('get_field')`). Si no lo está, usa `array()` como fallback seguro.
3. Lee el repeater con `get_field('psd_ranking_methodology_options', 'option')`.
4. Accede al índice `$version - 1` del array.
5. Renderiza el contenido con `wp_kses_post()` para seguridad.
6. Si no hay contenido, muestra mensaje de fallback internacionalizable.

### Uso

```php
// Desde rankings-spring-2026.php
$methodology_version = get_field('ranking_methodology_text', $post_ID) ?: 1;
echo psd_render_methodology_popup_section( $methodology_version );

// Con valor por defecto (versión 1)
echo psd_render_methodology_popup_section();
```

### HTML generado

```html
<section class="rankings-popup">
    <div class="rankings-popup--widget hidden">
        <span class="rankings-popup--widget--close">X</span>
        <div class="rankings-popup--widget--content">
            <!-- Contenido WYSIWYG de la versión seleccionada -->
        </div>
    </div>
    <div class="rankings-popup--overlay hidden"></div>
</section>
```

---

## 9. Función: `vtx_get_rankings_spring_data_2026`

**Archivo:** `src/blocks/psd_rankings/inc/rankings-spring-2026.php`

```php
vtx_get_rankings_spring_data_2026( string $post_type, string $version, string $program ): array
```

### Descripción

Obtiene y normaliza todos los posts de ranking para el diseño Spring 2026. Implementa caching con `wp_cache_get/set` para evitar queries repetidas en la misma request.

### Filtros aplicados en `WP_Query`

- **`meta_query`:** filtra por campo `version` = `$version`
- **`tax_query`:** filtra por taxonomía `school_ranking_category` con nombre = `$program`
- **`orderby`:** `menu_order ASC` (el orden editorial define el ranking)

### Estructura del array retornado

```php
[
    [
        'ID'         => int,
        'title'      => string,
        'content'    => string,  // Con apply_filters('the_content')
        'order'      => int,     // menu_order = posición en el ranking
        'acf_fields' => [
            'version', 'asset_url', 'program', 'online_program_url',
            'subject', 'unitid', 'city', 'state', 'online_enrollment',
            'school_type', 'score',
            // Spring 2026 específicos:
            'pmastr_ptotal', 'non_white_enrollment', 'graduate_enrollment',
            'graduation_rate', 'students_with_disabilities', 'net_price',
            'avg_tuition', 'alt_tuition_plans', 'pell_grant_recipients',
            'inst_aid_recipients',
            'blurb_1', 'blurb_2', 'blurb_3',
        ]
    ],
    // ...
]
```

### Caché

```
Cache group : 'rankings'
Cache key   : rankings_data_{post_type}_{version}_{program-slug}
TTL         : DAY_IN_SECONDS (86400 segundos)
```

> Para invalidar el caché manualmente: usar `wp_cache_delete('rankings_data_...', 'rankings')` o con un plugin de gestión de object cache como Redis Object Cache.

---

## 10. Convenciones y reglas de seguridad

### 🔒 Regla ACF — siempre validar function_exists

Antes de llamar a **cualquier función de ACF** (`get_field`, `get_fields`, `have_rows`, `get_sub_field`, etc.), se debe verificar que exista. Si ACF se desactiva, el sitio no debe romperse.

```php
// ✅ Patrón correcto
if ( function_exists( 'get_field' ) ) {
    $value = get_field( 'field_name', $post_id );
} else {
    $value = ''; // fallback seguro
}

// ✅ Versión compacta (para asignaciones simples)
$value = function_exists( 'get_field' ) ? get_field( 'field_name', $post_id ) : '';
```

### Naming conventions

| Prefijo | Uso |
|---------|-----|
| `psd_` | Funciones PHP públicas del bloque PSD |
| `vtx_` | Funciones utilitarias del plugin Ventrix (dispatcher, helpers) |
| `psd_rp26_` / `psd_s26_` | ACF field keys específicas de Spring 2026 |
| `rp_` | ACF field names de datos de ranking en el CPT |
| `psd_` | ACF field names en options pages y campos de página |

### Seguridad en output

| Contexto | Función a usar |
|----------|---------------|
| HTML plano (texto) | `esc_html()` |
| Atributos HTML | `esc_attr()` |
| URLs | `esc_url()` |
| Contenido HTML rico (post content, WYSIWYG) | `wp_kses_post()` |
| Texto traducible en template | `esc_html_e()` |

### Comentarios de código

Todos los comentarios del plugin deben estar **en inglés**, independientemente del idioma del equipo. Ver skill `code-comments`.
