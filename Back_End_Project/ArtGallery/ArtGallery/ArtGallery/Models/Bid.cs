namespace ArtGallery.Models
{
    public class Bid
    {
        public int Id { get; set; }
        public float BidValue { get; set; }
        public DateTime BidDate { get; set; }

        public int ArtworkId { get; set; }
        public Artwork Artwork { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

    }
}
