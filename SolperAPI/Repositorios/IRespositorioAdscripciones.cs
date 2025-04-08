using SolperAPI.DTOs;
using SolperAPI.Entidades;
namespace SolperAPI.Repositorios
{
    public interface IRepositorioAdscripciones
    {
        Task<List<Adscripcion>> ObtenerTodas();
        Task<int> Crear(Adscripcion adscripcion);
        Task<List<Adscripcion>> Obtener(PaginacionDTO paginacionDTO);
        Task<int> Actualizar(Adscripcion adscripcion);
        Task Borrar(int id);
        Task<bool> Existe(int id);
        Task<Adscripcion?> ObtenerPorId(int id);
        Task<List<Adscripcion>> ObtenerPorNombre(string nombre);
        Task<List<Adscripcion>> BuscarRegistros(string cadena);

        Task<List<Adscripcion>> BusquedaEspecial(string cadena);
        
    }
}
