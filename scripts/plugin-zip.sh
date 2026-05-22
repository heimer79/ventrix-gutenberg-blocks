#!/bin/bash
set -e

PLUGIN_NAME="cafeto-gutenberg-blocks"
PLUGIN_DIR="$(pwd)"
TMP_DIR="$(mktemp -d)"
DEST="$TMP_DIR/$PLUGIN_NAME"

mkdir -p "$DEST"

cp "$PLUGIN_DIR/cafeto-gutenberg-blocks.php" "$DEST/"
cp -r "$PLUGIN_DIR/build" "$DEST/"
[ -f "$PLUGIN_DIR/readme.txt" ] && cp "$PLUGIN_DIR/readme.txt" "$DEST/"

cd "$TMP_DIR"
zip -r "$PLUGIN_NAME.zip" "$PLUGIN_NAME"
mv "$PLUGIN_NAME.zip" "$PLUGIN_DIR/"
rm -rf "$TMP_DIR"

echo "Created: $PLUGIN_DIR/$PLUGIN_NAME.zip"
