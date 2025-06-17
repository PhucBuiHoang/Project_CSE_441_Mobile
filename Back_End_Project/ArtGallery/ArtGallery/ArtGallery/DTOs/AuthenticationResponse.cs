namespace ArtGallery.DTOs
{
    public class AuthenticationResponse
    {
        public string Username { get; set; }
        public string Token { get; set; }
        //public string RefreshToken { get; set; }
        public int TokenExpiry { get; set; }
    }
}
