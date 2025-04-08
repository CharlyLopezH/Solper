namespace SolperAPI.DTOs
{
    public class AdscripcionDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Abreviado { get; set; } = null!;
        public required string Titular { get; set; }
    }
}
