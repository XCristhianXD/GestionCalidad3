const API = "http://localhost:5016/api/InformeQueja_Departamento";
const API_REPORTE = `${API}/reporte/todos`;

// =====================
// CARGAR REPORTE
// =====================
document.addEventListener("DOMContentLoaded", cargar);

async function cargar() {
    try {
        const res = await fetch(API_REPORTE);

        if (!res.ok) {
            throw new Error("Error cargando reporte");
        }

        const data = await res.json();

        const tabla = document.getElementById("tabla");
        tabla.innerHTML = "";

        data.forEach(x => {
            tabla.innerHTML += `
                <tr>
                    <td>${x.departamento ?? ""}</td>
                    <td>${x.codigo ?? ""}</td>
                    <td>${x.descripcion ?? ""}</td>
                    <td>${x.fecha ?? ""}</td>
                    <td>${x.codigoPaciente ?? ""}</td>
                    <td>${x.enfermera ?? ""}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

// =====================
// GUARDAR RELACIÓN
// =====================
async function guardar() {
    const codigoDepartamento = document.getElementById("codigoDepartamento").value.trim();
    const codigoQueja = document.getElementById("codigoQueja").value.trim();
    const codigoPaciente = document.getElementById("codigoPaciente").value.trim();

    if (!codigoDepartamento || !codigoQueja || !codigoPaciente) {
        alert("Completa todos los campos");
        return;
    }

    const url = `${API}/crear?codigoDepartamento=${codigoDepartamento}&codigoQueja=${codigoQueja}&codigoPaciente=${codigoPaciente}`;

    try {
        const res = await fetch(url, {
            method: "POST"
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data || "Error al crear relación");
            return;
        }

        alert("Relación creada correctamente");

        document.getElementById("codigoDepartamento").value = "";
        document.getElementById("codigoQueja").value = "";
        document.getElementById("codigoPaciente").value = "";

        cargar();

    } catch (error) {
        console.error("Error guardando:", error);
        alert("Error en la petición");
    }
}