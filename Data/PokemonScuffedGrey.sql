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
name varchar(100) primary key,
type varchar(50),
categroy varchar(50),
power integer,
accuracy integer,
amount integer,
description varchar(200)
);

create table if not exists Type (name varchar(50) primary key);

create table if not exists Destination (
name varchar(50) primary key,
type varchar(50)
);

create table if not exists Location(
destination varchar(50),
name varchar(50),
primary key (destination, name)
);

create table if not exists Shop (
destination varchar(50),
type varchar(50),
primary key (destination, type)
);
create table if not exists Poke_Center (
destination varchar(50),
name varchar(50),
primary key (destination, name)
);

create table if not exists Trainer (
ID integer primary key auto_increment,
name varchar(50),
money integer,
destination varchar(50),
location varchar(50)
);

create table if not exists Player (
ID integer primary key auto_increment,
password varchar(50)
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
blueprint integer,
destination varchar(50),
location varchar(50),
probability integer,
min_level integer,
max_level integer,
primary key (blueprint, destination, location)
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
position varchar(50),
target varchar(50),
primary key (position, target)
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
    
alter table Destination
    add foreign key (type) references Type(name);
    
alter table Location
	add foreign key (destination) references destination(name)
    
alter table Shop
	add foreign key(city, type) references location(destination, name);
    
alter table Poke_Center
	add foreign key(city, name) references location(destination, name);
    
alter table Trainer
	add foreign key (destination, location) references location(destination, name);
    
alter table Play
	add foreign key (ID) references Trainer(ID);
    
alter table Pokeball
	add foreign key (name) references Item(name);

alter table possess
	add foreign key (pokemon) references Pokemon(ID),
	add foreign key (type) references Type(name);
    
alter table inhabits
	add foreign key (pokemon) references Pokemon(ID),
	add foreign key (destination, location) references Location(destination, name);
    
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
/*select id from pokemon_blueprint
where category like "%legendary%"
or category like "%mythical%"
or category like "%mega%"
or category like "%ultra%"
or category like "%paradox%";
*/
#group by category;

/*insert into location values ("Battalia City", "Home");
insert into location values ("Battalia City", "Marketplace");
insert into location values ("Battalia City", "Main Poke Center");
insert into Poke_Center values ("Battalia City", "Main Poke Center");
*/

-- select catch_rate, count(*) from Pokemon_Blueprint
-- group by catch_rate;

-- update trainer set destination = "Route 1", location = (select name from location where destination = "Route 1") where id = 1;
-- select * from pokemon_blueprint where id between 460 and 470 and category like "%legendary%" limit 10;
-- select * from pokemon_blueprint pb, inhabits i where pb.id = i.blueprint and pb.category like "%legendary%";
