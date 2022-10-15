using System.ComponentModel.DataAnnotations;

namespace Twaijrig_Task.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string? CutomerName { get; set; }
        public int PhoneNumber { get; set; }
        public string? UserID { get; set; }
        public ApplicationUser? User { get; set; }
        public virtual ICollection<Invoice>? Invoices { get; set; }
    }
}
