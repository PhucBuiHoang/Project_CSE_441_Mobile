namespace ArtGallery.DTOs
{
    public class ArtworkDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime EndBidDate { get; set; }
        public string AuthorName { get; set; }
        public double Price { get; set; }
        public int Participants { get; set; }
        public int CountLike { get; set; }
        public string GenreName { get; set; }
    } 
}
