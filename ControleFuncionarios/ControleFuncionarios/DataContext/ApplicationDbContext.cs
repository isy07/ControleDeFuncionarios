using ControleFuncionarios.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleFuncionarios.DataContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {          
        }
        public DbSet<FuncionarioModel> Funcionarios { get; set; }
    }
}
