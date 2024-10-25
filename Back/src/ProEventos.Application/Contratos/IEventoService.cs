using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEvento(int id, EventoDto model);
        Task<bool> DeleteEvento(int id);

        Task<EventoDto[]> GetAllEventosAsync(bool incluirPalestrantes = false);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false);
        Task<EventoDto> GetEventoByIdAsync(int id, bool incluirPalestrantes = false);
    }
}