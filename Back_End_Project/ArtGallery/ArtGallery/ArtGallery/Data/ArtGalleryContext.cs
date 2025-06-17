using System.Collections.Generic;
using System;
using ArtGallery.Models;
using Microsoft.EntityFrameworkCore;

namespace ArtGallery.Data
{
    public class ArtGalleryContext : DbContext
    {
        public ArtGalleryContext(DbContextOptions<ArtGalleryContext> options) : base(options) { }

        public DbSet<Artwork> Artwork { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Bid> Bid { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<WishList> WishList { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Artwork>()
                .HasOne(a => a.Author)
                .WithMany(a => a.Artworks)
                .HasForeignKey(a => a.AuthorId);
            modelBuilder.Entity<Artwork>()
                .HasOne(a => a.Category)
                .WithMany(c => c.Artworks)
                .HasForeignKey(a => a.CategoryId);

            modelBuilder.Entity<UserRole>()
        .HasKey(ur => ur.Id);
            modelBuilder.Entity<UserRole>()
               .HasOne(ur => ur.User)
               .WithMany(u => u.UserRoles)
               .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<WishList>()
        .HasKey(w => w.Id);
            modelBuilder.Entity<WishList>()
                .HasOne(wl => wl.User)
                .WithMany(u => u.Wishlists)
                .HasForeignKey(wl => wl.UserId);
            modelBuilder.Entity<WishList>()
                .HasOne(wl => wl.Artwork)
                .WithMany(a => a.Wishlists)
                .HasForeignKey(wl => wl.ArtworkId);

            modelBuilder.Entity<OrderDetail>()
        .HasKey(od => od.Id);
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Artwork)
                .WithMany(a => a.OrderDetails)
                .HasForeignKey(od => od.ArtworkId);
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId);

            modelBuilder.Entity<Bid>()
        .HasKey(b => b.Id);
            modelBuilder.Entity<Bid>()
                .HasOne(b => b.Artwork)
                .WithMany(a => a.Bids)
                .HasForeignKey(b => b.ArtworkId);
            modelBuilder.Entity<Bid>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bids)
                .HasForeignKey(b => b.UserId);
        }
    }
}
