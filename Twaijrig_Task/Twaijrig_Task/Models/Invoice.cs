using System.ComponentModel.DataAnnotations;

namespace Twaijrig_Task.Models
{
    public class Invoice
    {
        [Key]
        public int InvoiceId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public decimal Value { get; set; }
        public State? State { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer{ get; set; }
    }


    public enum State
    {
        Pay=1,
        NotPay=0
    }

}
