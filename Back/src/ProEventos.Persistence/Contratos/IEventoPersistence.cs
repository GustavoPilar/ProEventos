using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IEventoPersistence
    {
        // EVENTOS
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(bool incluirPalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int id, bool incluirPalestrantes = false);
    }
}