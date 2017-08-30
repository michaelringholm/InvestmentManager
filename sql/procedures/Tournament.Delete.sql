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
ALTER PROCEDURE [dbo].[Tournament.Delete] 
(
	@login nvarchar(250),
	@tournamentId int
)
AS
BEGIN		
	SET NOCOUNT ON;
	
	if(	(select count(1) from TournamentUser t 
		join [User] u on u.Id = t.UserId 
		where t.UserRole in ('ADMIN', 'OWNER') 
		and u.Login = @login) > 0 )
	begin
		delete from TournamentUser where TournamentId = @tournamentId;	
		delete from Tournament where Id = @tournamentId;
	end;
	
END
