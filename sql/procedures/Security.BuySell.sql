USE [InvestmentManager]
GO
/****** Object:  StoredProcedure [dbo].[Security.BuySell]    Script Date: 04/18/2013 19:37:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[Security.BuySell] 
(
	@userId nvarchar(200),
	@symbol nvarchar(200),
	@position integer,
	@quote decimal(18,2),
	@portfolioId integer,
	@status nvarchar(200)
)
AS
BEGIN		
	SET NOCOUNT ON;
	declare @assetId integer, @purchaseAmount decimal(18,2), @isTournament bit, @newQuote decimal(18,2), @cash decimal(18,2);	
	declare @brokerage decimal(18,2);
	
	set @brokerage = (select decimal_value from Settings s where s.name = 'brokerage');
	set @assetId = (select a.Id from Asset a where a.Symbol = @symbol);
	set @isTournament = (select CASE ISNULL(p.TournamentId, 0) WHEN 0 THEN 0 ELSE 1 END from Portfolio p where p.Id = @portfolioId);
	
	set @newQuote = @quote;
	if(@isTournament = 1)
	begin
		-- Override any user typed quote if this is a tournament portfolio
		set @newQuote = (select a.Quote from Asset a where a.Symbol = @symbol);
	end;
	
	-- This part should be wrapped in a transaction
	set @purchaseAmount = @newQuote * @position + (@newQuote*@position*@brokerage);
	set @cash = (select Cash from Portfolio where Id = @portfolioId);
	
	if(@cash >= @purchaseAmount)
	begin
		insert into [Security](AssetId, PortfolioId, Position, PurchaseAmount, PurchaseQuote, [Status])
		values(@assetId, @portfolioId, @position, @purchaseAmount, @newQuote, @status);
		
		if(@status = 'Confirmed')
		begin
			update Portfolio set Cash = Cash-@purchaseAmount
			where Id = @portfolioId;
		end;
	end;
	-- End of transaction part
END
