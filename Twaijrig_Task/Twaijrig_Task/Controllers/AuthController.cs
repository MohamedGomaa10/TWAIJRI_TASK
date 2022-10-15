using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static Twaijrig_Task.Models.Account;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Twaijrig_Task.Models;
using DbContext_Twaijrig;

namespace Twaijrig_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly Twaijrig_TaskContext _context;
        public AuthController(ILogger<WeatherForecastController> logger, UserManager<ApplicationUser> userManager,
             SignInManager<ApplicationUser> signInManager, IConfiguration config, RoleManager<IdentityRole> roleManager,
            Twaijrig_TaskContext context)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = config;
            _roleManager = roleManager;
            _context = context;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
            {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(model.Email);
                if (existingUser == null)
                {
                    ApplicationUser user = new ApplicationUser();
                    user.UserName = model.FirstName + model.LastName;
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.Gender = model.Gender;
                    user.Email = model.Email;
                    user.City = model.City;
                    user.EmailConfirmed = true;
                 
                    IdentityResult result = _userManager.CreateAsync(user, model.Password).Result;
                    Customer customer = new Customer
                    {
                        CutomerName = model.FirstName+" "+model.LastName,
                        PhoneNumber = model.PhoneNumber,
                        UserID=user.Id
                    };
                    _context.Customers.Add(customer);
                    await _context.SaveChangesAsync();

                    if (result.Succeeded)
                    {
                        //await _userManager.AddToRoleAsync(user, "Client");
                        return Created("", model);
                    }
                }
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
         {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    var passwordCheck = await _signInManager.PasswordSignInAsync(user, model.Password, false, true);

                    if (passwordCheck.Succeeded)
                    {
                        var claims = new List<Claim>
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        };
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
                        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                           _configuration["Tokens:Issuer"],
                            _configuration["Tokens:Audience"],
                            claims,
                            expires: DateTime.Now.AddDays(1),
                            signingCredentials: credentials
                            );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        });
                    }

                }
                else
                {
                    return Unauthorized("Invalid username or password");
                }
            }

            return BadRequest(404);
        }
    }
}
