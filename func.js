let entradasDisponibles = 100; // Entradas totales

// Venta de entradas
function venderEntradas() {
    let cantidad = parseInt(document.getElementById("cantidadEntradas").value);
    if (cantidad <= entradasDisponibles && cantidad > 0) {
        entradasDisponibles -= cantidad;
        document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
        console.log(`Se vendieron ${cantidad} entradas. Quedan ${entradasDisponibles} entradas disponibles.`);
    } else {
        if (cantidad < 0) {
            console.log("La cantidad no puede ser menor a cero.");
            alert("La cantidad no puede ser menor a cero.");
        } else {
            console.log("Sorry no hay esa cantidad de entradas disponibles.");
            alert("Sorry no hay esa cantidad de entradas disponibles.");
        }
    }

    // While para verificar si todavía hay entradas disponibles
    while (entradasDisponibles > 0) {
        document.getElementById("stockMessage").style.display = "block"; 
        break; 
    }
}