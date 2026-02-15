
import * as gestionPresupuesto from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor) {

    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;

}

function mostrarGastoWeb(idElemento, gasto) {

    let container = document.getElementById(idElemento);

    //   <div class="gasto">
    let divGasto = document.createElement('div');
    divGasto.className = "gasto";

    // <div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
    let divDescripcion = document.createElement('div');
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    // <div class="gasto-fecha">FECHA DEL GASTO</div> 
    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toISOString();
    divGasto.append(divFecha);

    // <div class="gasto-valor">VALOR DEL GASTO</div> 
    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.append(divValor);

    // <div class="gasto-etiquetas">
    let divEtiquetas = document.createElement('div')
    divEtiquetas.className = "gasto-etiquetas"

    //   <span class="gasto-etiquetas-etiqueta">

    //    ETIQUETA 1
    //  </span>   
    //  <span class="gasto-etiquetas-etiqueta">
    //     ETIQUETA 2
    //   </span>
    //   <!-- Etcétera -->
    //  </div> 
    for (let i = 0; i < gasto.etiquetas.length; i++) {
        let spanEtiqueta = document.createElement('span')
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = gasto.etiquetas[i]+" ";
        divEtiquetas.append(spanEtiqueta);
    }
    divGasto.append(divEtiquetas);
    //</div>
    container.append(divGasto);
}

function mostrarGastosAgrupadosWeb(id, agrup, periodo) {

   let contenedor =document.getElementById(id);

    // <div class="agrupacion">          
       let divAgrupacion =document.createElement("div");
       divAgrupacion.className="agrupacion";

       //     <!-- PERIODO será "mes", "día" o "año" en función de si el parámetro
      // de la función es "mes", "dia" o "anyo" respectivamente -->
      //      <h1>Gastos agrupados por PERIODO</h1>
        let h1Gastos=document.createElement("h1");
        h1Gastos.textContent="Gastos agrupados por "+periodo;
        divAgrupacion.append(h1Gastos);

       //     <!-- Se deberá crear un div.agrupacion-dato para cada propiedad del objeto agrup:     

        Object.entries(agrup).forEach(([clave, valor]) => {
            let divAgrupacionDato =document.createElement("div");
            divAgrupacionDato.className="agrupacion-dato";

            let spanAgrupacionDatoClave =document.createElement("span");
            spanAgrupacionDatoClave.className="agrupacion-dato-clave";
            spanAgrupacionDatoClave.textContent=clave;
            divAgrupacionDato.append(spanAgrupacionDatoClave);

            let spanAgrupacionDatoValor =document.createElement("span");
            spanAgrupacionDatoValor.className="agrupacion-dato-valor"
            spanAgrupacionDatoValor.textContent=valor;
            divAgrupacionDato.append(spanAgrupacionDatoValor)


            divAgrupacion.append(divAgrupacionDato);
        });
        
        contenedor.append(divAgrupacion);
    

}

function repintar(){
    
    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto());

    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId("gastos-totales",gestionPresupuesto.calcularTotalGastos())

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance())

    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. 
    // Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    let elemento=document.getElementById("listado-gastos-completo");
    elemento.innerHTML="";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    let gastos=gestionPresupuesto.listarGastos()
    for (let i=0; i<gastos.length ; i++){
        mostrarGastoWeb("listado-gastos-completo",gastos[i])
    }
}

function actualizarPresupuestoWeb (){


    let presupuesto= promt("Introduzca presupuesto");
    gestionPresupuesto.actualizarPresupuesto(Number(presupuesto))
    repintar();

   
   

//Una vez definida la función, se añadirá como manejadora del evento click del botón actualizarpresupuesto
//  mediante addEventListener. Para ello habrá que obtener el elemento botón correspondiente previamente.
}

function nuevoGastoWeb (){

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}
