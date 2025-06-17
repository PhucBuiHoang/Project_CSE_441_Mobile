namespace ArtGallery.Models
{
    public class WishList
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int ArtworkId { get; set; }
        public Artwork Artwork { get; set; }

    }
}
