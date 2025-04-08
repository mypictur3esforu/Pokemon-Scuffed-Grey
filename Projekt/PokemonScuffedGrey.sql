#drop database PokemonScuffedGrey;
create database if not exists PokemonScuffedGrey;
use PokemonScuffedGrey;

create table if not exists Pokemon_Blueprint (
ID integer primary key auto_increment,
name varchar(50), level integer, hp integer, attack integer, defence integer, special_attack integer, special_defence integer, initiative integer, catch_rate integer,
evolution integer, evolution_level integer
);

create table if not exists Pokemon(
ID integer auto_increment,
blueprint integer,
trainer integer,
item varchar(50),
primary key (ID, blueprint)
);

create table if not exists Wild_Pokemon (
ID integer auto_increment,
blueprint integer,
primary key (ID, blueprint)
);

create table if not exists Attack (
name varchar(50) primary key,
type varchar(50),
damage double
);

create table if not exists Type (name varchar(50) primary key);

create table if not exists Destination (name varchar(50) primary key);

create table if not exists City (name varchar(50) primary key);

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
destination varchar(50)
);
	
create table if not exists Item (
name varchar(50) primary key,
costs integer,
type varchar(50) #Typ des Items hat nichts mit Typ eines Pokemons oder einer Attacke zu tun
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
primary key (type, type2)
);

create table if not exists owns (
trainer integer,
item varchar(50),
primary key (trainer, item)
);

create table if not exists sells (
shop_type varchar(50),
shop_city varchar(50),
item varchar(50),
primary key (shop_type, shop_city, item)
);
/*
alter table Pokemon_Blueprint 
	add foreign key (evolution) references Pokemon_Blueprint(ID);
    
alter table Pokemon
	add foreign key (blueprint) references Pokemon_Blueprint(ID),
	add foreign key (trainer) references Trainer(ID),
	add foreign key (item) references Item(name);
    
alter table Wild_Pokemon
	add foreign key (ID, blueprint) references Pokemon(ID, blueprint);
    
alter table Attack
	add foreign key (type) references Type(name);
    
alter table Shop
	add foreign key(city) references city(name);
    
alter table Poke_Center
	add foreign key(city) references city(name);
    
alter table Trainer
	add foreign key (destination) references destination(name);

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
*/

select * from Pokemon;