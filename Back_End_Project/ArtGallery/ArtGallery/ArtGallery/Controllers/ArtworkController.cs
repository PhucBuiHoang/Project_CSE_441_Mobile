using ArtGallery.Data;
using ArtGallery.DTOs;
using ArtGallery.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ArtGallery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtworkController : ControllerBase
    {
        private readonly ArtGalleryContext _context;

        public ArtworkController(ArtGalleryContext context)
        {
            _context = context;
        }

        // GET: api/artwork
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetAllAsync()
        {
            var artworks = await _context.Artwork.Select(a => new ArtworkDto
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                ImageUrl = a.ImageUrl,
                EndBidDate = a.EndBidDate,
                AuthorName = a.Author.Name,
                Price = a.Price,
                Participants = a.Participants,
                CountLike = a.CountLike,
                GenreName = a.Category.Name
            }).ToListAsync();
            return Ok(artworks);
        }
        [HttpGet("top6")]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetTop6Async()
        {
            var artworks = await _context.Artwork
                .OrderByDescending(artwork => artwork.CountLike)
                .Select(a => new ArtworkDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Description = a.Description,
                    ImageUrl = a.ImageUrl,
                    EndBidDate = a.EndBidDate,
                    AuthorName = a.Author.Name,
                    Price = a.Price,
                    Participants = a.Participants,
                    CountLike = a.CountLike,
                    GenreName = a.Category.Name
                })
                .Take(6)
                .ToListAsync();
            return Ok(artworks);
        }

        // GET: api/artwork/with-category-author
        [HttpGet("with-category-author")]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetAllWithCategoryAuthorAsync()
        {
            var artworks = await _context.Artwork
                .Include(a => a.Category)
                .Include(a => a.Author)
                .ToListAsync();

            return Ok(artworks);
        }

        // GET: api/artwork/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Artwork>> GetByIdAsync(int id)
        {
            var artwork = await _context.Artwork
                .Select(a => new ArtworkDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Description = a.Description,
                    ImageUrl = a.ImageUrl,
                    EndBidDate = a.EndBidDate,
                    AuthorName = a.Author.Name,
                    Price = a.Price,
                    Participants = a.Participants,
                    CountLike = a.CountLike,
                    GenreName = a.Category.Name
                })
                .FirstOrDefaultAsync(a => a.Id == id);

            if (artwork == null)
                return NotFound();

            return Ok(artwork);
        }

        // GET: api/artwork/with-category-author/5
        [HttpGet("with-category-author/{id}")]
        public async Task<ActionResult<Artwork>> GetByIdWithCategoryAuthorAsync(int id)
        {
            var artwork = await _context.Artwork
                .Include(a => a.Category)
                .Include(a => a.Author)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (artwork == null)
                return NotFound();

            return Ok(artwork);
        }

        [HttpGet("byCategory/{id}")]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetArtworkByCategory(int id)
        {
            var artworks = await _context.Artwork
                .Where(a => a.CategoryId == id)
                .ToListAsync();
            return Ok(artworks);
        }
        [HttpGet("byAuthor/{id}")]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetArtworkByAuthor(int id)
        {
            var artworks = await _context.Artwork
                .Where(a => a.AuthorId == id)
                .ToListAsync();
            return Ok(artworks);
        }

        [HttpGet("getBiddingUpcoming")]
        public async Task<IActionResult> GetUpcomingArtworks()
        {
            var now = DateTime.UtcNow;
            var artworks = await _context.Artwork
     .Where(a => a.Status == true && a.StartBidDate > now)
     .Select(a => new ArtworkDto
     {
         Id = a.Id,
         Title = a.Title,
         Description = a.Description,
         ImageUrl = a.ImageUrl,
         EndBidDate = a.EndBidDate,
         AuthorName = a.Author.Name,
         Price = a.Price,
         Participants = a.Participants,
         CountLike = a.CountLike,
         GenreName = a.Category.Name
     })
     .ToListAsync();

            return Ok(artworks);
        }

        [HttpGet("getBidding")]
        public async Task<IActionResult> GetBiddingArtworks()
        {
            var now = DateTime.UtcNow;
            var artworks = await _context.Artwork
     .Where(a => a.Status == true && a.EndBidDate > now && a.StartBidDate <= now)
     .Select(a => new ArtworkDto
     {
         Id = a.Id,
         Title= a.Title,
         Description = a.Description,
         ImageUrl = a.ImageUrl,
         EndBidDate = a.EndBidDate,
         AuthorName = a.Author.Name,
         Price = a.Price,
         Participants = a.Participants,
         CountLike = a.CountLike,
         GenreName = a.Category.Name
     })
     .ToListAsync();

            return Ok(artworks);
        }
        [HttpGet("get5Bidding")]
        public async Task<IActionResult> Get5BidArtworks()
        {
            var now = DateTime.UtcNow;
            var artworks = await _context.Artwork
     .Where(a => a.Status == true && a.EndBidDate > now && a.StartBidDate <= now)
     .Select(a => new ArtworkDto
     {
         Id = a.Id,
         Title = a.Title,
         Description = a.Description,
         ImageUrl = a.ImageUrl,
         EndBidDate = a.EndBidDate,
         AuthorName = a.Author.Name,
         Price = a.Price,
         Participants = a.Participants,
         CountLike = a.CountLike,
         GenreName = a.Category.Name
     })
     .Take(5)
     .ToListAsync();

            return Ok(artworks);
        }

        //Find people who are bidding on a specific artwork
        [HttpGet("/users/{id}")]
        public async Task<ActionResult<Artwork>> GetUsersBiddingByIdAsync(int id)
        {
            var user = await _context.Bid.Where(b => b.ArtworkId == id)
                .Select(b => new UserDto
                {
                    Id = b.User.Id,
                    Username = b.User.Username,
                    BidDate = b.BidDate,
                    price = b.BidValue
                })
                .ToListAsync();
            return Ok(user);
        }


        [Authorize]
        [HttpGet("biddingByUser")]
        public async Task<IActionResult> GetBiddingArtworksByUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var now = DateTime.UtcNow;
            var artworks = await _context.Artwork
                .Where(a => a.Status == true && a.EndBidDate > now && a.StartBidDate <= now)
                .Include(a => a.Author)
                .Include(a => a.Bids)
                .ThenInclude(b => b.User)
                .Where(a => a.Bids.Any(b => b.UserId == Convert.ToInt32(userId)))
                .ToListAsync();

            return Ok(artworks);
        }


        [Authorize]
        [HttpPost("like/{id}")]
        public IActionResult LikeArtwork(int id)
        {
            int artworkId = id;
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return RedirectToAction("Login");
            }
            var artExists = _context.Artwork.Any(d => d.Id == artworkId);
            if (!artExists)
            {
                return NotFound("Artwork not found.");
            }

            var existing = _context.WishList.FirstOrDefault(w => w.UserId == Convert.ToInt32(userId) && w.ArtworkId == artworkId);
            if (existing == null)
            {
                _context.WishList.Add(new WishList
                {
                    UserId = Convert.ToInt32(userId),
                    ArtworkId = artworkId
                });
                _context.SaveChanges();
            }
            else
            {
                _context.WishList.Remove(existing);
                _context.SaveChanges();
            }

            return Ok();

        }
    }
}
