namespace ArtGallery.Models
{
    public class Artwork
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime StartBidDate { get; set; }
        public DateTime EndBidDate { get; set; }
        public bool Status { get; set; }
        public int CountLike { get; set; }
        public int Participants { get; set; }
        public float Price { get; set; }

        public int AuthorId { get; set; }
        public Author Author { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public ICollection<Bid> Bids { get; set; }
        public ICollection<WishList> Wishlists { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }

    }
}
