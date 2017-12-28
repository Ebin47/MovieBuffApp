using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieBuff.Models
{  
public class MovieClientModel
    {
    public int MovieID { get; set; }
    public string MovieName { get; set; }
    public int YOR { get; set; }
    public int ProducerID { get; set; }
        public string Producer { get; set; }

        public string ImgSrcString { get; set; }
        public List<string> lstActors { get; set; }
}
}