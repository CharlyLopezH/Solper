using SolperAPI;
using Microsoft.EntityFrameworkCore;
using SolperAPI.Endpoints;
using SolperAPI.Repositorios;

//es importante conservar el orden

var builder = WebApplication.CreateBuilder(args);
var origenesPermitidos = builder.Configuration.GetValue<string>("origenesPermitidos")!;
var ambiente = builder.Configuration.GetValue<string>("ambiente");

//Servicios
builder.Services.AddDbContext<ApplicationDbContext>(opciones =>
opciones.UseSqlServer("name=DefaultConnection"));

//Servicios
builder.Services.AddCors(opciones =>
{
    opciones.AddDefaultPolicy(configuracion =>
    {
        configuracion.WithOrigins(origenesPermitidos).AllowAnyHeader().AllowAnyMethod();
    });
    //Acceso total a orígenes externos
    opciones.AddPolicy("libre", configuracion =>
    {
        //configuracion.AllowAnyMethod().AllowAnyHeader().AllowAnyMethod();
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
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (builder.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseOutputCache();
app.UseCors();

//Mapeo Endpoints
app.MapGet("/", () => "Hello World! "+ambiente+ " origenesPermitidos:"+origenesPermitidos);
app.MapGroup("/adscripciones").MapAdscripciones();
app.Run();
