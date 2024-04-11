let entradasDisponibles = 100;

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

    // Ciclo while para verificar si todavía hay entradas disponibles
    while (entradasDisponibles > 0) {
        document.getElementById("stockMessage").style.display = "block"; // Muestra el mensaje de stock
        break; // Se sale del ciclo para evitar un bucle infinito
    }
}