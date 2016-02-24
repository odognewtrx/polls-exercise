#! /bin/bash
set -x

mysqldump -udbguest -pdbpassword django_1 polls_json_config > polls_json_config.sql
