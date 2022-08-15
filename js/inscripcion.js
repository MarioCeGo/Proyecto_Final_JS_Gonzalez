// Declaracion de variables \\
const form = document.getElementById("formularioInscripcion");
const primerNombre = document.getElementById("primerNombreEstudianteInscripcion");
const segundoNombre = document.getElementById("segundoNombreEstudianteInscripcion");
const primerApellido = document.getElementById("primerApellidoEstudianteInscripcion");
const segundoApellido = document.getElementById("segundoApellidoEstudianteInscripcion");
const cedula = document.getElementById("cedulaEstudianteInscripcion");
const fechaNacimiento = document.getElementById("fechaNacimientoEstudianteInscripcion");
const listaEstudiantesInscripto = document.getElementById("listaEstudiantesInscripto");
const btnFormAE = document.getElementById("btnFormAE");

// Creacion de eventos \\
window.onload = () =>{inicioInscripcion()};
document.getElementById("inscribirEstudiante").onclick = () => {crearEstudiante()};

// Funciones \\
function crearEstudiante(){
    let validarEstudiante = (sistema.buscarEstudianteXCedula(cedula.value) === undefined ) ? true : false;
    if(validarEstudiante && form.reportValidity()){
        let estudiante = new Estudiante(primeraMayuscula(primerNombre.value), primeraMayuscula(segundoNombre.value), primeraMayuscula(primerApellido.value), primeraMayuscula(segundoApellido.value), cedula.value, fechaNacimiento.value);
        sistema.agregarEstudiante(estudiante);
        sistema.listaEstudiantes.length>0 ? (btnFormAE.className = "btn btn-tertiary") : false ;
        guardarEstudiantes();
        mostrarEstudiantesInscripto();
        form.reset();
    }else if(!validarEstudiante){
        ventanaInfo("ADVERTENCIA");
    }
}

function mostrarEstudiantesInscripto(){
    listaEstudiantesInscripto.innerHTML = "";
    for(let elem of sistema.listaEstudiantes){
        let li = document.createElement("li");
        li.innerHTML = `${elem.primerNombre} ${elem.segundoNombre} ${elem.primerApellido} ${elem.segundoApellido} | ${elem.cedula} | ${elem.fechaNacimiento}`;
        listaEstudiantesInscripto.appendChild(li);
    }
}

function inicioInscripcion(){
    obtenerEstudiantes();
    if(sistema.listaEstudiantes.length>0){
        btnFormAE.className = "btn btn-tertiary";
        mostrarEstudiantesInscripto();
    }
    vistaActiva.push("INSCRIPCION");
}