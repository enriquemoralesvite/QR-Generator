// QR Code Generator
import QRCode from "qrcode";

document.addEventListener("DOMContentLoaded", function () {
    const botonText = document.getElementById("texto");
    const botonEmail = document.getElementById("email");
    const botonLink = document.getElementById("link");
    const entrada = document.getElementById("entrada");
    const botonGenerar = document.getElementById("botonGenerar");
    const contenedorQR = document.getElementById("qr");
    const botonDescargar = document.getElementById("botonDescargar");

    let tipoQR = "link"; 
    let qrActual = ""; 

    function cambiarTipoQR(tipo, placeholder, inputType) {
        tipoQR = tipo;
        entrada.placeholder = placeholder;
        entrada.type = inputType;
        limpiarSeleccion();
        document.getElementById(tipo).classList.add("bg-sky-500");
    }

    function limpiarSeleccion() {
        [botonText, botonEmail, botonLink].forEach((boton) => {
            boton.classList.remove("bg-sky-500");
        });
    }

    botonText.addEventListener("click", function () {
        cambiarTipoQR("texto", "Escriba su texto aquí", "text");
    });

    botonEmail.addEventListener("click", function () {
        cambiarTipoQR("email", "usuario@ejemplo.com", "email");
    });

    botonLink.addEventListener("click", function () {
        cambiarTipoQR("link", "https://www.ejemplo.com", "url");
    });

    
    botonGenerar.addEventListener("click", function () {
        let valor = entrada.value.trim();
        if (valor === "") {
            alert("Por favor, ingrese un valor válido.");
            return;
        }

        let contenidoQR = "";
        switch (tipoQR) {
            case "texto":
                contenidoQR = valor;
                break;
            case "email":
                contenidoQR = "mailto:" + valor;
                break;
            case "link":
                contenidoQR = valor.startsWith("http") ? valor : "https://" + valor;
                break;
        }

        
        contenedorQR.innerHTML = "";

        QRCode.toDataURL(contenidoQR, { width: 230, margin: 2 }, function (err, url) {
            if (err) {
                console.error("Error generando el QR:", err);
                return;
            }

            
            qrActual = url;

            
            let img = document.createElement("img");
            img.src = qrActual;
            img.classList.add("w-60", "h-60", "rounded-md");
            contenedorQR.appendChild(img);

            
            entrada.value = "";
        });
    });

    
    botonDescargar.addEventListener("click", function () {
        if (!qrActual) {
            alert("No hay un código QR para descargar.");
            return;
        }

        let link = document.createElement("a");
        link.href = qrActual;
        link.download = "codigoQR.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
// QR Code Generator