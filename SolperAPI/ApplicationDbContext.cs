using Microsoft.EntityFrameworkCore;
using SolperAPI.Entidades;

namespace SolperAPI
{
        public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
        {
            //Definición o representación de las tablas para la DB            
            public required DbSet<Adscripcion> Adscripciones { get; set; }                      

            //Configuración del Fluent API para cambios y ajustes en propiedades de tablas
        }

}
