// Declaracion de variables \\
const combo = document.getElementById("estudiantesInscripto");
const btnAR = document.getElementById("botonAOREstudiante");

// Creacion de eventos \\
window.onload = () =>{inicioAdministracion()}
document.getElementById("botonAOREstudiante").onclick = () => {aprobarOReprobar()};
document.getElementById("estudiantesInscripto").onclick = () => {statusEnCombo()};
document.getElementById("botonBorrarEstudiante").onclick = () => {borrarEstudiante()};

// Funciones \\
function aprobarOReprobar(){
    if(combo.value != 0){
        for (let elem of sistema.listaEstudiantes){
            if(elem.cedula == combo.value){
                elem.status ? (elem.status = false) : (elem.status = true);
                elem.status ? mostrarToastify("APROBO", elem) : mostrarToastify("REPROBO", elem);
                guardarEstudiantes();
                actualizarDatos();
            }
        }
    }else{
        mostrarToastify("ASE");
    }
    btnAR.innerHTML = "Aprobar o Reprobar";
    btnAR.className = "btn";
}

function borrarEstudiante(){
    if(combo.value != 0){
        for (let elem of sistema.listaEstudiantes){ 
            elem.cedula == combo.value ? ventanaInfo("ADVERTENCIAGRAVE",elem): false ;
        }
    }else{
        mostrarToastify("ASE");
    }
}

function confirmarBorrado(dato){
    sistema.eliminarEstudiante(dato.cedula);
    guardarEstudiantes();
    actualizarDatos();
    cerrarModal();
    mostrarToastify("ELIMINADO", dato)
    btnAR.innerHTML = "Aprobar o Reprobar";
    btnAR.className = "btn";
}

function statusEnCombo(){
    if(combo.value != 0){
        for (let elem of sistema.listaEstudiantes){
            if(elem.cedula == combo.value){
                if(elem.status){
                    btnAR.innerHTML = "Reprobar";
                    btnAR.className = "btn btn-reprobar";
                }else{
                    btnAR.innerHTML = "Aprobar";
                    btnAR.className = "btn btn-aprobar";
                }
            }
        }
    }
}

function mostrarEstudiantesEnLista(){
    let lista = document.getElementById("listaAdministrarEstudiante");
    lista.innerHTML = "";
    let statusAOR;
    for(let elem of sistema.listaEstudiantes){
        elem.status ? statusAOR = "aprobado" : statusAOR = "reprobado";
        let li = document.createElement("li");
        li.id = elem.cedula
        li.innerHTML = 
        `${elem.primerNombre} ${elem.segundoNombre} ${elem.primerApellido} ${elem.segundoApellido} | ${elem.cedula} <div class="status-estudiante ${statusAOR}"></div>`;
        lista.appendChild(li);
    }
}

function mostrarPorcentaje(){
    document.getElementById("porcentajeAprobado").innerHTML = "Porcentaje de estudiantes aprobados: " + sistema.porcentajeEstudiantes()[0] + "%";
    document.getElementById("porcentajeReprobado").innerHTML = "Porcentaje de estudiantes reprobados: " + sistema.porcentajeEstudiantes()[1] + "%";
}

function inicioAdministracion(){
    actualizarDatos();
}

function actualizarDatos(){
    obtenerEstudiantes();
    mostrarPorcentaje();
    mostrarEstudiantesEnLista(); 
    cargarEstudianteACombo();
}
