
   
   function mostrarDatoEnId(idElemento,valor){

    let elemento = document.getElementById(idElemento);
    elemento.textContent="Tu presupuesto actual es de "+valor+" €";

   }

    function mostrarGastoWeb(idElemento, gasto){
    
        let container=document.getElementById(idElemento);
        
    //   <div class="gasto">
        let divGasto = document.createElement('div');
        divGasto.className="gasto";
    
    // <div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
        let divDescripcion = document.createElement('div');
        divDescripcion.className="gasto-descripcion";
        divDescripcion.textContent=gasto.descripcion;
        divGasto.append(divDescripcion);

    // <div class="gasto-fecha">FECHA DEL GASTO</div> 
        let divFecha= document.createElement('div');
        divFecha.className="gasto-fecha";
        divFecha.textContent=new Date(gasto.fecha).toISOString;
        divGasto.append(divFecha);

    // <div class="gasto-valor">VALOR DEL GASTO</div> 
        let divValor= document.createElement('div');
        divValor.className="gasto-valor";
        divValor.textContent=gasto.valor;
        divGasto.append(divValor);

    // <div class="gasto-etiquetas">
        let divEtiquetas= document.createElement('div')
        divEtiquetas.className="gasto-etiquetas"

    //   <span class="gasto-etiquetas-etiqueta">

    //    ETIQUETA 1
    //  </span>   
    //  <span class="gasto-etiquetas-etiqueta">
    //     ETIQUETA 2
    //   </span>
    //   <!-- Etcétera -->
    //  </div> 
        for (let i=0 ; i< gasto.etiquetas.length ; i++){
            let spanEtiqueta= document.createElement('span')
            spanEtiqueta.className="gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent=gasto.etiquetas[i];
            divEtiquetas.append(spanEtiqueta);
        }
        divGasto.append(divEtiquetas);
    //</div>
        container.append(divGasto);
    }

   function mostrarGastosAgrupadosWeb(id, agrup, periodo){

   }

   export   {
   mostrarDatoEnId,
   mostrarGastoWeb,
   mostrarGastosAgrupadosWeb

}
