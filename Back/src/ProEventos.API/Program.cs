using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;
using ProEventos.Application;
using ProEventos.Application.Contratos;
using ProEventos.Persistence;
using ProEventos.Persistence.Contexto;
using ProEventos.Persistence.Contratos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson(
    x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<ILoteService, LoteService>();

builder.Services.AddScoped<IGeralPersistence, GeralProEventosPersistence>();
builder.Services.AddScoped<IEventoPersistence, EventoPersistence>();
builder.Services.AddScoped<ILotePersistence, LotePersistence>();

// Add Data Base Context
builder.Services.AddDbContext<DataContext>(
    context => context.UseSqlite(builder.Configuration.GetConnectionString("Default"))
    // ESSE SERÁ O CONTEXTO CONFIGURADO NA QUAL O CONSTRUTOR DO DATACONTEXT IRÁ RECEBER COMO ARGUMENTO DO CONSTRUTOR
    // É PRECISO HAVER ESSA CONFIGURAÇÃO DENTRO DO APPSETTINGS.JSON
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.UseCors(
    x => x.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

// USA ARQUIVOS ESTÁTICOS (EX.: IMAGENS)
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Resources")),
    RequestPath = new PathString("/Resources")
});

app.MapControllers();

app.Run();

