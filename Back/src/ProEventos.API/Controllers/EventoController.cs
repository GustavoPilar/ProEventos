using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{
    private readonly IEventoService service;
    private readonly IWebHostEnvironment hostEnvironment;

    // CONSTRUTOR
    public EventoController(IEventoService service, IWebHostEnvironment hostEnvironment)
    {
        this.service = service;
        this.hostEnvironment = hostEnvironment;
    }

    // A PATIR DO CONTEXTO, É POSSÍVEL MEXER COM O BANCO
    // PODENDO CONSULTAR, DELETAR, ATUALIZAR E ADICIONAR (CRUD)
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var eventos = await service.GetAllEventosAsync(true);
            if (eventos == null) return NoContent();

            return Ok(eventos);

        }
        catch (Exception ex)
        {

            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        try
        {
            var eventos = await service.GetEventoByIdAsync(id, true);
            if (eventos == null) return NoContent();

            return Ok(eventos);

        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar evento. Erro {ex.Message}");
        }
    }

    [HttpGet("tema/{tema}")]
    public async Task<IActionResult> getByTema(string tema)
    {
        try
        {
            var eventos = await service.GetAllEventosByTemaAsync(tema, true);
            if (eventos == null) return NoContent();

            return Ok(eventos);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(EventoDto model)
    {
        try
        {
            var evento = await service.AddEventos(model);
            if (evento == null) return NoContent();
            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar Evento. Error: {ex.Message}");
        }
    }

    [HttpPost("upload-image/{eventoId}")]
    public async Task<IActionResult> UploadImage(int eventoId)
    {
        try
        {
            var evento = await service.GetEventoByIdAsync(eventoId, true);
            if (evento == null) return NoContent();

            var file = Request.Form.Files[0];

            if (file.Length > 0)
            {
                DeleteImage(evento.ImagemURL);
                evento.ImagemURL = await SaveImage(file);
            }

            var eventoRetorno = await service.UpdateEvento(eventoId, evento);

            return Ok(eventoRetorno);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar Evento. Error: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, EventoDto model)
    {
        try
        {
            var evento = await service.UpdateEvento(id, model);
            if (evento == null) return NoContent();

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar Evento. Error: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {

            var eventos = await service.GetEventoByIdAsync(id, true);
            if (eventos == null) return NoContent();

            return await service.DeleteEvento(id) ?
                Ok(new { message = "Deletado." }) :
                throw new Exception("Houve algum problema não específico ao tentar deletar Evento");
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar deletar Evento. Error: {ex.Message}");
        }
    }

    [NonAction]
    public async Task<string> SaveImage(IFormFile imageFile)
    {
        string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');

        imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

        var imagePath = Path.Combine(hostEnvironment.ContentRootPath, @"Resources/images", imageName);

        using (var fileStream = new FileStream(imagePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(fileStream);
        }

        return imageName;
    }

    [NonAction]
    public void DeleteImage(string imageName)
    {
        var imagePath = Path.Combine(hostEnvironment.ContentRootPath, @"Resources/images", imageName);
        if (System.IO.File.Exists(imagePath))
        {
            System.IO.File.Delete(imagePath);
        }
    }
}
