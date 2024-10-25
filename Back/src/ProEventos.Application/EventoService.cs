using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersistence geralPersistence;
        private readonly IEventoPersistence eventoPersistence;
        private readonly IMapper mapper;

        public EventoService(IGeralPersistence geralPersistence, IEventoPersistence eventoPersistence, IMapper mapper)
        {
            this.geralPersistence = geralPersistence;
            this.eventoPersistence = eventoPersistence;
            this.mapper = mapper;
        }
        public async Task<EventoDto> AddEventos(EventoDto model)
        {
            try
            {
                var evento = mapper.Map<Evento>(model);

                geralPersistence.Add(evento);
                if (await geralPersistence.SaveChangesAsync()) {
                    var eventoRetorno = await eventoPersistence.GetEventoByIdAsync(evento.Id, false);
                    return mapper.Map<EventoDto>(eventoRetorno);
                }
                
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> UpdateEvento(int id, EventoDto model)
        {
            try
            {
                var evento = await eventoPersistence.GetEventoByIdAsync(id, false);
                if (evento == null) return null;

                model.Id = evento.Id;

                mapper.Map(model, evento);

                geralPersistence.Update<Evento>(evento);

                if (await geralPersistence.SaveChangesAsync()) {
                    var eventoRetorno = await eventoPersistence.GetEventoByIdAsync(evento.Id, false);
                    return mapper.Map<EventoDto>(eventoRetorno);
                }
                
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEvento(int id)
        {
            try
            {
                var evento = await eventoPersistence.GetEventoByIdAsync(id, false);
                if (evento == null) throw new Exception("Evento não Encontrado");

                geralPersistence.Delete(evento);
                return await geralPersistence.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosAsync(bool incluirPalestrantes = false)
        {
            try
            {
                var eventos = await eventoPersistence.GetAllEventosAsync(incluirPalestrantes);
                if (eventos == null) return null;

                var resultado = mapper.Map<EventoDto[]>(eventos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false)
        {
            try
            {
                var eventos = await eventoPersistence.GetAllEventosByTemaAsync(tema, incluirPalestrantes);
                if (eventos == null) return null;

                var resultado = mapper.Map<EventoDto[]>(eventos);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<EventoDto> GetEventoByIdAsync(int id, bool incluirPalestrantes = false)
        {
            try
            {
                var evento = await eventoPersistence.GetEventoByIdAsync(id, incluirPalestrantes);
                if (evento == null) return null;

                var resultado = mapper.Map<EventoDto>(evento);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}