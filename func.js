let entradasDisponibles = 100; // Entradas totales

// Venta de entradas
function venderEntradas() {
    let cantidad = parseInt(document.getElementById("cantidadEntradas").value);
    if (cantidad <= entradasDisponibles && cantidad > 0) {
        entradasDisponibles -= cantidad;
        document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
        console.log(`Compraste ${cantidad} entraduki/s. Quedan ${entradasDisponibles} entradas disponibles.`);
        alert(`Compraste ${cantidad} entraduki/s. Quedan ${entradasDisponibles} entradas disponibles.`);
    } else {
        if (cantidad <= 0) {
            console.log("La cantidad no puede ser menor o igual a cero bro.");
            alert("La cantidad no puede ser menor o igual a cero bro.");
        } else {
            console.log(`Sorry no tenemos esa cantidad. Quedan ${entradasDisponibles} entradas disponibles.`);
            alert(`Sorry no tenemos esa cantidad. Quedan ${entradasDisponibles} entradas disponibles.`);
        }
    }
    

    // While para verificar si todavía hay entradas disponibles
    while (entradasDisponibles > 0) {
        document.getElementById("stockMessage").style.display = "block"; 
        break; 
    }
}