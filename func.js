let entradasDisponibles = 100;
function venderEntradas() {
    let cantidad = parseInt(document.getElementById("cantidadEntradas").value);
    if (cantidad <= entradasDisponibles && cantidad > 0) {
        entradasDisponibles -= cantidad;
        document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
        console.log(`Se vendieron ${cantidad} entradas. Quedan ${entradasDisponibles} entradas disponibles.`);
    } else {
        if (cantidad < 0) {
            console.log("Lo siento, la cantidad no puede ser menor a cero.");
            alert("Lo siento, la cantidad no puede ser menor a cero.");
        } else {
            console.log("Lo siento, no hay suficientes entradas disponibles.");
            alert("Lo siento, no hay suficientes entradas disponibles.");
        }
    }
}