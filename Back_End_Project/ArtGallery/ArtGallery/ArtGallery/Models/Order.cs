namespace ArtGallery.Models
{
    public class Order
    {
        public int Id { get; set; }
        public double MoneyTotal { get; set; }
        public bool Status { get; set; }
        public string Address { get; set; }
        public long Phone { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }

    }
}
