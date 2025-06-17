using ArtGallery.Models;
using ArtGallery.Repositories.Interfaces;
using ArtGallery.Services.Interfaces;

namespace ArtGallery.Services.Implementations
{
    public class ArtworkService : IArtworkService
    {
        private readonly IProductRepository _repository;

        public ArtworkService(IProductRepository repository)
        {
            _repository = repository;
        }
        public Task<IEnumerable<Artwork>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Artwork>> GetAllWithCategoryAuthorAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Artwork> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Artwork> GetByIdWithCategoryAuthorAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
