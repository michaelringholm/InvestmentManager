USE [InvestmentManager]
GO
/****** Object:  StoredProcedure [dbo].[Security.Remove]    Script Date: 04/18/2013 18:26:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Security.RemoveAllUnconfirmed] 
(
	@userId nvarchar(200),
	@portfolioId integer
)
AS
BEGIN		
	SET NOCOUNT ON;
	
	if(@userId = (select UserId from Portfolio p where p.Id = @portfolioId))
	begin	
		delete from [Security]	
		where PortfolioId = @portfolioId
		and [Status] = 'NotConfirmed';
	end;
	
END
