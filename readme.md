#lireddit

login: psql -U postgres
pass: postgres

create database lireddit;
\list

\c lireddit switches to lireddit
\dt shows tables

createdb -U postgres newdatabase

access lireddit: psql -d lireddit -U postgres

select post.title from post where post."creatorId" is null;
delete from post where post."creatorId" is null;
