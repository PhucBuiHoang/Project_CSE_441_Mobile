using ArtGallery.Data;
using ArtGallery.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtGallery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ArtGalleryContext _context;

        public CategoryController(ArtGalleryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllAsync()
        {
            var categories = await _context.Category.ToListAsync();
            return Ok(categories);
        }
       
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetByIdAsync(int id)
        {
            var category = await _context.Category.FindAsync(id);

            if (category == null)
                return NotFound();

            return Ok(category);
        }
    }
}
