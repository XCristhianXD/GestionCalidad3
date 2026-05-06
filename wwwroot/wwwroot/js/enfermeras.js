const API = "http://localhost:5016/api/Enfermeras/listar";

async function cargarEnfermeras() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        const tabla = document.getElementById("tablaEnfermeras");
        tabla.innerHTML = "";

        data.forEach(e => {
            tabla.innerHTML += `
                <tr>
                    <td>${e.codigo_Enfermera}</td>
                    <td>${e.nombre}</td>
                    <td>${e.apellido_Paterno}</td>
                    <td>${e.apellido_Materno}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error cargando enfermeras:", error);
    }
}