using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IPalestrantesService
    {
        Task<Palestrante> AddPalestrante(Palestrante model);
        Task<Palestrante> UpdatePalestrante(int id, Palestrante model);
        Task<bool> DeletePalestantre(int id, Palestrante model);

        Task<Palestrante[]> GetAllPalestrantesAsync(bool incluirEventos = false);
        Task<Palestrante[]> GetAllPalestranteByNomesAsync(string nome, bool incluirEventos = false);
        Task<Palestrante> GetPalestranteByIdAsync(int id, bool incluirEventos = false);
    }
}