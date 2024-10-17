using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.API.models;

namespace ProEventos.API.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        //Mapeia o meu banco de dados de acordo com as propriedades que a <entidade> contém
        public DbSet<Evento> Eventos { get; set; }
    }
}