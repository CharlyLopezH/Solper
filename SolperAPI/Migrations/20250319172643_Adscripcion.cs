using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolperAPI.Migrations
{
    /// <inheritdoc />
    public partial class Adscripcion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Adscripciones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Abreviado = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    Titular = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adscripciones", x => x.Id);
                });
            migrationBuilder.CreateIndex(
            name: "IX_Adscripciones_Nombre",
            table: "Adscripciones",
            column: "Nombre",
            unique: true); // Índice único
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Adscripciones");
        }
    }
}
