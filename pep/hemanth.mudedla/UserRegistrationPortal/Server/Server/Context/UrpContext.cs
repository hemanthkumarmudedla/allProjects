using Microsoft.EntityFrameworkCore;
using Server.Models.Entity;

namespace Server.Context
{
    public class UrpContext: DbContext
    {
        public UrpContext(DbContextOptions<UrpContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        public DbSet<User> Users { get; set; }
    }
}
