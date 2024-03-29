﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DroidInvest.Data.Entities
{
    public class Tournament
    {
        public String Id { get; set; }
        public String Title { get; set; }
        public String StartDate { get; set; }
        public String EndDate { get; set; }
        public String StartCash { get; set; }
        public List<String> Participants { get; set; }
        [NonSerialized]
        private Object _metaData;
        public Object MetaData { get { return _metaData; } set { _metaData = value; } }
        //signed up
    }
}
