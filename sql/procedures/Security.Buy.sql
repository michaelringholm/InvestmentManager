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
CREATE PROCEDURE [dbo].[Security.BuySell] 
(
	@userId nvarchar(200),
	@symbol nvarchar(200),
	@position integer,
	@quote decimal(18,2),
	@portfolioId integer
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @assetId integer, @purchaseAmount decimal(18,2);
	set @purchaseAmount = @quote * @position;
	
	set @assetId = (select a.Id from Asset a where a.Symbol = @symbol);
	
	insert into [Security](AssetId, PortfolioId, Position, PurchaseAmount, PurchaseQuote, [Status])
	values(@assetId, @portfolioId, @position, @purchaseAmount, @quote, 'NotConfirmed');
	
	
	/*declare @shoppingCartId integer;
	declare @assetId integer;
	
	set @shoppingCartId = (select sc.Id from ShoppingCart sc where sc.UserId = @userId);
	set @assetId = (select a.Id from Asset a where a.Symbol = @symbol);
	
	if((select COUNT(1) from ShoppingCart sc join ShoppingCartItem sci on sci.ShoppingCartId = sc.Id where sc.UserId = @userId) > 0)
	begin
		update ShoppingCartItem set Position = @position where AssetId = @assetId and ShoppingCartId = @shoppingCartId;
	end
	else
	begin
		insert into ShoppingCartItem(AssetId, Position, Quote, ShoppingCartId)
		values(@assetId, @position, @quote, @shoppingCartId);
	end;*/
	
END
