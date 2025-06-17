using ArtGallery.Data;
using ArtGallery.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ArtGallery.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly ArtGalleryContext _context;

        public BidController(ArtGalleryContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpPost("bid")]
        public async Task<IActionResult> BidAsync([FromBody] Bidding bidding)
        {
            var artwork = await _context.Artwork.FindAsync(bidding.Id);
            if (artwork == null)
            {
                return NotFound("Artwork not found.");
            }

            if (bidding.Price <= artwork.Price)
            {
                return BadRequest("Bid price must be higher than the current price.");
            }

            if (artwork.EndBidDate < DateTime.UtcNow)
            {
                return BadRequest("Bidding period has ended.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not identified.");
            }

            var bid = new Models.Bid
            {
                ArtworkId = bidding.Id,
                BidValue = bidding.Price,
                UserId = int.Parse(userId),
                BidDate = DateTime.UtcNow,
            };

            await _context.Bid.AddAsync(bid);

            artwork.Price = bidding.Price;
            artwork.Participants++;

            _context.Artwork.Update(artwork);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Bid placed successfully." });
        }

    }
}
