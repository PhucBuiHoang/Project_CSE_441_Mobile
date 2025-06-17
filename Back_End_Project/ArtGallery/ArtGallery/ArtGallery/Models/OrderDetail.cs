namespace ArtGallery.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int ArtworkId { get; set; }
        public Artwork Artwork { get; set; }

        public double Price { get; set; }

    }
}
