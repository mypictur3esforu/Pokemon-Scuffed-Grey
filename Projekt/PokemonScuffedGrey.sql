create database if not exists PokemonScuffedGrey;
use PokemonScuffedGrey;

create table if not exists Pokemon (
ID integer primary key auto_increment,
name varchar(50), level integer, hp double, attack double, defence double, initiative double,
trainer integer,
foreign key (trainer) references Trainer(ID),
evolution integer, evolution_level integer,
item integer,
foreign key (item) references Item(ID));

create table if not exists Wild_Pokemon (
ID integer primary key auto_increment,
catch_probability double);

create table if not exists Attack (
name varchar(50) primary key,
damage double);

create table if not exists Type (name varchar(50) primary key);

create table if not exists Destination (name varchar(50) primary key);

create table if not exists City (name varchar(50) primary key);

create table if not exists Shop (
type varchar(50),
city varchar (50),
foreign key(city) references city(name),
primary key (type, city));

create table if not exists Poke_Center (
name varchar(50),
city varchar(50),
foreign key(city) references city(name),
primary key (name, city));

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
pokemon integer,
foreign key (pokemon) references Pokemon(ID),
type varchar(50),
foreign key (type) references Type(name),
primary key (pokemon, type));

create table if not exists derives (
attack varchar(50),
foreign key (attack) references Attack(name),
type varchar(50),
foreign key (type) references Type(name),
primary key (attack, type));

create table if not exists inhabits (
pokemon integer,
foreign key (pokemon) references Pokemon(ID),
destination varchar(50),
foreign key (destination) references Destination(name),
min_level integer,
max_level integer,
primary key (pokemon, destination));

create table if not exists surpasses(
type varchar(50),
foreign key (type) references Type(name),
type2 varchar(50),
foreign key (type2) references Type(name),
primary key (type, type2));

create table if not exists owns (
trainer integer,
foreign key (trainer) references Trainer(ID),
item varchar(50),
foreign key (item) references Item(name),
primary key (trainer, item));

create table if not exists sells (
shop_type varchar(50),
shop_city varchar(50),
foreign key (shop_type, shop_city) references Shop(type, city),
item varchar(50),
foreign key (item) references Item(name),
primary key (shop_type, shop_city, item));

select * from Shop;