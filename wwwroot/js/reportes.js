const API = "https://gestioncalidad3.onrender.com/api/InformeCalidad_Departamento";

// ============================
// PROMEDIO DEL SISTEMA
// ============================
async function cargarPromedioSistema() {
    const res = await fetch(`${API}/reporte/promedio-sistema`);
    const data = await res.json();

    document.getElementById("promedioSistema").innerText =
        "Promedio: " + data.promedioSistema.toFixed(2);
}

// ============================
// PROMEDIO GENERAL
// ============================
async function cargarPromedioGeneral() {
    const res = await fetch(`${API}/reporte/promedio/general`);
    const data = await res.json();

    const tabla = document.getElementById("tablaGeneral");
    tabla.innerHTML = "";

    data.forEach(d => {
        tabla.innerHTML += `
            <tr>
                <td>${d.departamento}</td>
                <td>${d.promedio.toFixed(2)}</td>
                <td>${d.total}</td>
            </tr>
        `;
    });
}

// ============================
// PROMEDIO POR AÑO
// ============================
async function cargarPorAnio() {
    const anio = document.getElementById("anio").value;

    const res = await fetch(`${API}/reporte/promedio/anio/${anio}`);
    const data = await res.json();

    const tabla = document.getElementById("tablaAnio");
    tabla.innerHTML = "";

    data.forEach(d => {
        tabla.innerHTML += `
            <tr>
                <td>${d.departamento}</td>
                <td>${d.promedio.toFixed(2)}</td>
                <td>${d.total}</td>
            </tr>
        `;
    });
}