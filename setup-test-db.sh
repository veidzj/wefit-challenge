#!/bin/bash

SCRIPT_PATH="scripts/setup-test-db.sql"
mysql -uroot -proot < "$SCRIPT_PATH"
