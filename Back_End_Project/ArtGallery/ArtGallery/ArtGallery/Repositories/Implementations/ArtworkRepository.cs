using ArtGallery.Data;
using ArtGallery.Models;
using ArtGallery.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace ArtGallery.Repositories.Implementations
{
    public class ArtworkRepository : IProductRepository
    {
        private readonly ArtGalleryContext _context;

        public ArtworkRepository(ArtGalleryContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Artwork>> GetAllAsync()
        {
            return await _context.Artwork
            .ToListAsync();
        }

        public async Task<IEnumerable<Artwork>> GetAllWithCategoryAuthorAsync()
        {
            return await _context.Artwork
            //.Include(p => p.Category) // Eager loading
            .ToListAsync();
        }

        public async Task<Artwork> GetByIdAsync(int id)
        {
            return await _context.Artwork
           //.Include(p => p.Category) // Eager loading
           .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Artwork> GetByIdWithCategoryAuthorAsync(int id)
        {
            return await _context.Artwork
           //.Include(p => p.Category) // Eager loading
           .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
