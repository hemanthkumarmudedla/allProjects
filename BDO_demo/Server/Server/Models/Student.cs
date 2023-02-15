using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table(name: "Students")]
    public class Student
    {
        [Required(ErrorMessage = "{0} is a mandatory field")]
        [MaxLength(25, ErrorMessage = "The {0} can not have more than {1} characters")]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "The {0} can have only Alphabets")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "{0} is a mandatory field")]
        [MaxLength(25, ErrorMessage = "The {0} can not have more than {1} characters")]
        [RegularExpression("^[a-zA-Z]+$", ErrorMessage = "The {0} can have only Alphabets")]
        public string? LastName { get; set; }

        [Key]
        [Required(ErrorMessage = "{0} is a mandatory field")]
        [MaxLength(25, ErrorMessage = "The {0} can not have more than {1} characters")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "{0} is a mandatory field")]
        [RegularExpression("^.*(?=.{6,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$", ErrorMessage = "The {0} should have atleast 6 characters with atleast one capital, one small, one digit and one special character each")]
        public string? Password { get; set; }


        [MaxLength(10, ErrorMessage = "The {0} can not have more than {1} characters")]
        [MinLength(10, ErrorMessage = "The {0} can not have less than {1} characters")]
        [Required(ErrorMessage = "{0} is a mandatory field")]
        public string? MobileNo { get; set; }

        [Required(ErrorMessage = "{0} is a mandatory field")]
        public string? DateOfBirth { get; set; }

        public DateTime? LockoutEnd { get; set; } = null;
        public bool? IsLocked { get; set; } = false;
        public int FailedAttemptCount { get; set; } = 0;
    }
}

