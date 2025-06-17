namespace ArtGallery.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public DateTime? Dob { get; set; }
        public string? Image { get; set; }
        public ICollection<Artwork> Artworks { get; set; }

    }
}
