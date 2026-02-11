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
   
   let gastosFiltrados = [...gastos]; 

    if (Object.keys(filtro).length > 0){
        if (filtro.fechaDesde){            
            let timestamp=Date.parse(filtro.fechaDesde);
            if (!isNaN(timestamp)){
                gastosFiltrados=gastosFiltrados.filter(item=>item.fecha >= timestamp)
            }
            else{
                console.log("la fecha no es válida")
            }
             

        }
        if (filtro.fechaHasta){
            if (filtro.fechaHasta){            
                let timestamp=Date.parse(filtro.fechaHasta);
                if (!isNaN(timestamp)){
                    gastosFiltrados=gastosFiltrados.filter(item=>item.fecha <= timestamp)
                }
                else{
                    console.log("la fecha no es válida")
                }
            }
        }

        if (filtro.valorMinimo){                
            gastosFiltrados=gastosFiltrados.filter(item=>item.valor >filtro.valorMinimo)
        }

        if (filtro.valorMaximo){
           gastosFiltrados=gastosFiltrados.filter(item=>item.valor<filtro.valorMaximo)    
        }

        if (filtro.descripcionContiene){
            gastosFiltrados=gastosFiltrados.filter(item=>item.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase()))            
        }

        if (filtro.etiquetasTiene){
            gastosFiltrados=gastosFiltrados.filter(item=> {
                for (let i=0;i<filtro.etiquetasTiene.length;i++){
                    let etiquetaBuscar=filtro.etiquetasTiene[i].toLowerCase();

                    for (let j=0; j<item.etiquetas.length;j++){
                        if (item.etiquetas[j].toLowerCase()===etiquetaBuscar){
                            return true;
                        }
                    }
                }
                return false;
            })
        }
    }
    
    return gastosFiltrados;
}

function agruparGastos(periodo,etiquetas,fechaDesde,fechaHasta){
    let fechaD;
    let fechaH;
     let timestamp=Date.parse(fechaDesde);
            if (!isNaN(timestamp)){
                fechaD=fechaDesde;
            }

     timestamp=Date.parse(fechaHasta);
            if (!isNaN(timestamp)){
                fechaH=fechaHasta;
            }
            else{
                fechaH=new Date().toISOString();
            }
    

    let filtro={etiquetasTiene: etiquetas, fechaDesde: fechaD, fechaHasta: fechaH};

    let gastosFiltrados=filtrarGastos(filtro);
     
    return gastosFiltrados.reduce ((acc,gasto)=>{
        let periodoAgrupacion=gasto.obtenerPeriodoAgrupacion(periodo)
        acc[periodoAgrupacion] = (acc[periodoAgrupacion] || 0) + gasto.valor;
        return acc;
    }, {});    
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
