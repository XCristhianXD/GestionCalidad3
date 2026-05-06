using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using GestionCalidad.Backend.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("GestionCalidadContext")
    ?? Environment.GetEnvironmentVariable("ConnectionStrings__GestionCalidadContext");

builder.Services.AddDbContext<GestionCalidadContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddHttpClient();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuración del puerto igual a tu código
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<GestionCalidadContext>();

    context.Database.EnsureDeleted();   // 💣 BORRA TODO
    context.Database.EnsureCreated();   // 🧱 CREA BIEN
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

// ===============================
// 🔥 ESTO ES LO QUE TE FALTABA
// ===============================
app.UseDefaultFiles();   // index.html por defecto
app.UseStaticFiles();    // habilita wwwroot (HTML, CSS, JS)

app.MapControllers();

app.Run();