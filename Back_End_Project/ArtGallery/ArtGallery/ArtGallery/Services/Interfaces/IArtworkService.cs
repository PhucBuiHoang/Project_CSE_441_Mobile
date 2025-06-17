using ArtGallery.Models;

namespace ArtGallery.Services.Interfaces
{
    public interface IArtworkService
    {
        Task<IEnumerable<Artwork>> GetAllAsync();
        Task<Artwork> GetByIdAsync(int id);
        Task<IEnumerable<Artwork>> GetAllWithCategoryAuthorAsync();
        Task<Artwork> GetByIdWithCategoryAuthorAsync(int id);
    }
}
