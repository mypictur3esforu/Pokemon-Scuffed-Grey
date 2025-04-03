create database if not exists myDB;
show databases;
use myDB;
create table if not exists Pokemon (Name varchar(50), Type varchar(50));
insert into Pokemon values("Marshadow", "Dark");
select * from Pokemon;
