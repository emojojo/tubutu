#!/bin/bash

# Ensure we exit on any error
set -e

# Run the version bumper to prevent browser caching issues
echo "Bumping cache-buster versions..."
node bump_version.js

# Git operations
echo "Adding changes to git..."
git add index.html app_v2.js bump_version.js deploy.sh data.js styles.css weather_data.js
git add assets/icons/ || true

# Commit with a provided message, or default to "Auto deploy"
COMMIT_MSG="${1:-Auto deploy update}"
git commit -m "$COMMIT_MSG"

echo "Pushing to main branch..."
git push origin main

echo "Force pushing to gh-pages branch..."
git push origin main:gh-pages --force

echo "Deploy successful!"
