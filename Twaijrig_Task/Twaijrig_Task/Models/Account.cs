using System.ComponentModel.DataAnnotations;

namespace Twaijrig_Task.Models
{
    public class Account
    {
        public class Login
        {
            [EmailAddress]
            [Required]
            public string? Email { get; set; }
            public string? Password { get; set; }
            [Display(Name = "Remember me")]
            public bool RememberMe { get; set; }

        }

        public class Register
        {
            [Required, MaxLength(100)]
            public string? FirstName { get; set; }

            [Required, MaxLength(100)]
            public string? LastName { get; set; }

            [Required, MaxLength(50)]
            public string? Gender { get; set; }
            [Required]
            [EmailAddress]
            public string? Email { get; set; }
            [Required]
            public string? Password { get; set; }
            [Required]
            [Compare("Password")]
            public string? ConfirmPassword { get; set; }
            [MaxLength(100)]
            public string? City { get; set; }
            public int PhoneNumber { get; set; }

        }

        public class ConfirmEmail
        {
            [Required]
            public string? Token { get; set; }
            public string? UserID { get; set; }
        }


        public class RoleDto
        {
            public string? RoleName { get; set; }
            public string? RoleNormalizedName { get; set; }
        }
    }
}
