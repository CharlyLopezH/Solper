using System.ComponentModel.DataAnnotations;

namespace SolperAPI.Entidades
{
    public class Adscripcion
    {
        [Key]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "El campo 'Nombre' es obligatorio.")]
        [StringLength(80, MinimumLength = 5, ErrorMessage = "El 'Nombre' debe tener entre 5 y 80 caracteres.")]
        public required string Nombre { get; set; } = null!;

        [StringLength(6, MinimumLength = 2, ErrorMessage = "La'Abreviación' debe tener entre 2 y 6 caracteres.")]
        public string? Abreviado { get; set; } = null!;

        [StringLength(60)]
        public string? Titular { get; set; } = null!;

    }
}
