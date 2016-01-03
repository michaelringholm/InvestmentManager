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
CREATE PROCEDURE [dbo].[Security.Amend] 
(
	@userId nvarchar(200),
	@symbol nvarchar(200),
	@position integer,
	@quote decimal(18,2),
	@securityId integer
)
AS
BEGIN		
	SET NOCOUNT ON;
	--declare @assetId integer, @purchaseAmount decimal(18,2);
	--set @purchaseAmount = @quote * @position;
	
	--set @assetId = (select a.Id from Asset a where a.Symbol = @symbol);
	
	update [Security]
	set Position = @position,
	PurchaseQuote = @quote
	where Id = @securityId;
	
END
