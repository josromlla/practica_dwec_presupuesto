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

function listarGastos(){
    return gastos;
} 
function anyadirGasto(gasto){
    gasto.id=idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id){
        //buscamos el indice
        let indice=-1;
        for (let i=0 ; i<gastos.length ; i++){
            if ( gastos[i].id == id )
                indice=i
        }
        
        //eliminamos el registro con ese indice
        if (indice !==-1 )
            gastos.splice(indice,1);
        else
            console.log("el registro no se encuentra")    
}

function calcularTotalGastos(){
    
    let sumaGastos=0;
    for (let i=0;i<gastos.length;i++){
       sumaGastos=sumaGastos+ gastos[i].valor;
    }
    return sumaGastos;
}

function calcularBalance(){
    let gastosTotales=calcularTotalGastos();
    return presupuesto-gastosTotales;
    
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

function CrearGasto(descripcion, valor, fecha ,...etiquetas ) {
    
    if (valor>=0){
         this.valor = valor;
    }
    else{
        this.valor=0;
    }
    
    this.descripcion = descripcion;

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
       let fechaFormateada = new Date(this.fecha).toLocaleString();
       let texto= "Gasto correspondiente a "+this.descripcion+" con valor "+this.valor+" €.\n" + "Fecha: " +fechaFormateada+ "\n"+ "Etiquetas:\n";        
       
        for (let i=0; i<this.etiquetas.length;i++) {
            texto=texto+ "- "+this.etiquetas[i]+"\n"
       }
              
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
    this.borrarEtiquetas=function(...etiquetasBorrar){
            
         //recorremos el array de las etiquetas a eliminar
         for (let i=0;i<etiquetasBorrar.length;i++){
            let etiquetaBorrar=etiquetasBorrar[i];
            let indice=-1;
            //buscamos el indice de la etiqueta
            for (let j=0;j<this.etiquetas.length;j++){
                 if (this.etiquetas[j] == etiquetaBorrar )
                    indice=j
            }
            //boramos la etiqueta
            if (indice !==-1 )
            this.etiquetas.splice(indice,1);
        else
            console.log("la etiqueta no se encuentra")
         }
         
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
