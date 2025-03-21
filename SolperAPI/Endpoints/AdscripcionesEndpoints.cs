
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
            group.MapPost("/", Crear);
            group.MapGet("/", ObtenerTodas).CacheOutput(c => c.Expire(TimeSpan.FromSeconds(30)).Tag("adscripciones-get"));
            group.MapGet("obtenerPorNombre/{nombre}", ObtenerPorNombre);
            group.MapGet("/{id:int}", ObtenerPorId);
            group.MapPut("/puestos/{id:int}", Actualizar).DisableAntiforgery();
            group.MapDelete("/{id:int}", Borrar);
            return group;
        }


        static async Task<Created<AdscripcionDTO>> Crear(CrearAdscripcionDTO crearAdscripcionDTO, IRepositorioAdscripciones repositorio, 
            IOutputCacheStore outputCacheStore, IMapper mapper)
        {
            var adscripcion = mapper.Map<Adscripcion>(crearAdscripcionDTO);
            var id = await repositorio.Crear(adscripcion);
            await outputCacheStore.EvictByTagAsync("adscripciones-get", default);
            var adscripcionDTO = mapper.Map<AdscripcionDTO>(adscripcion);
            return TypedResults.Created($"/adscripciones/{id}", adscripcionDTO);
        }

        static async Task<Ok<List<AdscripcionDTO>>> ObtenerTodas(IRepositorioAdscripciones repositorio, IMapper mapper,
            int pagina = 1, int recordsPorPagina = 5)
        {
            var paginacion = new PaginacionDTO { Pagina = pagina, RecordsPorPagina = recordsPorPagina };
            var adscripciones = await repositorio.ObtenerTodas(paginacion);
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
