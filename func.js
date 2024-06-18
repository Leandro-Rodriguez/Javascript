let entradasDisponibles = 20; // Entradas totales para compra por usuario
let totalGastado = 0; // Variable global para rastrear el total gastado
let historialTransacciones = [];

// Clase para representar cada show //
class Show {
    constructor(nombre, precio, entradasDisponibles) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.entradasDisponibles = entradasDisponibles;
    }
    DescuentoDelDia() {
        this.precio *= 0.9;
    }
}

const ListaDeShowsDisponibles = [
    new Show("Bon Jovi", "20000", "2500"),
    new Show("Babasonicos", "8000", "2500"),
    new Show("Bruno Mars", "15000", "2500"),
    new Show("Rolling Stones", "40000", "5000"),
    new Show("Michael Jackson", "50000", "5000"),
    new Show("Michael Bolton", "10000", "1000"),
    new Show("Michael Scott", "1000", "30"),
    new Show("Bandana", "2500", "500"),
    new Show("Red Hot Chilli Peppers", "30000", "5000"),
    new Show("Lean Rodriguez", "1000", "100")
];

// Función para buscar y filtrar shows // 
const buscarShow = () => {
    let input = document.getElementById("buscarShow");
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("showList");
    let li = ul.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];
        let txtValue = a.textContent || a.innerText;
        li[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
}

const seleccionarShow = show => {
    document.getElementById('showSelector').value = show;
    mostrarPrecioShow();
}

const mostrarPrecioShow = () => {
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

// llamar a la función para establecer el precio inicial //
document.addEventListener('DOMContentLoaded', mostrarPrecioShow);

const venderEntradas = () => {
    let cantidad = parseInt(document.getElementById("cantidadEntradas").value);
    let showSeleccionado = document.getElementById("showSelector").value;

    if (isNaN(cantidad) || cantidad <= 0 || cantidad % 1 !== 0) {
        console.log("Ingresá un número entero y positivo válido para la cantidad de entradas man.");
        mostrarMensajeTemporal("Ingresá un número entero y positivo válido para la cantidad de entradas man.");
        return;
    }

    let showEncontrado = ListaDeShowsDisponibles.find(show => show.nombre === showSeleccionado.toUpperCase());

    if (!showEncontrado) {
        console.log("Show no encontrado.");
        mostrarMensajeTemporal("Show no encontrado.");
        return;
    }

    let precioTotal = showEncontrado.precio * cantidad;

    if (cantidad <= entradasDisponibles) {
        entradasDisponibles -= cantidad;
        document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
        console.log(`Compraste ${cantidad} entraduki/s. Quedan ${entradasDisponibles} entradas disponibles.`);
        mostrarMensajeTemporal(`Compraste ${cantidad} entraduki/s para ${showSeleccionado} por $${precioTotal}. Quedan ${entradasDisponibles} entradas disponibles.`);
        totalGastado += precioTotal;

        historialTransacciones.push({
            show: showSeleccionado,
            cantidad: cantidad,
            precio: showEncontrado.precio,
            fecha: new Date().toLocaleString()
        });

        localStorage.setItem('historialTransacciones', JSON.stringify(historialTransacciones));
        localStorage.setItem('totalGastado', totalGastado.toFixed(2));

        mostrarHistorialTransacciones();
    } else {
        console.log(`Lo siento, no hay suficientes entradas disponibles. Quedan ${entradasDisponibles} entradas disponibles.`);
        mostrarMensajeTemporal(`Lo siento, no hay suficientes entradas disponibles. Quedan ${entradasDisponibles} entradas disponibles.`);
    }
    verificarStock();
}

const verificarStock = () => {
    let stockMessage = document.getElementById("stockMessage");
    if (entradasDisponibles <= 0) {
        stockMessage.textContent = "¡Entradas agotadas!";
        stockMessage.classList.add("nohaystock");
        stockMessage.style.display = "block";
        document.getElementById("cantidadEntradas").disabled = true;
        document.querySelector(".buy-section button").disabled = true;
    } else {
        stockMessage.style.display = "block";
        stockMessage.textContent = "¡Queda Stock!";
        stockMessage.classList.add("haystock");
    }
}

const mostrarHistorialTransacciones = () => {
    let historialHTML = "<h2>Historial de Transacciones</h2><ul>";
    historialTransacciones.forEach(transaccion => {
        historialHTML += `<li>Compraste ${transaccion.cantidad} entrada/s para ${transaccion.show} a $${transaccion.precio} cada una - ${transaccion.fecha}</li>`;
    });
    historialHTML += "</ul>";

    document.getElementById("historialTransacciones").innerHTML = historialHTML;
    let sumaHTML = `<p>Total gastado: $${totalGastado.toFixed(2)}</p>`;
    document.getElementById("SumaDeTransacciones").innerHTML = sumaHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarPrecioShow();

    // Recuperar historial de transacciones desde localStorage //
    const historialGuardado = localStorage.getItem('historialTransacciones');
    const totalGastadoGuardado = localStorage.getItem('totalGastado');

    if (historialGuardado) {
        historialTransacciones = JSON.parse(historialGuardado);
        totalGastado = parseFloat(totalGastadoGuardado);
        mostrarHistorialTransacciones();

        // Calcular el total de entradas compradas //
        let totalEntradasCompradas = 0;
        historialTransacciones.forEach(transaccion => {
            totalEntradasCompradas += transaccion.cantidad;
        });

        // Restar el total de entradas compradas del total inicial de entradas disponibles //
        entradasDisponibles -= totalEntradasCompradas;

        // Mostrar la cantidad actualizada de entradas disponibles en la página //
        document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
    }
});

const mostrarMensajeTemporal = (mensaje, duracion = 3000) => {
    const mensajeTemporal = document.getElementById('mensajeTemporal');
    mensajeTemporal.textContent = mensaje;
    mensajeTemporal.style.display = 'block';

    setTimeout(() => {
        mensajeTemporal.style.display = 'none';
    }, duracion);
}

const limpiarHistorial = () => {
    historialTransacciones = [];
    totalGastado = 0;

    // Limpiar el historial en el localStorage //
    localStorage.removeItem('historialTransacciones');
    localStorage.removeItem('totalGastado');

    // Actualizar la visualización del historial en la página //
    mostrarHistorialTransacciones();

    // Reiniciar la cantidad de entradas disponibles //
    entradasDisponibles = 20; // "O" valor inicial deseado //
    document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
}

// Función para exportar el historial de transacciones a un archivo Excel //
const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(historialTransacciones);
    XLSX.utils.book_append_sheet(wb, ws, "Historial de Transacciones");
    XLSX.writeFile(wb, "HistorialTransacciones.xlsx");
}

// Agregar el botón de exportar a Excel en el HTML //
document.addEventListener('DOMContentLoaded', () => {
    exportButton.textContent = 'Exportar a Excel';
    exportButton.onclick = exportarExcel;
    document.body.appendChild(exportButton);
});


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