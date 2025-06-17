using ArtGallery.Data;
using ArtGallery.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtGallery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly ArtGalleryContext _context;

        public UserController(ArtGalleryContext context)
        {
            _context = context;
        }


        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetByIdAsync(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }
    }
}
