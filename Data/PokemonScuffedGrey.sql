#drop database PokemonScuffedGrey;
create database if not exists PokemonScuffedGrey;
use PokemonScuffedGrey;

create table if not exists Pokemon_Blueprint (
ID integer primary key,
name varchar(50), category varchar(50), hp integer, attack integer, defence integer, special_attack integer, special_defence integer, initiative integer, catch_rate integer,
evolution integer, evolution_level integer
);

create table if not exists Pokemon(
ID integer auto_increment,
blueprint integer,
level integer,
trainer integer,
item varchar(50),
primary key (ID)
);

create table if not exists Attack (
name varchar(50) primary key,
type varchar(50),
damage double
);

create table if not exists Type (name varchar(50) primary key);

create table if not exists Destination (name varchar(50) primary key);

create table if not exists Location(
destination varchar(50),
name varchar(50),
primary key (destination, name)
);

create table if not exists Shop (
type varchar(50),
city varchar (50),
primary key (type, city)
);

create table if not exists Poke_Center (
name varchar(50),
city varchar(50),
primary key (name, city)
);

create table if not exists Trainer (
ID integer primary key auto_increment,
name varchar(50),
money integer,
destination varchar(50),
location varchar(50)
);

create table if not exists Item (
name varchar(50) primary key,
category varchar (50),
description varchar (500),
costs integer
);

create table if not exists Pokeball (
name varchar(50) primary key,
catch_factor integer
);

create table if not exists possess (
pokemon integer,
type varchar(50),
primary key (pokemon, type)
);

create table if not exists inhabits (
pokemon integer,
destination varchar(50),
min_level integer,
max_level integer,
primary key (pokemon, destination)
);

create table if not exists surpasses(
type varchar(50),
type2 varchar(50),
factor double,
primary key (type, type2)
);

create table if not exists owns (
trainer integer,
item varchar(50),
amount integer,
primary key (trainer, item)
);

create table if not exists sells (
shop_type varchar(50),
shop_city varchar(50),
item varchar(50),
primary key (shop_type, shop_city, item)
);

create table if not exists borders (
destination1 varchar(50),
destination2 varchar(50),
primary key (destination1, destination2)
);

#alter table Pokemon_Blueprint 
	#add foreign key (evolution) references Pokemon_Blueprint(ID);
   
/*
alter table Pokemon
	add foreign key (blueprint) references Pokemon_Blueprint(ID),
	add foreign key (trainer) references Trainer(ID),
	add foreign key (item) references Item(name);
    
alter table Attack
	add foreign key (type) references Type(name);
    
alter table Location
	add foreign key (destination) references destination(name)
    
alter table Shop
	add foreign key(city, type) references location(destination, name);
    
alter table Poke_Center
	add foreign key(city, name) references location(destination, name);
    
alter table Trainer
	add foreign key (destination, location) references location(destination, name);
    
alter table Pokeball
	add foreign key (name) references Item(name);

alter table possess
	add foreign key (pokemon) references Pokemon(ID),
	add foreign key (type) references Type(name);
    
alter table inhabits
	add foreign key (pokemon) references Pokemon(ID),
	add foreign key (destination) references Destination(name);
    
alter table surpasses
	add foreign key (type) references Type(name),
	add foreign key (type2) references Type(name);

alter table owns 
	add foreign key (trainer) references Trainer(ID),
	add foreign key (item) references Item(name);
    
alter table sells
	add foreign key (shop_type, shop_city) references Shop(type, city),
	add foreign key (item) references Item(name);

alter table borders 
	add foreign key (destination1) references destination(name),
    add foreign key (destination2) references destination(name);
    #*/


#insert into trainer values (1, "Lukas", 0, "Battalia City", "Home");
#update trainer set location = "Marktplatz" where id = 1;
select * from item;