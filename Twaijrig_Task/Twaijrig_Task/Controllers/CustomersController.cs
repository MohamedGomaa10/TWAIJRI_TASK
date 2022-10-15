using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DbContext_Twaijrig;
using Twaijrig_Task.Models;
using Microsoft.AspNetCore.Authorization;
using Twaijrig_Task.Dtos;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Twaijrig_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomersController : ControllerBase
    {
        private readonly Twaijrig_TaskContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public CustomersController(Twaijrig_TaskContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _context.Customers.Include(c=>c.Invoices).Where(c=>c.UserID!=userId).ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("EditCustomer/{id}")]
        public async Task<IActionResult> EditCustomer(int id, CustomerDto customerDto)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return BadRequest("Not Found");
            }

            customer.CutomerName = customerDto.CutomerName;
            customer.PhoneNumber = customerDto.PhoneNumber;
    
            _context.Customers.Update(customer);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(customer);
        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("AddCustomer")]
        public async Task<ActionResult<Customer>> AddCustomer(CustomerDto customerDto)
        {

            Customer customer = new Customer
            {
                CutomerName = customerDto.CutomerName,
                PhoneNumber = customerDto.PhoneNumber,
            };
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            var user = await _userManager.FindByIdAsync(customer.UserID);
            if (customer == null&&user==null)
            {
                return NotFound();
            }
            if (user != null)
            {
                await _userManager.DeleteAsync(user);
            }
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok(200);
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}
