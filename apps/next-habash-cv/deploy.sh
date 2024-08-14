#!/usr/bin/env bash

# Source the helper functions
source ../../scripts/helpers.sh

# Ensure a commit message is provided
if [ -z "$1" ]; then
  error_exit "Commit message required. Usage: $0 <commit-message>"
fi

# Build the project using Nx
log "Building the project..."
nx build next-habash-cv || error_exit "Build failed."
log "Build successful."

# Stage all changes for commit
log "Staging changes..."
git add -A || error_exit "Failed to stage changes."

# Commit changes with the provided message
log "Committing changes..."
git commit -m "$1" || error_exit "Commit failed."
log "Commit successful."

# Push to the GitHub repository
log "Pushing to GitHub repository 'ohabash/next-habash-cv'..."
git push || error_exit "Push failed."
log "Push successful. Deployment to Heroku should be triggered."

log "Script completed successfully."
