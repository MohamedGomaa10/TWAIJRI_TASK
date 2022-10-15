using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DbContext_Twaijrig;
using Twaijrig_Task.Models;
using System.Security.Claims;
using Twaijrig_Task.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Twaijrig_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InvoicesController : ControllerBase
    {
        private readonly Twaijrig_TaskContext _context;

        public InvoicesController(Twaijrig_TaskContext context)
        {
            _context = context;
        }

        // GET: api/GetAllInvoices
        [HttpGet("GetAllInvoices")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetAllInvoices()
        {
            return await _context.Invoices.Include(c => c.Customer).Include(c=>c.Customer.User).ToListAsync();
        }
        // GET: api/GetInvoicesPaid
        [HttpGet("GetInvoicesPaid")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesPaid()
        {
            return await _context.Invoices.Include(c=>c.Customer).Where(c=>c.State==State.Pay).ToListAsync();
        }
        // GET: api/GetInvoicesUnPaid
        [HttpGet("GetInvoicesUnPaid")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesUnPaid()
        {
            return await _context.Invoices.Include(c => c.Customer).Where(c => c.State == State.NotPay).ToListAsync();
        }

        // GET: api/GetInvoiceById/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoiceById(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("EditInvoice/{id}")]
        public async Task<IActionResult> EditInvoice(int id, InvoiceDto invoiceDto)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return BadRequest("Not Found");
            }
            invoice.Value=invoiceDto.Value;
            invoice.InvoiceDate=invoiceDto.InvoiceDate;
            invoice.State= (State?)invoiceDto.state;
            _context.Invoices.Update(invoice); 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(200);
        }

        // POST: api/AddInvoice
        [HttpPost("AddInvoice")]
        public async Task<ActionResult<Invoice>> AddInvoice(InvoiceDto invoiceDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var CustomerId =  _context.Customers.FirstOrDefaultAsync(c=>c.UserID==userId).Result?.CustomerId;

            Invoice invoice = new Invoice
            {
                Value = invoiceDto.Value,
                InvoiceDate = invoiceDto.InvoiceDate,
                CustomerId= (int)CustomerId,
                State= (State?)invoiceDto.state,
            };
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(invoice);
        }
        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.InvoiceId == id);
        }
    }
}
