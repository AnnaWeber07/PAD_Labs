using CCS;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;


namespace Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<ClimateModel> ClimateData { get; set; }
    }
}
