namespace ArtGallery.Models
{
    public class User
    {
        public User(string Username, string Password)
        {
            this.Username = Username;
            this.Password = Password;
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? Address { get; set; }
        public long? Phone { get; set; }
        public string? Email { get; set; }

        public ICollection<Bid> Bids { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<WishList> Wishlists { get; set; }
        public ICollection<Order> Orders { get; set; }

    }
}
