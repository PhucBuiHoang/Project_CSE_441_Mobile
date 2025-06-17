using ArtGallery.Data;
using ArtGallery.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtGallery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly ArtGalleryContext _context;

        public AuthorController(ArtGalleryContext context)
        {
            _context = context;
        }

        // GET: api/author
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAllAsync()
        {
            var authors = await _context.Author.ToListAsync();
            return Ok(authors);
        }
        // GET: api/author/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetByIdAsync(int id)
        {
            var author = await _context.Author.FindAsync(id);

            if (author == null)
                return NotFound();

            return Ok(author);
        }
    }
}
