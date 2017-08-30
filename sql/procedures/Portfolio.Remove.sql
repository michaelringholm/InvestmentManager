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
CREATE PROCEDURE [dbo].[Portfolio.Delete] 
(
	@login nvarchar(200),
	@portfolioId nvarchar(200)
)
AS
BEGIN		
	SET NOCOUNT ON;
	
	if(@login = (select UserId from Portfolio p where p.Id = @portfolioId))
	begin
		delete from [Security]
		where PortfolioId = @portfolioId;
		
		delete from Portfolio
		where Id = @portfolioId;
	end;
END
