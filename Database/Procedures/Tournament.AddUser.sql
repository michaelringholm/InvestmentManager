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
ALTER PROCEDURE [dbo].[Tournament.AddUser] 
(
	@login nvarchar(250),
	@userLogin nvarchar(250),
	@userRole nvarchar(50),
	@tournamentId int
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @newUserId int;
	set @newUserId = (select Id from [User] where [Login] = @userLogin);
	
	if(	(select count(1) from TournamentUser t 
		join [User] u on u.Id = t.UserId 
		where t.UserRole in ('ADMIN', 'OWNER') 
		and u.Login = @login) > 0 )
	begin
		insert into TournamentUser(TournamentId, UserId, UserRole)
		values(@tournamentId, @newUserId, @userRole);
	end;
	
END
