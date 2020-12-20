#!/bin/bash
set -e

bandit -r wawo/ -l -x tests.py
isort --check-only wawo/**/*.py
black --check --diff --exclude=/migrations/ wawo/
prospector -I "wawo/settings/*"
