let entradasDisponibles = 100; // Enitradas totales
let historialTransacciones = [];

function venderEntradas() {
    let cantidad = parseInt(document.getElementById("cantidadEntradas").value);
    let showSeleccionado = document.getElementById("showSelector").value;    

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


// EXTRA

// Array de objetos con precios para cada show
class Show {
    constructor (nombre, precio, entradasDisponibles) {
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.entradasDisponibles  = entradasDisponibles;}
    DescuentoDelDia(){
        this.precio = this.precio * 0,9;
    }
}

const ListaDeShowsDisponibles = [];
ListaDeShowsDisponibles.push (new Show("Bon Jovi", "20000", "2500"));
ListaDeShowsDisponibles.push (new Show("Babasonicos", "8000", "2500"));
ListaDeShowsDisponibles.push (new Show("Bruno Mars", "15000", "2500"));
ListaDeShowsDisponibles.push (new Show("Rolling Stones", "40000", "5000"));
ListaDeShowsDisponibles.push (new Show("Michael Jackson", "50000", "5000"));
ListaDeShowsDisponibles.push (new Show("Michael Bolton", "10000", "1000"));
ListaDeShowsDisponibles.push (new Show("Michael Scott", "1000", "30"));
ListaDeShowsDisponibles.push (new Show("Bandana", "2500", "500"));
ListaDeShowsDisponibles.push (new Show("Red Hot Chilli Peppers", "30000", "5000"));

// Función para buscar y filtrar shows // A PRUEBA
function buscarShow() {
    let input = document.getElementById("buscarShow");
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("showList");
    let li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];
        let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

/*

    // Buscar el precio del show seleccionado
    let precioEntrada = shows.find(show => show.nombre === showSeleccionado).precio;

    if (cantidad * precioEntrada <= entradasDisponibles) {
        entradasDisponibles -= cantidad * precioEntrada;
        document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
        console.log(`Compraste ${cantidad} entrada/s para ${showSeleccionado}. Quedan ${entradasDisponibles} entradas disponibles.`);
        alert(`Compraste ${cantidad} entrada/s para ${showSeleccionado}. Quedan ${entradasDisponibles} entradas disponibles.`);
        historialTransacciones.push({
            cantidad: cantidad,
            show: showSeleccionado,
            precio: precioEntrada,
            total: cantidad * precioEntrada,
            fecha: new Date().toLocaleString()
        });
        mostrarHistorialTransacciones();
    } else {
        console.log(`Lo siento, no hay suficientes entradas disponibles para ${showSeleccionado}. Quedan ${entradasDisponibles} entradas disponibles.`);
        alert(`Lo siento, no hay suficientes entradas disponibles para ${showSeleccionado}. Quedan ${entradasDisponibles} entradas disponibles.`);
    }
    verificarStock();
}

// Función para buscar y filtrar shows
function buscarShow() {
    let input = document.getElementById("buscarShow");
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("showList");
    let li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];
        let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
*/
