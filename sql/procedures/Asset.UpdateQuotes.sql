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
ALTER PROCEDURE [dbo].[Asset.UpdateQuotes] 
(
	@symbol nvarchar(200),
	@quote decimal(18,4),
	@previousClose decimal(18,4),
	@change decimal(18,4),
	@volume decimal(18,0)
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @assetId integer;
	
	set @assetId = (select Id from Asset a where a.Symbol = @symbol);
	
	update Asset
	set Quote = @quote,
	PreviousClose = @previousClose,
	Change = @change,
	Volume = @volume
	where Id = @assetId;
	
	--@id = @@ScopeIdentity;
	
END
