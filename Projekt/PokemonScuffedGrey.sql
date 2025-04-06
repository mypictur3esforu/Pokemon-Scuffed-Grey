create database if not exists PokemonScuffedGrey;
use PokemonScuffedGrey;

create table if not exists Pokemon (
ID integer primary key auto_increment,
name varchar(50), level integer, hp double, attack double, defence double, initiative double,
trainer integer, foreign key (trainer) references Trainer(ID),
evolution integer, evolution_level integer,
item integer, foreign key (item) references Item(ID));

create table if not exists Wild_Pokemon (
ID integer primary key auto_increment,
catch_probability double);

create table if not exists Attack (
name varchar(50) primary key,
damage double);

create table if not exists Type (name varchar(50) primary key);

create table if not exists Destination (name varchar(50) primary key);

create table if not exists City (name varchar(50) primary key);

create table if not exists Shop (type varchar(50) primary key,
city varchar (50) primary key,
foreign key(city) references city(name));

create table if not exists Poke_Center (
name varchar(50) primary key,
city varchar(50),
foreign key(city) references city(name));

create table if not exists Trainer (
ID integer primary key auto_increment,
name varchar(50),
money integer,
destination varchar(50),
foreign key (destination) references destination(name));
	
create table if not exists Item (
name varchar(50) primary key,
costs integer,
type varchar(50));

create table if not exists possess (
pokemon integer primary key,
foreign key (pokemon) references Pokemon(ID),
type varchar(50) primary key,
foreign key (type) references Type(name));

create table if not exists derives (
attack varchar(50) primary key,
foreign key (attack) references Attack(name),
type varchar(50) primary key,
foreign key (type) references Type(name));

create table if not exists inhabits (
pokemon integer primary key,
foreign key (pokemon) references Pokemon(ID),
destination varchar(50) primary key,
foreign key (destination) references Destination(name),
min_level integer,
max_level integer);

create table if not exists surpasses(
type integer primary key,
foreign key (type) references Type(name),
type2 varchar(50) primary key,
foreign key (type2) references Type(name));

create table if not exists owns (
trainer integer primary key,
foreign key (trainer) references Trainer(ID),
item varchar(50) primary key,
foreign key (item) references Item(name));

create table if not exists sells (
shop_type integer primary key,
foreign key (shop_type) references Shop(type),
shop_city varchar(50) primary key,
foreign key (shop_city) references Shop(city),
item varchar(50) primary key,
foreign key (item) references Item(name));

insert into City values("Diez");
insert into Shop values("Pokeball", "Diez");
insert into Shop values("Medicine", "Diez");
select * from Shop;
