const API = "http://localhost:5016/api/InformeCalidad_Departamento";
const API_REPORTE = `${API}/reporte/todos`;

// =====================
// CARGAR REPORTE
// =====================
document.addEventListener("DOMContentLoaded", cargar);

async function cargar() {
    try {
        const res = await fetch(API_REPORTE);
        const data = await res.json();

        const tabla = document.getElementById("tabla");
        tabla.innerHTML = "";

        data.forEach(x => {
            tabla.innerHTML += `
                <tr>
                    <td>${x.departamento ?? ""}</td>
                    <td>${x.codigo ?? ""}</td>
                    <td>${x.calificacion ?? ""}</td>
                    <td>${x.descripcion ?? ""}</td>
                    <td>${x.fecha ?? ""}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

// =====================
// GUARDAR RELACIÓN
// =====================
async function guardar() {
    const codigoDepartamento = document.getElementById("codigoDepartamento").value.trim();
    const codigoInforme = document.getElementById("codigoInforme").value.trim();
    const codigoAtencion = document.getElementById("codigoAtencion").value.trim();

    if (!codigoDepartamento || !codigoInforme || !codigoAtencion) {
        alert("Completa todos los campos");
        return;
    }

    try {
        const res = await fetch(
            `${API}/crear?codigoDepartamento=${codigoDepartamento}&codigoInforme=${codigoInforme}&codigoAtencion=${codigoAtencion}`,
            {
                method: "POST"
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data || "Error al crear relación");
            return;
        }

        alert("Relación creada correctamente");

        document.getElementById("codigoDepartamento").value = "";
        document.getElementById("codigoInforme").value = "";
        document.getElementById("codigoAtencion").value = "";

        cargar();

    } catch (error) {
        console.error("Error:", error);
        alert("Error en la petición");
    }
}