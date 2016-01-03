SELECT        ISNULL(tu.UserRole, 'Standard') AS role, [u].Login, [u].FullName, [u].Gender, [u].Id as UserId, p.TournamentId, 
                         ISNULL(pmvv .MarketValue, 0) AS MarketValue, p.Cash, ISNULL(pmvv .MarketValue, 0) + p.Cash AS TotalValue, 
                         RANK() OVER (PARTITION BY tu.TournamentId
ORDER BY (ISNULL(pmvv .MarketValue, 0) +p.Cash) DESC) AS Rank, p.Id PortfolioId
FROM              Portfolio p
JOIN  [User] u ON [u].Login = p.UserId
LEFT JOIN       PortfolioMarketValueView pmvv ON p.Id = pmvv .PortfolioId
LEFT JOIN  TournamentUser tu on tu.tournamentId = p.TournamentId