#!/bin/bash

RESULT=`psql -l | grep "wawo" | wc -l | awk '{print $1}'`;
if test $RESULT -eq 0; then
    echo "Creating Database";
    psql -c "create role wawo with createdb encrypted password 'wawo' login;"
    psql -c "alter user wawo superuser;"
    psql -c "create database wawo with owner wawo;"
else
    echo "Database exists"
fi

#run initial setup of database tables
python manage.py migrate
