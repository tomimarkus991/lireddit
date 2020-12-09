#lireddit

login: psql -U postgres
pass: postgres

create database lireddit;
\list

\c lireddit2
\dt

createdb -U postgres newdatabase

create migrations: npx mikro-orm migration:create

access lireddit2: psql -d lireddit2 -U postgres
