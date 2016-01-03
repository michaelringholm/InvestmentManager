
SELECT        TournamentId, Title, StartDate, EndDate, StartCash, IsPublic, UserId
FROM            (SELECT        t.Id as TournamentId, t.Title, t.IsPublic, t.StartDate, t.EndDate, t.AssetFilter, t.ExchangeFilter, t.StartCash, tu.UserId
                          FROM            dbo.Tournament AS t INNER JOIN
                                                    dbo.TournamentUser AS tu ON tu.TournamentId = t.Id
                          UNION
                          SELECT        Id as TournamentId, Title, IsPublic, StartDate, EndDate, AssetFilter, ExchangeFilter, StartCash, - 1000 AS UserId
                          FROM            dbo.Tournament AS t
                          WHERE        (IsPublic = 1)) AS a
GROUP BY TournamentId, Title, IsPublic, UserId, StartDate, EndDate, StartCash