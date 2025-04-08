//Controladores
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using SolperAPI.DTOs;
using SolperAPI.Entidades;
using SolperAPI.Repositorios;

namespace SolperAPI.Endpoints
{
    public static class AdscripcionesEndpoints
    {
        

        public static RouteGroupBuilder MapAdscripciones(this RouteGroupBuilder group)
        {
            group.MapGet("/Todas", ObtenerTodas).CacheOutput(c => c.Expire(TimeSpan.FromSeconds(30)).Tag("adscripciones-get"));
            group.MapPost("/", Crear);
            group.MapGet("/", Obtener).CacheOutput(c => c.Expire(TimeSpan.FromSeconds(5)).Tag("adscripciones-get"));
            group.MapGet("obtenerPorNombre/{nombre}", ObtenerPorNombre);
            group.MapGet("buscarRegistros/{cadena}", BuscarRegistros);
            group.MapGet("/{id:int}", ObtenerPorId);
            group.MapPut("/{id:int}", Actualizar).DisableAntiforgery();
            group.MapDelete("/{id:int}", Borrar);
            //group.MapGet("getEspecial/{cadena}", BusquedaEspecial);

            return group;
        }

        //private static async Task BusquedaEspecial([AsParameters] AdscripcionesFiltrarDTO filtro, // Usa [AsParameters] para bind automático
        //                          IRepositorioAdscripciones repositorio,    IMapper mapper)
        //{
        //    //var resultados = await repositorio.BusquedaEspecial(filtro.TerminoBusqueda, filtro.Pagina, filtro.RecordsPorPagina);
        //    return Results.Ok(mapper.Map<List<AdscripcionDTO>>(resultados));
        //}

        static async Task<Created<AdscripcionDTO>> Crear(CrearAdscripcionDTO crearAdscripcionDTO, IRepositorioAdscripciones repositorio, 
            IOutputCacheStore outputCacheStore, IMapper mapper)
        {
            var adscripcion = mapper.Map<Adscripcion>(crearAdscripcionDTO);
            var id = await repositorio.Crear(adscripcion);
            await outputCacheStore.EvictByTagAsync("adscripciones-get", default);
            var adscripcionDTO = mapper.Map<AdscripcionDTO>(adscripcion);
            return TypedResults.Created($"/adscripciones/{id}", adscripcionDTO);
        }

        //Regresa lista *Sin Paginar* de adscripciones
        static async Task<Ok<List<AdscripcionDTO>>> ObtenerTodas(IRepositorioAdscripciones repositorio, IMapper mapper)
        {
            var adscripciones = await repositorio.ObtenerTodas();
            var adscripcionesDTO = mapper.Map<List<AdscripcionDTO>>(adscripciones);
            return TypedResults.Ok(adscripcionesDTO);
        }


        //Regresa lista *paginada* de adscripciones
        static async Task<Ok<List<AdscripcionDTO>>> Obtener(IRepositorioAdscripciones repositorio, IMapper mapper,
            int pagina = 1, int recordsPorPagina = 10)
        {
            var paginacion = new PaginacionDTO { Pagina = pagina, RecordsPorPagina = recordsPorPagina };
            var adscripciones = await repositorio.Obtener(paginacion);
            var adscripcionesDTO = mapper.Map<List<AdscripcionDTO>>(adscripciones);            
            return TypedResults.Ok(adscripcionesDTO);
        }

        static async Task<Ok<List<AdscripcionDTO>>> ObtenerPorNombre(string nombre,
              IRepositorioAdscripciones repositorio, IMapper mapper)
        {
            var adscripciones = await repositorio.ObtenerPorNombre(nombre);
            var adscripcionesDTO = mapper.Map<List<AdscripcionDTO>>(adscripciones);
            return TypedResults.Ok(adscripcionesDTO);
        }
        //Busqueda flexible (string en varios campos)
       static async Task<Ok<List<AdscripcionDTO>>> BuscarRegistros(string cadena,
       IRepositorioAdscripciones repositorio, IMapper mapper)
        {
            var adscripciones = await repositorio.BuscarRegistros(cadena);
            var adscripcionesDTO = mapper.Map<List<AdscripcionDTO>>(adscripciones);
            return TypedResults.Ok(adscripcionesDTO);
        }

        static async Task<Results<Ok<AdscripcionDTO>, NotFound>> ObtenerPorId(int id,
                IRepositorioAdscripciones repositorio, IMapper mapper)
        {
            var adscripcion = await repositorio.ObtenerPorId(id);

            if (adscripcion is null)
            {
                return TypedResults.NotFound();
            }

            var adscripcionDTO = mapper.Map<AdscripcionDTO>(adscripcion);
            return TypedResults.Ok(adscripcionDTO);
        }

        static async Task<Results<NoContent, NotFound>> Actualizar(int id, [FromForm] CrearAdscripcionDTO crearAdscripcionDTO, 
            IRepositorioAdscripciones repositorio, IOutputCacheStore outputCacheStore, IMapper mapper)
        {
            var adscripcionDB = await repositorio.ObtenerPorId(id);

            if (adscripcionDB is null)
            {
                return TypedResults.NotFound();
            }

            var adscripcionParaActualizar = mapper.Map<Adscripcion>(crearAdscripcionDTO);
            adscripcionParaActualizar.Id = id;
            await repositorio.Actualizar(adscripcionParaActualizar);
            await outputCacheStore.EvictByTagAsync("adscripciones-get", default);
            return TypedResults.NoContent();
        }

        static async Task<Results<NoContent, NotFound>> Borrar(int id, IRepositorioAdscripciones repositorio,
            IOutputCacheStore outputCacheStore)
        {
            var adscripcionDB = await repositorio.ObtenerPorId(id);

            if (adscripcionDB is null)
            {
                return TypedResults.NotFound();
            }
            await repositorio.Borrar(id);
            await outputCacheStore.EvictByTagAsync("adscripciones-get", default);
            return TypedResults.NoContent();
        }

    }
}
