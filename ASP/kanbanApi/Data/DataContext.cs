using Microsoft.EntityFrameworkCore;

namespace kanbanApi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Todo> Todos { get; set; }

    public DbSet<Doing> Doings { get; set; }

    public DbSet<Done> Dones { get; set; }

  }
}
