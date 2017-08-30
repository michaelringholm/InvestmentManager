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
ALTER PROCEDURE [dbo].[User.Login] 
(
	@login nvarchar(200)
)
AS
BEGIN		
	SET NOCOUNT ON;
	--declare @assetId integer;
	
	--set @assetId = (select Id from Asset a where a.Symbol = @symbol);
	
	if((select COUNT(1) from [User] where [Login] = @login) = 0)
	begin
		insert into [User]([Login]) values(@login);
		insert into Portfolio(Title, UserId) values('Default', @login);
	end;
	
	--@id = @@ScopeIdentity;
	
END
