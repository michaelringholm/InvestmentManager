USE [InvestmentManager]
GO
/****** Object:  StoredProcedure [dbo].[Tournament.Create]    Script Date: 04/18/2013 19:13:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Tournament.Create] 
(
	@login nvarchar(250),
	@title nvarchar(200),
	@isPublic bit,
	@startDate datetime,
	@endDate datetime,
	@startCash decimal(18,2)
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @userId int;
	declare @tournamentId int;
	
	set @userId = (select Id from [User] u where u.[Login] = @login);
	
	insert into Tournament(Title, IsPublic, StartDate, EndDate, StartCash)
	values(@title, @isPublic, @startDate, @endDate, @startCash);
	set @tournamentId = SCOPE_IDENTITY();
	
	insert into TournamentUser(TournamentId, UserId, UserRole)
	values(@tournamentId, @userId, 'OWNER');
	
	
END
