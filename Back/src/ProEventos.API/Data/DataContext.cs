using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.API.models;

namespace ProEventos.API.Data
{
    // A CLASSE DE CONTEXTO DO BANCO DE DADOS HERDA DO DBCONTEXT DO ENTITY FRAMEWORK CORE
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        // MAPEIA O BANCO DE DADOS DE ACORDO COM AS PROPRIEDADES DE <ENTIDADE>
        public DbSet<Evento> Eventos { get; set; }
    }
}