using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class LoteService : ILoteService
    {
        private readonly IGeralPersistence geralPersistence;
        private readonly ILotePersistence lotePersistence;
        private readonly IMapper mapper;

        public LoteService(IGeralPersistence geralPersistence, ILotePersistence lotePersistence, IMapper mapper)
        {
            this.geralPersistence = geralPersistence;
            this.lotePersistence = lotePersistence;
            this.mapper = mapper;
        }
        public async Task AddLote(int eventoId, LoteDto model)
        {
            try
            {
                var lote = mapper.Map<Lote>(model);
                lote.EventoId = eventoId;

                geralPersistence.Add(lote);
                
                await geralPersistence.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] models)
        {
            try
            {
                var lotes = await lotePersistence.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddLote(eventoId, model);
                    }
                    else
                    {
                        var lote = lotes.FirstOrDefault(lote => lote.Id == model.Id);
                        model.EventoId = eventoId;

                        mapper.Map(model, lote);

                        geralPersistence.Update<Lote>(lote);

                        await geralPersistence.SaveChangesAsync();
                    }
                }

                var loteRetorno = await lotePersistence.GetLotesByEventoIdAsync(eventoId);


                return mapper.Map<LoteDto[]>(loteRetorno);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteLote(int eventoId, int loteId)
        {
            try
            {
                var lote = await lotePersistence.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) throw new Exception("Evento não Encontrado");

                geralPersistence.Delete(lote);
                return await geralPersistence.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> GetLotesByEventoByIdAsync(int eventoId)
        {
            try
            {
                var lotes = await lotePersistence.GetLotesByEventoIdAsync(eventoId);
                if (lotes == null) return null;

                var resultado = mapper.Map<LoteDto[]>(lotes);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId)
        {
            try
            {
                var lote = await lotePersistence.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) return null;

                var resultado = mapper.Map<LoteDto>(lote);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}