let entradasDisponibles = 20; // Entradas totales para compra por usuario//
let totalGastado = 0; // Variable global para rastrear el total gastado
let historialTransacciones = [];
let nombre = prompt("Por favor, ingresa tu nombre:");
let parrafo = document.createElement("p");
parrafo.className = "nombre-parrafo";
parrafo.textContent = "Bienvenido " + nombre + "!";
document.body.appendChild(parrafo);

// Array de objetos precios de cada show
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
ListaDeShowsDisponibles.push (new Show("Lean Rodriguez", "1000", "100"));

// Función para buscar y filtrar shows - A PRUEBA
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

function seleccionarShow(show) {
    document.getElementById('showSelector').value = show;
    mostrarPrecioShow();
}

function mostrarPrecioShow() {
    let showSeleccionado = document.getElementById("showSelector").value;
    let showEncontrado = ListaDeShowsDisponibles.find(show => show.nombre === showSeleccionado.toUpperCase());
    let precioTexto = document.querySelector(".precio-texto");
    let precioValor = document.querySelector(".precio-valor");
    if (showEncontrado) {
        precioTexto.textContent = "Precio: ";
        precioValor.textContent = `$${showEncontrado.precio}`;
    } else {
        precioTexto.textContent = "Precio: ";
        precioValor.textContent = "-";
    }
}

// Asegúrate de llamar a la función una vez para establecer el precio inicial
document.addEventListener('DOMContentLoaded', (event) => {
    mostrarPrecioShow();
});

function venderEntradas() {
    let cantidad = parseInt(document.getElementById("cantidadEntradas").value);
    let showSeleccionado = document.getElementById("showSelector").value;

    while (isNaN(cantidad) || cantidad <= 0 || cantidad % 1 !== 0) {
        console.log("Ingresá un número entero y positivo válido para la cantidad de entradas man.");
        alert("Ingresá un número entero y positivo válido para la cantidad de entradas man.");
        return;
    }

    // Encuentra el show seleccionado y su precio
    let showEncontrado = ListaDeShowsDisponibles.find(show => show.nombre === showSeleccionado.toUpperCase());

    if (!showEncontrado) {
        console.log("Show no encontrado.");
        alert("Show no encontrado.");
        return;
    }

    let precioTotal = showEncontrado.precio * cantidad;

    if (cantidad <= entradasDisponibles) {
        entradasDisponibles -= cantidad;
        document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
        console.log(`Compraste ${cantidad} entraduki/s. Quedan ${entradasDisponibles} entradas disponibles.`);
        alert(`Compraste ${cantidad} entraduki/s para ${showSeleccionado} por $${precioTotal}. Quedan ${entradasDisponibles} entradas disponibles.`);

        // Actualiza el total gastado
        totalGastado += precioTotal;

        historialTransacciones.push({
            show: showSeleccionado, // Agrega el nombre del show seleccionado
            cantidad: cantidad,
            precio: showEncontrado.precio,
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
        historialHTML += `<li>Compraste ${transaccion.cantidad} entrada/s para ${transaccion.show} a $${transaccion.precio} cada una - ${transaccion.fecha}</li>`;
    });
    historialHTML += "</ul>";
    historialHTML += `<p>Total gastado: $${totalGastado.toFixed(2)}</p>`; // Muestra el total gastado
    document.getElementById("historialTransacciones").innerHTML = historialHTML;
}


/*


// Define la fecha límite (en este caso, 17 de mayo de 2024).
const deadline = new Date("2024-05-17").getTime();

// Precio base del objeto y aumento por intervalo.
let precioBase = 1000; // Precio base del objeto
const aumentoPorIntervalo = 250; // Aumento de precio por intervalo

// Función para calcular el tiempo restante y actualizar el precio.
function actualizarPrecio() {
    // Obtiene la fecha y hora actual.
    const now = new Date().getTime();
  
    // Calcula la diferencia de tiempo entre la fecha límite y la fecha actual.
    const tiempoRestante = deadline - now;
  
    // Calcula la cantidad de segundos restantes.
    const segundosRestantes = Math.floor(tiempoRestante / 1000);
  
    // Calcula cuántos intervalos de 5 segundos han pasado.
    const intervalos = Math.floor(segundosRestantes / 5);
  
    // Calcula el precio actual basado en los intervalos pasados.
    const precioActual = precioBase + (intervalos * aumentoPorIntervalo);
  
    // Muestra el precio actual y el tiempo restante en pantalla.
    document.getElementById("precio").innerHTML = `Precio actual: $${precioActual.toFixed(2)} - Tiempo restante: ${segundosRestantes} segundos`;
}

// Actualiza el precio cada 5 segundos.
setInterval(actualizarPrecio, 5000); // 5 segundos en milisegundos */