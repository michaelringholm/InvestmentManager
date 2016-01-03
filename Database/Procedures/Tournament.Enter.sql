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
ALTER PROCEDURE [dbo].[Tournament.Enter] 
(
	@login nvarchar(250),
	@tournamentId int
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @userId int;	
	declare @title nvarchar(250);
	declare @cash decimal(18,2);
	declare @rank int;
	
	set @userId = (select Id from [User] u where u.[Login] = @login);
	set @title = (select Title from Tournamet t where t.Id = @tournamentId);
	set @cash = (select StartCash from Tournament t where t.id = @tournamentId);
	set @rank = (select ROW_NUMBER() OVER(ORDER BY p.Cash DESC) AS [rank] from Portfolio p where p.TournamentId = @tournamentId and p.UserId = @login);
	
	if((select count(1) from TournamentUser tu where tu.UserId = @userId and tu.TournamentId = @tournamentId) > 0)
	begin
		insert into Portfolio(Title, UserId, TournamentId, Cash, [Rank])
		values(@title, @login, @tournamentId, @cash, @rank);
	end;		
END
