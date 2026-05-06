const API = "http://localhost:5016/api/Departamentos";

// =======================
// CARGAR DATOS (GET)
// =======================
document.addEventListener("DOMContentLoaded", cargar);

async function cargar() {
    const res = await fetch(API);
    const data = await res.json();

    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    data.forEach(dep => {
        tabla.innerHTML += `
            <tr>
                <td>${dep.codigo}</td>
                <td>${dep.nombre}</td>
            </tr>
        `;
    });
}

// =======================
// GUARDAR (POST)
// =======================
async function guardar() {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;

    if (!codigo || !nombre) {
        alert("Completa todos los campos");
        return;
    }

    await fetch(`${API}?nombre=${nombre}&codigo=${codigo}`, {
        method: "POST"
    });

    // limpiar inputs
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";

    cargar(); // recargar tabla
}