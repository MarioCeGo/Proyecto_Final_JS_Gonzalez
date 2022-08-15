// Funciones sincronas \\
function cargarEstudianteACombo(){
    combo.innerHTML = ` <option value="0" disabled selected>Seleccione estudiante</option>`
    for(let elem of sistema.listaEstudiantes){
        let option = document.createElement("option");
        option.innerHTML = `${elem.primerNombre} ${elem.segundoNombre} ${elem.primerApellido} ${elem.segundoApellido} | ${elem.cedula}`;
        option.value = elem.cedula;
        combo.appendChild(option);
    }
}

function primeraMayuscula(texto){
    let aux = "";
    if(texto != ""){
        aux = texto[0].toUpperCase();
        for(let i = 1 ; i < texto.length ; i++){
            aux += texto[i];        
        }
    }
    return aux;
}

function cerrarModal(){
    modal.innerHTML = "";
    modal.className = "";
}

function guardarEstudiantes(){
    sessionStorage.setItem("listaEstudiantes", JSON.stringify(sistema.listaEstudiantes));
}

function obtenerEstudiantes(){
    sistema.listaEstudiantes = ((JSON.parse(sessionStorage.getItem("listaEstudiantes")) || []));
}

// Funciones asincronas \\
async function guardarDatos(pin){
    let listaEstudiantes = sistema.listaEstudiantes; 
    let datos = {listaEstudiantes, pin}
    await fetch(`https://62e2a74fb54fc209b87df028.mockapi.io/almacenamiento`,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(datos)
    })
    mostrarToastify("GUARDADO");        
}

async function actualizarDatosNube(id){
    await fetch(`https://62e2a74fb54fc209b87df028.mockapi.io/almacenamiento/${id}`,{
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({listaEstudiantes: sistema.listaEstudiantes})
    });
    mostrarToastify("ACTUALIZADO"); 
}

async function guardarActualizarDatos(pin){
    if(sistema.listaEstudiantes.length>0){
        let resp = await fetch(`https://62e2a74fb54fc209b87df028.mockapi.io/almacenamiento`);
        let data = await resp.json();
        let aux = false;
        let id;
        for(let i = 0; i < data.length && !aux ; i++){
            if(data[i].pin == pin){
                aux = true;
                id = data[i].id;
            }
        }
        if(aux){
            actualizarDatosNube(id);
        }else{
            guardarDatos(pin);
        }
    }else{
        mostrarToastify("NOSAVE");
    }
    cerrarModal();
}

async function recuperarDatosNube(pin){
    let resp = await fetch(`https://62e2a74fb54fc209b87df028.mockapi.io/almacenamiento`);
    let data = await resp.json();
    data.forEach( (elem) => {
        (elem.pin == pin) ? (sistema.listaEstudiantes = [...elem.listaEstudiantes]) : [];
    })
    if(sistema.listaEstudiantes.length>0){
        guardarEstudiantes();
        if(vistaActiva[0] == "INSCRIPCION"){
            mostrarEstudiantesInscripto();
            btnFormAE.className = "btn btn-tertiary";
            mostrarToastify("RECUPERADO");
        }else{
            actualizarDatos();
            mostrarToastify("RECUPERADO");
        }        
    }else{
        mostrarToastify("NODATA");
    }
    cerrarModal();
}