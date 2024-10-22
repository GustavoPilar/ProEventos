using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexto;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class PalestrantePesistence : IPalestrantePesistence
    {
        private readonly DataContext _context;

        public PalestrantePesistence(DataContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(string tema, bool incluirEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.RedesSociais);

            if (incluirEventos)
            {
                query = query.Include(p => p.PalestrantesEventos)
                        .ThenInclude(pe => pe.Evento);
            }

            query = query.OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool incluirEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.RedesSociais);

            if (incluirEventos) {
                query = query.Include(p => p.PalestrantesEventos)
                        .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(p => p.Id)
                        .Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteByIdAsync(int id, bool incluirEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.RedesSociais);

            if (incluirEventos) {
                query = query.Include(p => p.PalestrantesEventos)
                        .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(p => p.Id)
                        .Where(p => p.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}