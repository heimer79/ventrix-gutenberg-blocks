<?php
/**
 * Update Version Script
 * 
 * This script helps update the version across all files consistently
 * Usage: php update-version.php 3.4.0
 */

if (!isset($argv[1])) {
    echo "Usage: php update-version.php <new-version>\n";
    echo "Example: php update-version.php 3.4.0\n";
    exit(1);
}

$new_version = $argv[1];

// Validate version format
if (!preg_match('/^\d+\.\d+\.\d+$/', $new_version)) {
    echo "Error: Version must be in format X.Y.Z (e.g., 3.4.0)\n";
    exit(1);
}

$plugin_dir = dirname(__DIR__);

// Files to update
$files_to_update = [
    'cafeto-gutenberg-blocks.php' => [
        'patterns' => [
            '/Version:\s*[\d.]+/' => "Version:           $new_version",
            "/define\('VENTRIX_PLUGIN_VERSION', '[^']+'\)/" => "define('VENTRIX_PLUGIN_VERSION', '$new_version')"
        ]
    ],
    'package.json' => [
        'patterns' => [
            '/"version":\s*"[\d.]+"/' => "\"version\": \"$new_version\""
        ]
    ],
    'version.json' => [
        'patterns' => [
            '/"version":\s*"[\d.]+"/' => "\"version\": \"$new_version\"",
            '/"last_updated":\s*"[^"]+"/' => "\"last_updated\": \"" . date('Y-m-d') . "\""
        ]
    ]
];

echo "Updating to version $new_version...\n";

foreach ($files_to_update as $filename => $config) {
    $filepath = $plugin_dir . '/' . $filename;
    
    if (!file_exists($filepath)) {
        echo "Warning: $filename not found, skipping...\n";
        continue;
    }
    
    $content = file_get_contents($filepath);
    $original_content = $content;
    
    foreach ($config['patterns'] as $pattern => $replacement) {
        $content = preg_replace($pattern, $replacement, $content);
    }
    
    if ($content !== $original_content) {
        file_put_contents($filepath, $content);
        echo "✓ Updated $filename\n";
    } else {
        echo "- No changes needed in $filename\n";
    }
}

echo "\nVersion update complete! Don't forget to:\n";
echo "1. Commit the changes to git\n";
echo "2. Create a new tag: git tag v$new_version\n";
echo "3. Push the changes and tag: git push origin master --tags\n";
echo "4. WordPress should receive the update automatically via webhook\n";
