using System.Text.Json.Serialization;

namespace GestionCalidad.Backend.DTO.Enfermera
{
    public class EnfermeraDTO
    {
        [JsonPropertyName("codigo_Enfermera")]
        public string CodigoEnfermera { get; set; }

        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }

        [JsonPropertyName("apellido_Paterno")]
        public string ApellidoPaterno { get; set; }

        [JsonPropertyName("apellido_Materno")]
        public string ApellidoMaterno { get; set; }
    }
}
