﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataViewer.Models
{
    public class MainTableDataFetchModel
    {
        public string table { set; get; }
        private string _criteria;
        public string criteria 
        { 
            set
            {
                _criteria = (value == null ? "" : value.Trim());
            }
            get
            {
                return _criteria;
            }
        }
        public int topN { set; get; }
    }

    public class MainTableRowSelectModel
    {
        public string table { get; set; }
        public List<KeyValueModel> keyVals { get; set; }

    }

    public class KeyValueModel
    {
        public string keyName { set; get; }
        public string keyValue { set; get; }

    }

}
