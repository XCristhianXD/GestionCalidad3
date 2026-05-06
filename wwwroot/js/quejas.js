const API = "https://gestioncalidad3.onrender.com/api/InformeQuejas";

// =====================
// CARGAR QUEJAS (GET)
// =====================
document.addEventListener("DOMContentLoaded", cargar);

async function cargar() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        const tabla = document.getElementById("tabla");
        tabla.innerHTML = "";

        data.forEach(q => {
            tabla.innerHTML += `
                <tr>
                    <td>${q.codigo}</td>
                    <td>${q.descripcion}</td>
                    <td>${q.fecha}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error cargando quejas:", error);
    }
}

// =====================
// GUARDAR QUEJA (POST con QUERY STRING)
// =====================
async function guardar() {
    const codigo = document.getElementById("codigo").value;
    const descripcion = document.getElementById("descripcion").value;
    const fecha = document.getElementById("fecha").value;

    if (!codigo || !descripcion || !fecha) {
        alert("Completa todos los campos");
        return;
    }

    await fetch(
        `${API}?codigo=${codigo}&descripcion=${descripcion}&fecha=${fecha}`,
        {
            method: "POST"
        }
    );

    // limpiar
    document.getElementById("codigo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fecha").value = "";

    cargar();
}