const API = "http://localhost:5016/api/InformeCalidads";

// =====================
// CARGAR INFORMES (GET)
// =====================
document.addEventListener("DOMContentLoaded", cargar);

async function cargar() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        const tabla = document.getElementById("tabla");
        tabla.innerHTML = "";

        data.forEach(i => {
            tabla.innerHTML += `
                <tr>
                    <td>${i.codigo}</td>
                    <td>${i.calificacion}</td>
                    <td>${i.descripcion}</td>
                    <td>${i.fecha}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error cargando informes:", error);
    }
}

// =====================
// GUARDAR INFORME (POST)
// =====================
async function guardar() {
    const codigo = document.getElementById("codigo").value;
    const calificacion = document.getElementById("calificacion").value;
    const descripcion = document.getElementById("descripcion").value;
    const fecha = document.getElementById("fecha").value;

    if (!codigo || !calificacion || !descripcion || !fecha) {
        alert("Completa todos los campos");
        return;
    }

    await fetch(`${API}?calificacion=${calificacion}&descripcion=${descripcion}&fecha=${fecha}&codigo=${codigo}`, {
        method: "POST"
    });

    // limpiar
    document.getElementById("codigo").value = "";
    document.getElementById("calificacion").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fecha").value = "";

    cargar();
}