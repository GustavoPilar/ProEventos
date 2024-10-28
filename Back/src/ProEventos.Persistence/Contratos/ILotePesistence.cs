using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersistence
    {
        /// <summary>
        /// Método get que retornará uma lista de lotes por eventoId.
        /// </summary>
        /// <param name="eventoId">Código chave da tabela Evento</param>
        /// <returns>Lista de lotes</returns> 
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        
        /// <summary>
        /// Métodos get que retornará apenas 1 lote.
        /// </summary>
        /// <param name="eventoId">Còdigo chave da tabela Evento</param>
        /// <param name="id">Código chave da tabela Lote</param>
        /// <returns>Apanas um lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);
    }
}