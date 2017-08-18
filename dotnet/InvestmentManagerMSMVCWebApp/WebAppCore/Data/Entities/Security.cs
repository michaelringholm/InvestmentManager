using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Data.Entities
{
    public class Security
    {
        public enum StatusEnum
        {
            Confirmed,
            NotConfirmed,
        }

        public int portfolioIdField;

        public int positionField;

        public double purchaceQuoteField;

        public double purchaseAmountField;

        public StatusEnum statusField;

        public bool statusFieldSpecified;
    }
}
