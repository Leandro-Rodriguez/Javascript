let entradasDisponibles = 100; // Enitradas totales
let historialTransacciones = [];

function venderEntradas() {
    let cantidad = parseInt(document.getElementById("cantidadEntradas").value);
    

    while (isNaN(cantidad) || cantidad <= 0 || cantidad % 1 !== 0) {
        console.log("Ingresá un número entero y positivo válido para la cantidad de entradas man.");
        alert("Ingresá un número entero y positivo válido para la cantidad de entradas man.");
        return;
    }
    if (cantidad <= entradasDisponibles) {
        entradasDisponibles -= cantidad;
        document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
        console.log(`Compraste ${cantidad} entraduki/s. Quedan ${entradasDisponibles} entradas disponibles.`);
        alert(`Compraste ${cantidad} entraduki/s. Quedan ${entradasDisponibles} entradas disponibles.`);
        historialTransacciones.push({
            cantidad: cantidad,
            fecha: new Date().toLocaleString()
        });
        mostrarHistorialTransacciones();
    } else {
        console.log(`Lo siento, no hay suficientes entradas disponibles. Quedan ${entradasDisponibles} entradas disponibles.`);
        alert(`Lo siento, no hay suficientes entradas disponibles. Quedan ${entradasDisponibles} entradas disponibles.`);
    }
    verificarStock();
}

function verificarStock() {
    if (entradasDisponibles <= 0) {
        document.getElementById("stockMessage").textContent = "¡Entradas agotadas!";
        document.getElementById("stockMessage").classList.add("nohaystock"); 
        document.getElementById("stockMessage").style.display = "block";
        document.getElementById("cantidadEntradas").disabled = true;
        document.querySelector(".buy-section button").disabled = true;
    }
    else if (entradasDisponibles > 0) {
        document.getElementById("stockMessage").style.display = "block";
        document.getElementById("stockMessage").textContent = "¡Queda Stock!";
        document.getElementById("stockMessage").classList.add("haystock"); 
}}

function mostrarHistorialTransacciones() {
    let historialHTML = "<h2>Historial de Transacciones</h2><ul>";
    historialTransacciones.forEach(transaccion => {
        historialHTML += `<li>Compraste ${transaccion.cantidad} entrada/s - ${transaccion.fecha}</li>`;
    });
    historialHTML += "</ul>";
    document.getElementById("historialTransacciones").innerHTML = historialHTML;
}
