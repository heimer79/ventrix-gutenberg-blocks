# Sistema de Actualización Automática

Este plugin tiene un sistema de actualización automática que funciona con GitHub webhooks.

## Cómo actualizar el plugin

### Método 1: Usando el script automático (Recomendado)

1. Ejecuta el script de actualización:
   ```bash
   php scripts/update-version.php 3.4.0
   ```

2. Confirma los cambios en git:
   ```bash
   git add .
   git commit -m "Bump version to 3.4.0"
   ```

3. Crea y empuja el tag:
   ```bash
   git tag v3.4.0
   git push origin master --tags
   ```

### Método 2: Manual

1. Actualiza la versión en estos archivos:
   - `cafeto-gutenberg-blocks.php` (línea 7 y constante VENTRIX_PLUGIN_VERSION)
   - `package.json` (campo version)
   - `version.json` (campo version y last_updated)

2. Haz commit y push de los cambios
3. Crea un tag de la nueva versión

## Configuración del Webhook

Para que WordPress reciba las notificaciones automáticamente, configura un webhook en GitHub:

1. Ve a tu repositorio en GitHub
2. Settings → Webhooks → Add webhook
3. Configura:
   - **Payload URL**: `https://tu-sitio.com/wp-json/ventrix/v1/github-webhook`
   - **Content type**: `application/json`
   - **Secret**: El valor de `VENTRIX_GITHUB_WEBHOOK_SECRET`
   - **Events**: Solo selecciona "Pushes" y "Releases"

## Constantes requeridas en wp-config.php

Añade estas constantes a tu `wp-config.php`:

```php
// GitHub webhook secret (debe coincidir con el configurado en GitHub)
define('VENTRIX_GITHUB_WEBHOOK_SECRET', 'tu-secret-aqui');

// Token de GitHub para acceder a releases (si es repositorio privado)
define('VENTRIX_GITHUB_TOKEN', 'tu-token-aqui');
```

## Detección de cambios

El sistema detectará actualizaciones cuando:
- Se haga push a la rama master
- Se cree un nuevo tag/release
- Se modifiquen archivos de versión (cafeto-gutenberg-blocks.php, package.json, version.json)

## Verificación

Para verificar que el sistema funciona:
1. Revisa los logs de WordPress después de hacer push
2. Ve a Plugins en el admin de WordPress
3. Debe aparecer una notificación de actualización disponible

## Troubleshooting

Si las actualizaciones no funcionan:
1. Verifica que el webhook esté configurado correctamente
2. Revisa los logs de error de WordPress
3. Comprueba que las constantes estén definidas en wp-config.php
4. Asegúrate de que GitHub pueda acceder a tu webhook URL
