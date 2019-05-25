--Create statements
create database FoodSpeciality

Create table Users(
	[UID] varchar(50) PRIMARY KEY,
	[NAME] varchar(50),
	EMAIL varchar(50),
	[PASSWORD] varchar(50),
	PHONE CHAR(10),
	[ADDRESS] VARCHAR(50),
	query varchar(150) default null,
	response varchar(150) default null,
	[status] char(1) default 'U'
)

Create table Vendors(
	VID varchar(50) PRIMARY KEY , 
	[NAME] varchar(50), 
	EMAIL varchar(50), 
	[PASSWORD] varchar(50), 
	PHONE char(10),
	[ADDRESS] varchar(50), 
	AccountInfo varchar(50),
	query varchar(150) default null,
	response varchar(150) default null,
	[status] char(1) default 'U'
)

Create table Category(
	CatId varchar(50) PRIMARY KEY ,
	[NAME] varchar(50)
)

Create table Dishes(
	DID varchar(50)  PRIMARY KEY, 
	[NAME] varchar(50), 
	price integer, 
	[DESCRIPTION] varchar(150), 
	VID varchar(50) REFERENCES Vendors(VID), 
	CatId varchar(50) REFERENCES Category(CatId), 
	[STATUS] varchar(50),
	[image] varbinary(max),
	imagetype varchar(50)
)

Create table Orders(
	OId varchar(50) PRIMARY KEY ,
	[UID] varchar(50) REFERENCES Users(UID),
	VID VARCHAR(50) REFERENCES Vendors(VID),
	DID varchar(50),
	Quantity integer,
	DelStatus varchar(50),
	OrderTime Datetime,
	Constraint orders_did_fk FOREIGN KEY(DID) REFERENCES Dishes(DID)
)

Create table Payments(
	PID varchar(50) PRIMARY KEY ,
	[UID] varchar(50) REFERENCES Users(UID),
	OID VARCHAR(50) REFERENCES Orders(OID),
	[Source] varchar(50),
	[Destination] varchar(50),
	Amount integer,
	[PaymentTime] Datetime
)

create table Ratings(
	RID varchar(50) PRIMARY KEY,
	[UID] varchar(50) References Users(UID),
	[name] varchar(50),
	[rating] char(1),
	[comment] varchar(150),
	[date] datetime,
	DID varchar(50) REFERENCES Dishes(DID)
)

drop table Ratings

--Insert statements
insert into Users values(
	'U1002',
	'Wolf',
	'wolf@ss.com',
	'wolf',
	'8765432001',
	'Infosys, Mysuru',
	null,
	null,
	'U'
)

insert into Vendors values(
	'V1001',
	'Jose',
	'jose@g.com',
	'jose',
	'9876543210',
	'Forum Mall',
	'patym:9876543210',
	null,
	null,
	'U'
)

insert into Category values('C1001', 'Starters')
insert into Category values('C1002', 'Main Course')
insert into Category values('C1003', 'Drinks')
insert into Category values('C1004', 'Desserts')

insert into Dishes values(
	'D1001',
	'Idly', 
	 50, 
	 'Sambhar idli', 
	 'V1001', 
	 'C1002', 
	 'Verified',
	 null,
	 'data:image/jpeg;base64'
)

insert into Orders values(
	'O1001', 
	'U1001', 
	'V1001', 
	'D1001', 
	4, 
	'V', 
	'2019-04-22 12:01:00' 
)

insert into Payments values(
	'P1001', 
	'U1001', 
	'O1001', 
	'a@a', 
	'My account', 
	200, 
	'2019-04-22 12:01:00'
)

insert into Ratings values(
	'R1001', 
	'U1001',
	'Shubham Rana', 
	'1', 
	'Something is wrong here',  
	'2019-04-22 12:01:00',
	'D1001'
)

--Select statements
Select * from Users
Select * from Vendors
Select * from Category
Select * from Dishes
Select * from Orders
Select * from Payments
select * from Ratings


--functions
create function avg_rating(
	@did varchar(50)
)
returns decimal(2,1)
as
begin
return (select avg(cast(rating as decimal(2,1))) from Ratings where did=@did)
end