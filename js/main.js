// Declaracion de variables \\
const modal = document.getElementById("modal");
const vistaActiva = [];

// Creacion de eventos \\
document.getElementById("btnManejarDatos").onclick = () => {ventanaInfo("MANEJADATOS")};

// Funciones \\
function ventanaInfo(tipo, dato){
    modal.className = "modal";
    if(tipo == "ADVERTENCIAGRAVE"){
        modal.innerHTML = `
        <div class="modal-info modal-info-advertenciaGrave">
            <img src="../images/modal/advertencia_grave.png" alt="">
            <h2>Advertencia</h2>
            <p>Esta a punto de borrar un estudiante, desea continuar?</p>
            <div class="modal-zonaBtn">
                <button id="btnConfirmBorrar" class="btn">Borrar</button>
                <button id="btnCerrarModal" class="btn btn-secundary">Cancelar</button>
            </div>
        </div>`;
        document.getElementById("btnConfirmBorrar").onclick = () => {confirmarBorrado(dato)};
        document.getElementById("btnCerrarModal").onclick = () => {cerrarModal()};

    }else if(tipo == "ADVERTENCIA"){
        modal.innerHTML = `
        <div class="modal-info modal-info-advertencia">
            <img src="../images/modal/advertencia.png" alt="">
            <h2>Advertencia</h2>
            <p>El estudiante ya esta inscripto!</p>
            <button id="btnCerrarModal" class="btn">Ok</button>
        </div>`;
        document.getElementById("btnCerrarModal").onclick = () => {cerrarModal()};

    }else if(tipo == "MANEJADATOS"){
        modal.innerHTML = `
        <div class="modal-info modal-info-datos">
            <button id="btnCerrarModal" class="btnCerrarModal"></button>
            <button id="btnInfoModal" class="btnInfoModal"></button>
            <img src="../images/modal/datos.png" alt="">
            <h2>Control de datos</h2>
            <form id="formDatos">
                <input type="number" name="" id="pinDatos" maxlength="4" placeholder="Ingrese PIN!" required>
            </form>
            <div class="modal-zonaBtn">
                <button id="btnGuardarDatosNube" class="btn">Guardar datos</button>
                <button id="btnRecuperarDatosNube" class="btn btn-tertiary">Recuperar datos</button>
            </div>
        </div>`;
        let pinDatos = document.getElementById("pinDatos");
        let formDatos = document.getElementById("formDatos");
        document.getElementById("btnGuardarDatosNube").onclick = () => {
            formDatos.reportValidity() ? guardarActualizarDatos(pinDatos.value) : "";
        };
        document.getElementById("btnRecuperarDatosNube").onclick = () => {
            formDatos.reportValidity() ? recuperarDatosNube(pinDatos.value) : "";
        };
        document.getElementById("btnCerrarModal").onclick = () => cerrarModal();
        document.getElementById("btnInfoModal").onclick = () => mostrarToastify("INFO");
    }
}

function mostrarToastify(tipo, estudiante){
    if(tipo == "REPROBO"){
        Toastify({
            text: `${estudiante.primerNombre} ${estudiante.primerApellido} reprobó el curso`,
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#f44336"
            }
        }).showToast();
    }else if(tipo == "APROBO"){
        Toastify({
            text: `${estudiante.primerNombre} ${estudiante.primerApellido} aprobó el curso`,
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#4CAF50"
            }
        }).showToast();        
    }else if(tipo == "ASE"){
        //ASE -> Aviso Seleccione Estudiante
        Toastify({
            text: "Seleccione estudiante!",
            duration: 2000,
            gravity: "bottom",
            position: "right"
        }).showToast();
    }else if(tipo == "INSCRIPTO"){
        Toastify({
            text: "Estudiante inscripto!",
            duration: 2000,
            gravity: "bottom",
            position: "right"
        }).showToast();
    }else if(tipo == "ELIMINADO"){
        Toastify({
            text: `${estudiante.primerNombre} ${estudiante.primerApellido} fue eliminado del curso`,
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#f44336"
            }
        }).showToast();        
    }else if(tipo == "GUARDADO"){
        Toastify({
            text: "Los datos fueron guardados con exito",
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#4CAF50"
            }
        }).showToast();        
    }
    else if(tipo == "ACTUALIZADO"){
        Toastify({
            text: "Los datos fueron actualizado con exito",
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#4CAF50"
            }
        }).showToast();        
    }else if(tipo == "INFO"){
        Toastify({
            text: "Agrega un PIN para guardar o recuperar tus datos!",
            duration: 3000,
            gravity: "bottom",
            position: "right",
        }).showToast();        
    }else if(tipo == "NODATA"){
        Toastify({
            text: "No hay datos para recuperar",
            duration: 3000,
            gravity: "bottom",
            position: "right",
        }).showToast();        
    }else if(tipo == "RECUPERADO"){
        Toastify({
            text: "Datos recuperados con exito!",
            duration: 3000,
            gravity: "bottom",
            position: "right",
        }).showToast();        
    }
    else if(tipo == "NOSAVE"){
        Toastify({
            text: "No hay datos para guardar",
            duration: 3000,
            gravity: "bottom",
            position: "right",
        }).showToast();        
    }
}