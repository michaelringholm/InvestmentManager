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
CREATE PROCEDURE [dbo].[Security.Confirm] 
(
	@userId nvarchar(200),
	@portfolioId integer
)
AS
BEGIN		
	SET NOCOUNT ON;
	
	if(@userId = (select UserId from Portfolio p where p.Id = @portfolioId))
	begin	
		update [Security]	
		set [Status] = 'Confirmed'
		where PortfolioId = @portfolioId
		and [Status] = 'NotConfirmed';
	end;
	
END
