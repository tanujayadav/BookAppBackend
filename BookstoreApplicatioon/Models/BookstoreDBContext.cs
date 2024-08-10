using Microsoft.EntityFrameworkCore;

namespace BookstoreApplicatioon.Models
{
    public class BookstoreDBContext : DbContext
    {
        public BookstoreDBContext(DbContextOptions<BookstoreDBContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        

        public DbSet<Book> Books { get; set; }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Add additional model configurations here
        }
    }
}
