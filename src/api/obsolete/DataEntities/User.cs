using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DroidInvest.Data.Entities
{
    public class User
    {
        public enum userRoleEnum
        {
            Standard,
            Admin,
            Owner,
        }

        private double cashField;

        private string fullNameField;

        private string genderField;

        private int idField;

        private string loginField;

        private double marketValueField;

        private int portfolioIdField;

        private int rankField;

        private userRoleEnum roleField;

        private bool roleFieldSpecified;

        private double totalValueField;
    }
}
