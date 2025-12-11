#!/bin/bash

# Script to replace all images (except root /assets folder) with placeholder images
# This prevents the app from breaking while removing actual image content

cd "$(dirname "$0")/.."

echo "Creating placeholder images..."

# Create a minimal 1x1 pixel PNG placeholder (base64 encoded)
# This is a valid 1x1 transparent PNG
PNG_PLACEHOLDER_B64="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

# Create a minimal 1x1 pixel JPEG placeholder (base64 encoded)
JPEG_PLACEHOLDER_B64="/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB//9k="

# Create a minimal 1x1 pixel WebP placeholder (base64 encoded)
WEBP_PLACEHOLDER_B64="UklGRhoAAABXRUJQVlA4TA4AAAAvAAAAAP8D/w=="

# Create a minimal 1x1 pixel AVIF placeholder (base64 encoded)
# This is a minimal valid AVIF
AVIF_PLACEHOLDER_B64="AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKBzgABpAQEDQgMgkf"

# Create a minimal ICO placeholder (base64 encoded - 16x16 icon)
ICO_PLACEHOLDER_B64="AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="

# Create a minimal GIF placeholder (base64 encoded - 1x1 transparent GIF)
GIF_PLACEHOLDER_B64="R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

# Function to replace a file with placeholder
replace_with_placeholder() {
    local file="$1"
    local ext="${file##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    case "$ext" in
        png)
            echo "$PNG_PLACEHOLDER_B64" | base64 -d > "$file"
            ;;
        jpg|jpeg)
            echo "$JPEG_PLACEHOLDER_B64" | base64 -d > "$file"
            ;;
        webp)
            echo "$WEBP_PLACEHOLDER_B64" | base64 -d > "$file"
            ;;
        avif)
            echo "$AVIF_PLACEHOLDER_B64" | base64 -d > "$file"
            ;;
        ico)
            echo "$ICO_PLACEHOLDER_B64" | base64 -d > "$file"
            ;;
        gif)
            echo "$GIF_PLACEHOLDER_B64" | base64 -d > "$file"
            ;;
        *)
            echo "Unknown extension: $ext for file: $file"
            ;;
    esac
    echo "Replaced: $file"
}

# Find and replace all images except those in root /assets folder
find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" -o -name "*.avif" -o -name "*.gif" -o -name "*.ico" \) \
    ! -path "./node_modules/*" \
    ! -path "./.next/*" \
    ! -path "./.git/*" \
    ! -path "./assets/*" \
    -print0 | while IFS= read -r -d '' file; do
    replace_with_placeholder "$file"
done

echo ""
echo "Done! All images have been replaced with placeholders."
echo "The root /assets folder has been preserved."
