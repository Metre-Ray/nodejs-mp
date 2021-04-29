## Task 3

```
create extension if not exists "uuid-ossp";

create table users (
	id uuid primary key default uuid_generate_v4(),
	login varchar(30) not null,
	password varchar(40) not null,
	age integer,
	isDeleted bool not null default false
)

insert into users (login, password, age) values 
('Calderon', '123', 45),
('Matthews', '123', 16),
('Vasquez', '123', 14),
('Celia', '123', 33),
('Name-5', '123', 22),
('Name-6', '123', 44),
('Name-7', '123', 55),
('Name-8', '123', 66)
```
