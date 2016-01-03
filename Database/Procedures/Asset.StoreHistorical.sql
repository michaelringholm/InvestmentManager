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
ALTER PROCEDURE [dbo].[Asset.StoreHistorical] 
(
	@symbol nvarchar(200),
	@adjClose decimal(18,2),
	@close decimal(18,2),
	@high decimal(18,2),
	@low decimal(18,2),
	@open decimal(18,2),
	@volume int,
	@priceDate datetime
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @assetId integer;
	
	set @assetId = (select Id from Asset a where a.Symbol = @symbol);
	
	insert into AssetHistory([Open], High, Low, [Close], AdjClose, Volume, PriceDate, AssetId)
	values(@open, @high, @low, @close, @adjClose, @volume, @priceDate, @assetId);
	
	--@id = @@ScopeIdentity;
	
END
