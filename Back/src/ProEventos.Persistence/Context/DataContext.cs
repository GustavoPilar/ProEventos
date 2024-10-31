using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Domain.Identity;

namespace ProEventos.Persistence.Contexto
{
    // A CLASSE DE CONTEXTO DO BANCO DE DADOS HERDA DO DBCONTEXT DO ENTITY FRAMEWORK CORE
    public class DataContext : IdentityDbContext<User, Role, int,
                                                IdentityUserClaim<int>,
                                                UserRole,
                                                IdentityUserLogin<int>,
                                                IdentityRoleClaim<int>,
                                                IdentityUserToken<int>
                                                >
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        // MAPEIA O BANCO DE DADOS DE ACORDO COM AS PROPRIEDADES DE <ENTIDADE>
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>(userRole =>
                {
                    userRole.HasKey(ur => new { ur.UserId, ur.RoleId});

                    userRole.HasOne(ur => ur.Role).WithMany(r => r.UsersRoles).HasForeignKey(ur => ur.RoleId).IsRequired();

                    userRole.HasOne(ur => ur.User).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.UserId).IsRequired();
                }
            );

            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(pe => new { pe.PalestranteId, pe.EventoId });

            modelBuilder.Entity<Evento>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Evento)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Palestrante>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Palestrante)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}