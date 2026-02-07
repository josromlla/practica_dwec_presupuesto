// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto=0;
let gastos= new Array();
let idGasto=0;

function actualizarPresupuesto(valor) {
    let resultado=0;
    if (valor >=0 ){
        presupuesto=valor;
        resultado=valor;
    }
    else{
        console.log("ERROR, dato no válido");
        resultado=-1;
    }

    return resultado;
}

function mostrarPresupuesto() {
    return ("Tu presupuesto actual es de " + presupuesto + " €");   
}


function CrearGasto(descripcion, valor, fecha ,...etiquetas ) {
    
    if (valor>=0){
         this.valor = valor;
    }
    else{
        this.valor=0;
    }
    
    this.descripcion = descripcion;
    this.idGasto=idGasto+1;
    idGasto++;

    this.fecha=compruebaFecha(fecha);    
    
    if (etiquetas == null){
        this.etiquetas=new Array();
    }
    else{
         this.etiquetas=etiquetas;
    }

    this.mostrarGasto = function() {
        return("Gasto correspondiente a "+ this.descripcion +" con valor " + this.valor +" €") 
    };

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    };

    this.actualizarValor = function(valor) {
        if (valor >= 0) {
            this.valor = valor;
        }
    };
    this.mostrarGastoCompleto = function(){
       texto= "Gasto correspondiente a "+this.descripcion+" con valor "+"this.valor"+" €. \n"+
       "Fecha: " +this.fecha.toLocaleString()+ "\n"+
        "Etiquetas:"
        
       // Etiquetas:
       // - ETIQUETA 1
       // - ETIQUETA 2
       // - ETIQUETA 3
        
        return texto;
    };
    this.actualizarFecha = function(fecha){
       //intentamos convertir la fecha recibida en timestamp
        let timestamp=Date.parse(fecha)
        //condicion para comprobar si timestamp no es un número
        if (!isNaN(timestamp)){
            this.fecha=timestamp;
        }        
    };
    this.anyadirEtiquetas = function(...etiquetas){
         
         for (let i=0; i< etiquetas.length; i++){
            if (!this.etiquetas.includes(etiquetas[i])){
                this.etiquetas.push(etiquetas[i]);
            }            
         }
    };

    this.borrarGasto = function(registro){
        //buscamos el indice
        let indice=-1;
        for (i=0 ; i<gastos.length ; i++){
            if ( gastos[i].idGasto == registro )
                indice=i
        }
        
        //eliminamos el registro con ese indice
        if (indice !==-1 )
            gastos.splice(indice,1);
        else
            console.log("el registro no se encuentra")
    };
}

function listarGastos(){
    return gastos;
} 
function anyadirGasto(){

}
function borrarGasto(){

}
function calcularTotalGastos(){

}
function calcularBalance(){

}

function compruebaFecha(fecha){
    //intentamos convertir la fecha recibida en timestamp
    let timestamp=Date.parse(fecha)
    //condicion para comprobar si timestamp no es un número
    if (isNaN(timestamp)){
        return fecha= new Date().getTime();
    }
    else{
        return timestamp;
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
