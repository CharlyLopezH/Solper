using SolperAPI.DTOs;
using SolperAPI.Entidades;
namespace SolperAPI.Repositorios
{
    public interface IRepositorioAdscripciones
    {
        Task<int> Crear(Adscripcion adscripcion);
        Task<List<Adscripcion>> ObtenerTodas(PaginacionDTO paginacionDTO);
        Task<int> Actualizar(Adscripcion adscripcion);
        Task Borrar(int id);
        Task<bool> Existe(int id);
        Task<Adscripcion?> ObtenerPorId(int id);
        Task<List<Adscripcion>> ObtenerPorNombre(string nombre);
    }
}
