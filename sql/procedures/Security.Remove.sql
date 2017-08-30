USE [InvestmentManager]
GO
/****** Object:  StoredProcedure [dbo].[ShoppingCart.StoreShoppingCartItem]    Script Date: 02/27/2013 09:47:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Security.Remove] 
(
	@userId nvarchar(200),
	@securityId integer
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @portfolioId integer;
	set @portfolioId = (select PortfolioId from [Security] s where s.Id = @securityId);
	
	if(@userId = (select UserId from Portfolio p where p.Id = @portfolioId))
	begin	
		delete from [Security]	
		where Id = @securityId;
	end;
	
END
