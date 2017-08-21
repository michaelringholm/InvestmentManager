using System.Collections.Generic;
using WebAppCore.Data.Entities;

namespace WebAppCore.Services
{
    public interface IDataService
    {
        List<PortfolioHeader> GetPortfolioHeaders();
        void StoreCategory();
    }
}
