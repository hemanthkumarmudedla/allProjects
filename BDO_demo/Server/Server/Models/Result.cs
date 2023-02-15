using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table(name: "Results")]
    public class Result
    {
        [Key]
        public string? Username { get; set; }
        public int English { get; set; }
        public int Mathematics { get; set; }
        public int Physics { get; set; }
        public int Chemistry { get; set; }
        public int Total { get; set; }
        public float Percentage { get; set; }
    }
}
