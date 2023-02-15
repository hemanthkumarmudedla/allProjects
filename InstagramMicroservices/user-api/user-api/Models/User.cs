using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace user_api.Models
{
    [Table(name: "Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "{0} is a mandatory field")]
        [MaxLength(25, ErrorMessage = "The {0} can not have more than {1} characters")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "{0} is a mandatory field")]
        [RegularExpression("^.*(?=.{6,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$", ErrorMessage = "The {0} should have atleast 6 characters with atleast one capital, one small, one digit and one special character each")]
        public string? Password { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Gender { get; set; }

        public string? DateOfBirth { get; set; }
    }
}
