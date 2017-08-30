alter view SecuritiesSummaryView as
	select	max(s.Id) Id, s.AssetId, s.PortfolioId, [Status],
			Symbol, a.Title, Quote, AnnualVolatility, AvgVolatility, DailyVolatility,
			maxsec.PurchaseQuote PurchaseQuote, sum(PurchaseAmount) PurchaseAmount, 
			sum(Position) Position, p.UserId
	from [Security] s 
	join Asset a on a.Id = s.AssetId 
	join Portfolio p on s.PortfolioId = p.Id
	join 
	(
		select PurchaseQuote, innersec.AssetId, innersec.PortfolioId
		from [Security] innersec
		join LatestSecurityByAssetAndPortfolioView ls on ls.Id = innersec.Id
	) maxsec on maxsec.AssetId = s.AssetId and maxsec.PortfolioId = s.PortfolioId
	group by s.AssetId, s.PortfolioId, [Status], maxsec.PurchaseQuote,
			Symbol, a.Title, Quote, AnnualVolatility, AvgVolatility, DailyVolatility,
			p.UserId
--where UserId = ? and s.Status = ?


