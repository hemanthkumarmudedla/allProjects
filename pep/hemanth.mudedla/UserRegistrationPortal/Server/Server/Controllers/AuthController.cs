using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Context;
using Server.Models.Entity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        private UrpContext _context;

        public AuthController(IConfiguration config, UrpContext context)
        {
            _configuration = config;
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] Auth auth)
        {
            var verifyUsername = VerifyUsername(auth);
            if (verifyUsername == null)
            {
                return NotFound("Username Not Found");
            }
            else
            {
                var authUser = Authenticate(auth);
                if (authUser != null)
                {
                    var token = Generate(authUser);
                    return Ok(token);
                }
                else
                {
                    var lockout = Lockout(auth);
                    if (lockout != null)
                    {
                        return Unauthorized($"Account is locked out.\n Try after {lockout.LockoutEnd}.");
                    }
                    else
                    {
                        return Unauthorized("Wrong credentials");
                    }
                }
                
            }
        }
        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KqcL7s998JrfFHRP"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.Locality, user.Location),
                new Claim(ClaimTypes.MobilePhone, user.MobileNo),
                new Claim(ClaimTypes.Gender, user.Gender),
            };

            var token = new JwtSecurityToken(
                _configuration["Jwt: Issuer"],
                _configuration["Jwt: Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private User VerifyUsername(Auth auth)
        {
            var record = _context.Users.FirstOrDefault(o => o.Username.ToLower() ==
                auth.Username.ToLower());
            if (record != null)
            {
                return record;
            }
            return null;
        }
        private User Authenticate(Auth auth)
        {
            var record = _context.Users.FirstOrDefault(o => o.Username.ToLower() ==
                auth.Username.ToLower() && o.Password == auth.Password);

            if (record != null)
            {
                if (record.IsLocked == false || DateTime.UtcNow > record.LockoutEnd)
                {
                    record.FailedAttemptCount = 0;
                    record.IsLocked = false;
                    record.LockoutEnd = null;
                    _context.SaveChangesAsync();
                    return record;
                }
                return null;
            }
            return null;
        }
        private User Lockout(Auth auth)
        {
            var user = _context.Users.FirstOrDefault(o => o.Username.ToLower() ==
                auth.Username.ToLower());
            user.FailedAttemptCount++;
            if (user.FailedAttemptCount >= 3)
            {
                user.IsLocked = true;
                user.LockoutEnd = DateTime.UtcNow.AddMinutes(30);
                _context.SaveChangesAsync();
                return user;
            }
            else
            {
                _context.SaveChangesAsync();
                return null;
            }
        }
    }
}
