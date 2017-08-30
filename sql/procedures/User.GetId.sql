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
CREATE PROCEDURE [dbo].[User.GetId] 
(
	@login nvarchar(200),
	@userId int output
)
AS
BEGIN		
	SET NOCOUNT ON;
	
	set @userId = (select Id from [User] u where u.[Login] = @login);
	
END
