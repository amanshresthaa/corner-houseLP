#!/bin/bash

# Script to push to both amanshresthaa and lapeninns repositories
# Created: 2025-11-05

set -e  # Exit on error

REPO_DIR="/Users/amankumarshrestha/Downloads/white-horseLP"
BRANCH="main"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Pushing to both repositories"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$REPO_DIR"

# Check current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Current branch: $CURRENT_BRANCH"
echo ""

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes"
    read -p "Do you want to commit them first? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add -A
        read -p "Enter commit message: " COMMIT_MSG
        git commit -m "$COMMIT_MSG"
        echo "✅ Changes committed"
        echo ""
    fi
fi

# Function to push to a remote
push_to_remote() {
    local remote=$1
    local remote_url=$(git remote get-url "$remote")
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📤 Pushing to $remote"
    echo "🔗 URL: $remote_url"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if git push "$remote" "$BRANCH"; then
        echo "✅ Successfully pushed to $remote"
    else
        echo "❌ Failed to push to $remote"
        echo ""
        echo "💡 You may need to:"
        echo "   1. Pull and merge changes first: git pull $remote $BRANCH"
        echo "   2. Force push (if you're sure): git push $remote $BRANCH --force"
        echo ""
        read -p "Do you want to force push to $remote? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            if git push "$remote" "$BRANCH" --force; then
                echo "✅ Force pushed to $remote"
            else
                echo "❌ Force push failed to $remote"
                return 1
            fi
        else
            return 1
        fi
    fi
    echo ""
}

# Push to origin (amanshresthaa)
if push_to_remote "origin"; then
    ORIGIN_SUCCESS=true
else
    ORIGIN_SUCCESS=false
fi

# Push to lapeninns
if push_to_remote "lapeninns"; then
    LAPENINNS_SUCCESS=true
else
    LAPENINNS_SUCCESS=false
fi

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Push Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$ORIGIN_SUCCESS" = true ]; then
    echo "✅ origin (amanshresthaa): SUCCESS"
else
    echo "❌ origin (amanshresthaa): FAILED"
fi

if [ "$LAPENINNS_SUCCESS" = true ]; then
    echo "✅ lapeninns: SUCCESS"
else
    echo "❌ lapeninns: FAILED"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Exit with error if any push failed
if [ "$ORIGIN_SUCCESS" = true ] && [ "$LAPENINNS_SUCCESS" = true ]; then
    echo ""
    echo "🎉 All pushes completed successfully!"
    exit 0
else
    echo ""
    echo "⚠️  Some pushes failed. Please check the errors above."
    exit 1
fi
