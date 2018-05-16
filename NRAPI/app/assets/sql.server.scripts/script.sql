if exists(select * from sys.databases where name = 'DBNODEJS')
begin
	use master
	print 'Using master database'
	drop database DBNODEJS
	print 'Drop DBNODEJS database'
end


create database DBNODEJS
print 'Create DBNODEJS database'
go

use DBNODEJS
print 'Using DBNODEJS database'
go

create table Customer
(
    CustomerID int not null identity(1, 1)
    , Name varchar(200) not null
    , Active bit not null
)
go

alter table Customer add constraint PK_Customer primary key(CustomerID)
go

insert into Customer 
(
    Name
    , Active
)
values
(
    'Goku'
    , 1
)
, (
    'Goham'
    , 1
)
, (
    'Picolo'
    , 1
)
, (
    'Vegeta'
    , 1
)
go

create procedure PROC_CUSTOMER_SELECT
	@CustomerID int = null
	, @Name varchar(200) = null
	, @Active bit = null
as
begin

	select
		CustomerID
		, Name
		, Active
	from
		Customer
	where
		(@CustomerID is null or CustomerID = @CustomerID)
		and (@Name is null or Name = @Name)
		and (@Active is null or Active = @Active)

end
go