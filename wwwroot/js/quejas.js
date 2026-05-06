const API = "http://localhost:5016/api/InformeQuejas";

// =====================
// CARGAR QUEJAS
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
                    <td>${q.paciente ?? "Sin asignar"}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error cargando quejas:", error);
    }
}

// =====================
// GUARDAR QUEJA
// =====================
async function guardar() {
    const codigo = document.getElementById("codigo").value;
    const descripcion = document.getElementById("descripcion").value;
    const fecha = document.getElementById("fecha").value;

    if (!codigo || !descripcion || !fecha) {
        alert("Completa todos los campos");
        return;
    }

    await fetch(`${API}?descripcion=${descripcion}&fecha=${fecha}&codigo=${codigo}`, {
        method: "POST"
    });

    document.getElementById("codigo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fecha").value = "";

    cargar();
}