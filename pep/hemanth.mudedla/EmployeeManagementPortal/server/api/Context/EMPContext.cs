using api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Context
{
    public class EMPContext : DbContext
    {
        public EMPContext(DbContextOptions<EMPContext> options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }
    }
}
