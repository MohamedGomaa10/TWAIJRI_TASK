using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Twaijrig_Task.Models
{
    public class ApplicationUser: IdentityUser
    {
        [Required, MaxLength(100)]
        public string? FirstName { get; set; }

        [Required, MaxLength(100)]
        public string? LastName { get; set; }

        [Required, MaxLength(50)]
        public string? Gender { get; set; }

        [MaxLength(100)]
        public string? City { get; set; }
    }
}
