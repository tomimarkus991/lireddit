#lireddit

login: psql -U postgres
pass: postgres

create database lireddit;
\list

createdb -U postgres newdatabase

create migrations: npx mikro-orm migration:create
