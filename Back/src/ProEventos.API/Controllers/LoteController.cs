using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoteController : ControllerBase
{
    private readonly ILoteService service;

    // CONSTRUTOR
    public LoteController(ILoteService service)
    {
        this.service = service;
    }

    // A PATIR DO CONTEXTO, É POSSÍVEL MEXER COM O BANCO
    // PODENDO CONSULTAR, DELETAR, ATUALIZAR E ADICIONAR (CRUD)
    [HttpGet("{eventoId}")]
    public async Task<IActionResult> Get(int eventoId)
    {
        try
        {
            var lotes = await service.GetLotesByEventoByIdAsync(eventoId);
            if (lotes == null) return NoContent();

            return Ok(lotes);

        }
        catch (Exception ex)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro {ex.Message}");
        }
    }

    [HttpPut("{eventoId}")]
    public async Task<IActionResult> SaveLote(int eventoId, LoteDto[] models)
    {
        try
        {
            var lotes = await service.SaveLotes(eventoId, models);
            if (lotes == null) return NoContent();

            return Ok(lotes);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar salvar Lotes. Error: {ex.Message}");
        }
    }

    [HttpDelete("{eventoId}/{loteId}")]
    public async Task<IActionResult> Delete(int eventoId, int loteId)
    {
        try
        {

            var lote = await service.GetLoteByIdsAsync(eventoId, loteId);
            if (lote == null) return NoContent();

            return await service.DeleteLote(lote.EventoId, lote.Id)
                ?
                Ok(new { message = "Lote Deletado."})
                : 
                throw new Exception("Houve algum problema não específico ao tentar deletar Lote");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar deletar Lotes. Error: {ex.Message}");
        }
    }
}
