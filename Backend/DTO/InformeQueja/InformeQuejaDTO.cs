namespace GestionCalidad.Backend.DTO.InformeQueja
{
    public class InformeQuejaDTO
    {
        public string Descripcion { get; set; }
        public DateOnly Fecha { get; set; }
        public string Codigo { get; set; }
        public string Paciente { get; set; }
    }
}
