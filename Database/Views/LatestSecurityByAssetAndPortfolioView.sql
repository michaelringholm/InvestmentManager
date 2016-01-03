create view LatestSecurityByAssetAndPortfolioView as
select max(Id) Id, AssetId, PortfolioId
from [Security] smax 
group by smax.AssetId, PortfolioId