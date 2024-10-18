using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Data;
using ProEventos.API.models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{
    // CONSTRUTOR
    
    private readonly DataContext _context;
    // CONTEXTO DO MEU BANCO DE DADOS
    // CONSTRUTOR RECEBE O CONTEXTO
    public EventoController(DataContext context)
    {
            _context = context;
    }

    // A PATIR DO CONTEXTO, É POSSÍVEL MEXER COM O BANCO
    // PODENDO CONSULTAR, DELETAR, ATUALIZAR E ADICIONAR (CRUD)
    [HttpGet]
    public IEnumerable<Evento> Get()
    {
        return _context.Eventos;
    }

    [HttpGet("{id}")]
    public Evento GetById(int id)
    {
        return _context.Eventos.FirstOrDefault(e => e.EventoId == id); // Possivel retorno null
    }

    [HttpPost]
    public string Post()
    {
        return "Exemplo de Post";
    }

    [HttpPut("{id}")]
    public string Put(int id)
    {
        return $"Exemplo de Put com id = {id}";
    }

    [HttpDelete("{id}")]
    public string Delete(int id)
    {
        return $"Exemplo de Delete com id = {id}";
    }
}
