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
CREATE PROCEDURE [dbo].[Portfolio.Create] 
(
	@login nvarchar(200),
	@title nvarchar(200),
	@startCash decimal(18,2)
)
AS
BEGIN		
	SET NOCOUNT ON;
	
	insert into Portfolio(UserId, Title, Cash)
	values(@login, @title, @startCash);
	
	--@id = @@ScopeIdentity;
	
END
