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
ALTER PROCEDURE [dbo].[Asset.Add] 
(
	@symbol nvarchar(200),
	@title nvarchar(250),
	@quote decimal(18,4)
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @assetId integer;
	
	set @assetId = (select Id from Asset a where a.Symbol = @symbol);
	
	if(@assetId is null)
	begin
		insert into Asset(Symbol, Title, Quote) values (@symbol, @title, @quote);
	end;
	else
	begin
		update Asset set Title = @title where Id = @assetId and Title is null;
	end;
	
	--@id = @@ScopeIdentity;
	
END
