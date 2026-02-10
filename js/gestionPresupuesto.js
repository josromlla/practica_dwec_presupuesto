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
function filtrarGastos(filtro){
    
   // fechaDesde - Fecha mínima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
   // fechaHasta - Fecha máxima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
   // valorMinimo - Valor mínimo del gasto.
   // valorMaximo - Valor máximo del gasto.
   // descripcionContiene - Trozo de texto que deberá aparecer en la descripción. Deberá hacerse la comparación de manera que no se distingan mayúsculas de minúsculas.
   
   // etiquetasTiene - Array de etiquetas: si un gasto contiene alguna de las etiquetas indicadas en este parámetro, se deberá devolver en el resultado.
   //  Deberá hacerse la comparación de manera que no se distingan mayúsculas de minúsculas.

    let gastosFiltrados= new Array();
    
    if (filtro.fechaDesde===undefined){
        
    }
    gastosFiltrados=gastos.filter(item=>item.valor>filtro.valorMinimo)

    for (let i=0; i<gastos.length;i++){

        
        //filtrado.fechaDesde        
        //filtrado.fechaHasta 
        //valorMinimo
        //valorMaximo
        //descripcionContiene
        //etiquetasTiene
    }
    //filter
    

    return gastosFiltrados;
}

function agruparGastos(){

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
    this.obtenerPeriodoAgrupacion=function(periodo){
        let resultado;
        if(periodo=="anyo"){
            resultado= new Date(this.fecha).toISOString().slice(0,4)
            
        }
        if(periodo=="mes"){
           resultado= new Date(this.fecha).toISOString().slice(0,7)
        }
        if(periodo=="dia"){
            
          resultado= new Date(this.fecha).toISOString().slice(0,10)
        }
        return resultado;
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
    calcularBalance,
    filtrarGastos,
    agruparGastos


}
