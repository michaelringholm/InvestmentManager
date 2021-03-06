create view PortfolioMarketValueView as
select mv.PortfolioId, SUM(mv.MVSubTotal) MarketValue
from (

SELECT p.Id PortfolioId, s.AssetId, SUM(s.Position)*a.Quote MVSubTotal
  FROM [InvestmentManager].[dbo].[Portfolio] p
  join [Security] s on s.PortfolioId = p.Id
  join [Asset] a ON A.Id = S.AssetId
  
  and [Status] = 'Confirmed'
  
  group by p.Id, s.AssetId, a.quote
  ) mv
  
  group by mv.PortfolioId