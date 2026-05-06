using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GestionCalidad.Backend.DTO.Enfermera;
using System.Net.Http.Json;

namespace GestionCalidad.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnfermerasController : ControllerBase
    {
        private readonly HttpClient httpClient;
        private readonly string URL = "https://gestionenfermeria-be-production.up.railway.app/";

        public EnfermerasController(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        [HttpGet("listar")]
        public async Task<IActionResult> GetEnfermeras()
        {
            var enfermeras = await httpClient.GetFromJsonAsync<List<EnfermeraDTO>>(
                $"{URL}api/Enfermeras"
            );

            return Ok(enfermeras);
        }
    }
}