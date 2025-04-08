using SolperAPI;
using Microsoft.EntityFrameworkCore;
using SolperAPI.Endpoints;
using SolperAPI.Repositorios;
using Microsoft.Extensions.Configuration;

//es importante conservar el orden

var builder = WebApplication.CreateBuilder(args);
var ambiente          = builder.Configuration.GetValue<string>("ambiente");
var frontend_url = builder.Configuration.GetValue<string>("frontend_url") ?? "http://localhost:5173"; 


//Servicios
builder.Services.AddDbContext<ApplicationDbContext>(opciones =>
opciones.UseSqlServer("name=DefaultConnection"));

//Servicios
builder.Services.AddCors(opciones =>
{
    opciones.AddPolicy("CorsPolicy", policy =>
    {
        var frontendURL = builder.Configuration.GetValue<string>("frontend_url");
        policy.WithOrigins(frontend_url)
          .AllowAnyHeader()
          .AllowAnyMethod()
          .WithExposedHeaders(new string[] {"cantidadtotalregistros"})
          .AllowCredentials(); // Si usas cookies/auth

        // Para desarrollo, puedes permitir varios orígenes:
        if (builder.Environment.IsDevelopment())
        {
            policy.WithOrigins(
                frontend_url,
                "http://localhost:5173",
                "https://localhost:5173",
                "http://127.0.0.1:5173"
            );
        }
    });
});


builder.Services.AddOutputCache();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Automaper
builder.Services.AddAutoMapper(typeof(Program));
//Repositorios
builder.Services.AddScoped<IRepositorioAdscripciones, RepositorioAdscripciones>();
builder.Services.AddHttpContextAccessor();


var app = builder.Build();
app.UseHttpsRedirection();
app.UseRouting();





var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (builder.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseOutputCache();
//Mapeo Endpoints
app.MapGet("/", () => "Hello World! "+ambiente+ " frontendURL "+ frontend_url);
app.MapGet("/test-cors", () => "CORS funciona!").RequireCors("CorsPolicy"); // Aplica explícitamente la política
app.MapGroup("/adscripciones").MapAdscripciones();//.RequireCors("CorsPolicy");

app.Run();
