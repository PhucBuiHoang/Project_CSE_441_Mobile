using ArtGallery.Data;
using ArtGallery.DTOs;
using ArtGallery.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ArtGallery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ArtGalleryContext _context;
        private readonly IConfiguration _config;
        public AuthController(ArtGalleryContext context,IConfiguration config)
        {
            _config = config;
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.User.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid username or password." });
            }

            var token = GenerateToken(user);
            return Ok(new { token });
        }

        [AllowAnonymous]
        [HttpPost("signUp")]
        public async Task<IActionResult> SignUp([FromBody] LoginRequest request)
        {
            if (await _context.User.AnyAsync(u => u.Username == request.Username))
            {
                ModelState.AddModelError("", "Username already exists.");
                return BadRequest(ModelState);
            }
            var user = new User(
                Username: request.Username,
                Password: BCrypt.Net.BCrypt.HashPassword(request.Password)
            );
            var role = await _context.Role.FirstOrDefaultAsync(r => r.Name == "User");
            if (role == null)
            {
                ModelState.AddModelError("", "Role 'User' does not exist.");
                return BadRequest(ModelState);
            }
            user.UserRoles = new List<UserRole>
            {
                new UserRole
                {
                    User = user,
                    Role = role
                }
            };
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [Authorize]
        [HttpPost("profile")]
        public async Task<IActionResult> Profile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { message = "User not logged in." });
            }

            var user = await _context.User
                .Include(u => u.Wishlists)
                    .ThenInclude(w => w.Artwork)
                .FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            var result = new
            {
                id = user.Id,
                username = user.Username,
                fullName = user.Username, // Nếu bạn có tên riêng thì dùng cột khác
                avatarUrl = "https://placehold.co/80x80", // Hoặc user.Avatar nếu bạn có cột ảnh đại diện
                wishlists = user.Wishlists.Select(w => new
                {
                    id = w.Artwork.Id,
                    title = w.Artwork.Title,
                    imageUrl = w.Artwork.ImageUrl
                }).ToList()
            };

            return Ok(result);
        }



        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                //new Claim(ClaimTypes.Role,user.Role)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

    }
}
