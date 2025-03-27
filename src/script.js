import QRCode from "qrcode";

document.addEventListener("DOMContentLoaded", function () {
    const botonText = document.getElementById("texto");
    const botonEmail = document.getElementById("email");
    const botonLink = document.getElementById("link");
    const entrada = document.getElementById("entrada");
    const botonGenerar = document.getElementById("botonGenerar");
    const contenedorQR = document.getElementById("qr");
    const botonDescargar = document.getElementById("botonDescargar");
    const botonColor = document.getElementById("botonColor");

    const tiposQR = {
        texto: { placeholder: "Ingrese el texto aquí ejemplo: Grupo 5 - Nomada Digital", type: "text" },
        email: { placeholder: "Ingrese el mail aquí ejemplo: usuario@ejemplo.com", type: "email" },
        link: { placeholder: "Ingrese la url aquí ejemplo: https://www.ejemplo.com", type: "url" }
    };

    let tipoQR = "texto";
    let qrColor = "#000000";
    let contenidoQRActual = "";

    // Inicialización
    entrada.placeholder = tiposQR[tipoQR].placeholder;
    entrada.type = tiposQR[tipoQR].type;
    botonText.classList.add("bg-sky-500");
    botonColor.querySelector("i").style.color = qrColor;

    // Función para generar QR
    function generarQR(contenido) {
        QRCode.toDataURL(contenido, { 
            width: 230, 
            margin: 2,
            color: { dark: qrColor, light: "#ffffff" }
        }, (err, url) => {
            if (err) return console.error("Error generando el QR:", err);
            contenedorQR.innerHTML = `<img src="${url}" class="w-60 h-60 rounded-md">`;
            qrActual = url;
        });
    }

    // Event Listeners 
    Object.entries(tiposQR).forEach(([tipo, config]) => {
        document.getElementById(tipo).addEventListener("click", () => {
            tipoQR = tipo;
            entrada.placeholder = config.placeholder;
            entrada.type = config.type;
            document.querySelectorAll(".generador__boton").forEach(b => b.classList.remove("bg-sky-500"));
            document.getElementById(tipo).classList.add("bg-sky-500");
        });
    });

    botonColor.addEventListener("click", () => {
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = qrColor;
        colorInput.addEventListener("change", function() {
            qrColor = this.value;
            botonColor.querySelector("i").style.color = qrColor;
            if (contenidoQRActual) generarQR(contenidoQRActual);
        });
        colorInput.click();
    });

    botonGenerar.addEventListener("click", () => {
        const valor = entrada.value.trim();
        if (!valor) return alert("Por favor, ingrese un valor válido.");
        
        contenidoQRActual = tipoQR === "email" ? `mailto:${valor}` :
                           tipoQR === "link" ? (valor.startsWith("http") ? valor : `https://${valor}`) :
                           valor;
        generarQR(contenidoQRActual);
    });

    botonDescargar.addEventListener("click", () => {
        if (!qrActual) return alert("No hay un código QR para descargar.");
        const link = document.createElement("a");
        link.href = qrActual;
        link.download = "codigoQR.png";
        link.click();
    });
});