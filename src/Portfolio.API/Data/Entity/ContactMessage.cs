using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.API.Data.Entity
{
    public class ContactMessage
    {

        public long Id { get; set; }


        public static readonly int PropertyNameMaxLength = 250;
        public string Name { get; set; }

        public static readonly int PropertyEmailMaxLength = 250;
        public string Email { get; set; }

        public static readonly int PropertyMessageMaxLength = 4000;
        public string Message { get; set; }

        public string RemoteAddress { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }

    }
}
