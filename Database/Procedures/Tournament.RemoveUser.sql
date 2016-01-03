USE [InvestmentManager]
GO
/****** Object:  StoredProcedure [dbo].[Portfolio.Add]    Script Date: 03/22/2013 12:39:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Tournament.RemoveUser] 
(
	@login nvarchar(250),
	@userLogin nvarchar(250),
	@tournamentId int
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @userId int;
	set @userId = (select Id from [User] where [Login] = @userLogin);
	
	if(	(select count(1) from TournamentUser t 
		join [User] u on u.Id = t.UserId 
		where t.UserRole in ('OWNER') 
		and u.Login = @login) > 0 )
	begin
		delete from TournamentUser
		where UserId = @userId
		and UserRole in ('ADMIN', 'STANDARD');
	end;
	
	if(	(select count(1) from TournamentUser t 
		join [User] u on u.Id = t.UserId 
		where t.UserRole in ('ADMIN') 
		and u.Login = @login) > 0 )
	begin
		delete from TournamentUser
		where UserId = @userId
		and UserRole in ('STANDARD');
	end;
	
END
