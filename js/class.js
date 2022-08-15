class Sistema{
    constructor(){
        this.listaEstudiantes = [];
    }
    agregarEstudiante(estudiante){
        this.listaEstudiantes.push(estudiante);
        this.listaEstudiantes.sort( (a,b) => {return (a.primerApellido).localeCompare(b.primerApellido)} )
    }
    eliminarEstudiante(cedula){
        for(let elem of sistema.listaEstudiantes){
            if(elem.cedula == cedula){
                this.listaEstudiantes.splice(this.listaEstudiantes.indexOf(elem), 1);
            }
        }
    }
    buscarEstudianteXCedula(cedula){
        return this.listaEstudiantes.find((estudiante) => estudiante.cedula === cedula);
    }
    porcentajeEstudiantes(){
        let porcentajes = [];
        let contA = 0;
        let contR = 0;
        for(let elem of this.listaEstudiantes){
            if(elem.status){
                contA ++;
            }else{
                contR ++;
            }
        }
        porcentajes.push(Math.round((contA*100)/this.listaEstudiantes.length));
        porcentajes.push(Math.round((contR*100)/this.listaEstudiantes.length));
        return porcentajes;
    }
}

class Estudiante{
    constructor(primerNombre, segundoNombre, primerApellido, segundoApellido, cedula, fechaNacimiento){
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.cedula = cedula;
        this.fechaNacimiento = fechaNacimiento;
        this.status = false;
    }
}

const sistema = new Sistema();