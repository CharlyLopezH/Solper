using SolperAPI.Utilidades;

namespace SolperAPI.DTOs
{
    public class AdscripcionesFiltrarDTO
    {
        public string? TerminoBusqueda { get; set; }  // Búsqueda flexible (nombre, abreviado, ID)
        public int Pagina { get; set; } = 1;         // Paginación simple
        public int RecordsPorPagina { get; set; } = 10;

        // Método para extraer parámetros del HttpContext (opcional, si usas Minimal APIs)
        public static ValueTask<AdscripcionesFiltrarDTO?> BindAsync(HttpContext context)
        {
            var terminoBusqueda = context.Request.Query.TryGetValue("terminoBusqueda", out var termino)
                ? termino.ToString()
                : null;

            int.TryParse(context.Request.Query["pagina"], out int pagina);
            int.TryParse(context.Request.Query["recordsPorPagina"], out int recordsPorPagina);

            var resultado = new AdscripcionesFiltrarDTO
            {
                TerminoBusqueda = terminoBusqueda,
                Pagina = pagina > 0 ? pagina : 1,
                RecordsPorPagina = recordsPorPagina > 0 ? recordsPorPagina : 10
            };

            return ValueTask.FromResult<AdscripcionesFiltrarDTO?>(resultado);
        }
    }
}
