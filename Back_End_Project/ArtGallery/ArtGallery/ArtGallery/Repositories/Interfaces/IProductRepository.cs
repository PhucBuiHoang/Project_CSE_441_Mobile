using ArtGallery.Models;

namespace ArtGallery.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Artwork>> GetAllAsync();
        Task<Artwork> GetByIdAsync(int id);
        Task<IEnumerable<Artwork>> GetAllWithCategoryAuthorAsync();
        Task<Artwork> GetByIdWithCategoryAuthorAsync(int id);
    }
}
