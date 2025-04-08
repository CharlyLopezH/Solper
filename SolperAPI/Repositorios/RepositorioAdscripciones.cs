using SolperAPI.Entidades;
using Microsoft.EntityFrameworkCore;
using SolperAPI.DTOs;
using System.Diagnostics.Contracts;
using System.Runtime.CompilerServices;
using SolperAPI.Utilidades;

namespace SolperAPI.Repositorios
{

    public class RepositorioAdscripciones : IRepositorioAdscripciones
    {

        //public HttpContext HttpContext { get; } = httpContextAccessor.HttpContext!;
        private readonly ApplicationDbContext context;
        private readonly HttpContext httpContext;

        public RepositorioAdscripciones(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            this.context = context;
            httpContext = httpContextAccessor.HttpContext!;
        }

        public async Task<List<Adscripcion>> ObtenerTodas()
        {

            var queryable = context.Adscripciones.AsQueryable();
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            //Sin paginación
            return await context.Adscripciones.OrderBy(a => a.Id).ToListAsync(); 
        }


        public async Task<int> Crear(Adscripcion adscripcion)
        {
            context.Add(adscripcion);
            await context.SaveChangesAsync();
            return (adscripcion.Id);
        }

        public async Task<List<Adscripcion>> Obtener(PaginacionDTO paginacionDTO )
        {

            var queryable = context.Adscripciones.AsQueryable();
            await httpContext.InsertarParametrosPaginacionEnCabecera(queryable);
            //Sin paginación
            //return await context.Adscripciones.OrderBy(a => a.Nombre).ToListAsync(); 
            //Con paginación
            return await queryable.OrderBy(a => a.Id).Paginar(paginacionDTO).ToListAsync();
        }

        public async Task<List<Adscripcion>> ObtenerPorNombre(string nombre)
        {
            return await context.Adscripciones.Where(a=>a.Nombre.Contains(nombre))
                .OrderBy(a=>a.Nombre)
                .ToListAsync();
        }

        public async Task<List<Adscripcion>> BuscarRegistros(string cadena)
        {
            if (string.IsNullOrWhiteSpace(cadena))
                return new List<Adscripcion>(); // O lanzar una excepción controlada

            return await context.Adscripciones
                .Where(a =>
                    a.Nombre.Contains(cadena) ||
                    (a.Abreviado != null && a.Abreviado.Contains(cadena)) || // Si Abreviado es opcional
                    a.Id.ToString().Contains(cadena) // Búsqueda en ID convertido a string
                                                     // Agrega más campos según necesites
                )
                .OrderBy(a => a.Nombre)
                .AsNoTracking() // Recomendado para solo lectura
                .ToListAsync();
        }

        public async Task<int> Actualizar(Adscripcion adscripcion)
        {
            context.Update(adscripcion);
            await context.SaveChangesAsync();
            return (adscripcion.Id); //Experimental
        }

        public async Task Borrar(int id)
        {
            await context.Adscripciones.Where(a => a.Id == id).ExecuteDeleteAsync();
        }


        public async Task<bool> Existe(int id)
        {
            return await context.Adscripciones.AnyAsync(a => a.Id == id);
        }

        public async Task<Adscripcion?> ObtenerPorId(int id)
        {
            return await context.Adscripciones.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
        }

        public Task<List<Adscripcion>> BusquedaEspecial(string cadena)
        {
            throw new NotImplementedException();
        }
    }
}