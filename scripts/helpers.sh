#!/usr/bin/env bash

# Define color codes using tput
GREEN=$(tput setaf 2)
RED=$(tput setaf 1)
RESET=$(tput sgr0)

# Function to log messages with color and icons
log() {
  echo -e "${GREEN}✔ [INFO]${RESET} $1"
}

# Function to log errors with color and icons, then exit
error_exit() {
  echo -e "${RED}✖ [ERROR]${RESET} $1"
  exit 1
}