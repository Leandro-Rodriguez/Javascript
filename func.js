let entradasDisponibles = 20; // Entradas totales para compra POR usuario
let totalGastado = 0; 
let historialTransacciones = [];

class Show {
    constructor(nombre, precio, entradasDisponibles) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.entradasDisponibles = entradasDisponibles;
    }}

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

    // Historial de transacciones desde localStorage //
    const historialGuardado = localStorage.getItem('historialTransacciones');
    const totalGastadoGuardado = localStorage.getItem('totalGastado');

    if (historialGuardado) {
        historialTransacciones = JSON.parse(historialGuardado);
        totalGastado = parseFloat(totalGastadoGuardado);
        mostrarHistorialTransacciones();

        // Calcula el total de entradas compradas //
        let totalEntradasCompradas = 0;
        historialTransacciones.forEach(transaccion => {
            totalEntradasCompradas += transaccion.cantidad;
        });
        entradasDisponibles -= totalEntradasCompradas;
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

    // Limpiar el historial en el localStorage //
const limpiarHistorial = () => {
    historialTransacciones = [];
    totalGastado = 0;
    localStorage.removeItem('historialTransacciones');
    localStorage.removeItem('totalGastado');
    mostrarHistorialTransacciones();
    entradasDisponibles = 20;
    document.getElementById("entradasDisponibles").textContent = entradasDisponibles;
}

// Función de libreria para exportar el historial de  transacciones a Excel //
const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(historialTransacciones);
    XLSX.utils.book_append_sheet(wb, ws, "Historial de Transacciones");
    XLSX.writeFile(wb, "HistorialTransacciones.xlsx");
}

// Agrego botón de exportar a Excel en el HTML //
document.addEventListener('DOMContentLoaded', () => {
    exportButton.textContent = 'Exportar a Excel';
    exportButton.onclick = exportarExcel;
    document.body.appendChild(exportButton);
});