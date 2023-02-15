using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Context
{
    public class BDO_Context: DbContext
    {
        public BDO_Context(DbContextOptions<BDO_Context> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Result> Results { get; set; }
    }
}
