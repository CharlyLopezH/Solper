using SolperAPI.DTOs;
using SolperAPI.Entidades;
using AutoMapper;

namespace SolperAPI.Utilidades
{
    public class AutomapperProfiles:Profile
    {
        public AutomapperProfiles()
        {

            CreateMap<CrearAdscripcionDTO, Adscripcion>();
            CreateMap<Adscripcion, AdscripcionDTO>();
        }

    }
}
