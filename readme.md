#lireddit

login: psql -U postgres
pass: postgres

create database lireddit;
\list

create migrations: npx mikro-orm migration:create
