#!/bin/bash
set -e

bandit -r wawo/ -l -x tests.py

# quick and dirty string search for "--fix"
if [[ $* == *--fix* ]]; then
    isort wawo/**/*.py
    black --exclude=/migrations/ wawo/
else
    isort --check-only wawo/**/*.py
    black --check --diff --exclude=/migrations/ wawo/
fi

prospector -I "wawo/settings/*"
