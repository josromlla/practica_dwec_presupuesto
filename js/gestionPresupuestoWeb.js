
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
        spanEtiqueta.textContent = gasto.etiquetas[i] + " ";

        //borrado etiqueta
        let borrarEtiquetaHandle = Object.create(BorrarEtiquetasHandle);
        borrarEtiquetaHandle.gasto = gasto;
        borrarEtiquetaHandle.etiqueta = gasto.etiquetas[i];
        spanEtiqueta.addEventListener("click", borrarEtiquetaHandle)
        divEtiquetas.append(spanEtiqueta);

    }
    divGasto.append(divEtiquetas);
    //</div>


    //boton editar
    let botonEditar = document.createElement("button");
    botonEditar.className = "gasto-editar";
    botonEditar.innerText = "Editar"
    botonEditar.setAttribute("type", "button");
    let edbut = Object.create(EditarHandle);
    edbut.gasto = gasto;
    botonEditar.addEventListener("click", edbut);
    divGasto.append(botonEditar);

    //boton borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.className = "gasto-borrar";
    botonBorrar.innerText = "Borrar";
    botonBorrar.setAttribute("type", "button");
    let borbut = Object.create(BorrarHandle);
    borbut.gasto = gasto;
    botonBorrar.addEventListener("click", borbut);
    divGasto.append(botonBorrar);

    //boton editar con formulario        

    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.className = "gasto-editar-formulario";
    botonEditarFormulario.setAttribute("type", "button");
    botonEditarFormulario.innerText = "Editar (formulario)";
    let edForBut = Object.create(EditarHandleFormulario);
    edForBut.gasto = gasto;
    botonEditarFormulario.addEventListener("click", edForBut)
    divGasto.append(botonEditarFormulario);

    container.append(divGasto);
}

function mostrarGastosAgrupadosWeb(id, agrup, periodo) {

    let contenedor = document.getElementById(id);

    // <div class="agrupacion">          
    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    //     <!-- PERIODO será "mes", "día" o "año" en función de si el parámetro
    // de la función es "mes", "dia" o "anyo" respectivamente -->
    //      <h1>Gastos agrupados por PERIODO</h1>
    let h1Gastos = document.createElement("h1");
    h1Gastos.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.append(h1Gastos);

    //     <!-- Se deberá crear un div.agrupacion-dato para cada propiedad del objeto agrup:     

    Object.entries(agrup).forEach(([clave, valor]) => {
        let divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.className = "agrupacion-dato";

        let spanAgrupacionDatoClave = document.createElement("span");
        spanAgrupacionDatoClave.className = "agrupacion-dato-clave";
        spanAgrupacionDatoClave.textContent = clave;
        divAgrupacionDato.append(spanAgrupacionDatoClave);

        let spanAgrupacionDatoValor = document.createElement("span");
        spanAgrupacionDatoValor.className = "agrupacion-dato-valor"
        spanAgrupacionDatoValor.textContent = valor;
        divAgrupacionDato.append(spanAgrupacionDatoValor)


        divAgrupacion.append(divAgrupacionDato);
    });

    contenedor.append(divAgrupacion);


}

function repintar() {

    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos())

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance())

    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. 
    // Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    let gastos = gestionPresupuesto.listarGastos()
    for (let i = 0; i < gastos.length; i++) {
        mostrarGastoWeb("listado-gastos-completo", gastos[i])
    }
}

function actualizarPresupuestoWeb() {

    let presupuesto = prompt("Introduzca presupuesto");
    gestionPresupuesto.actualizarPresupuesto(Number(presupuesto))
    repintar();
}
//ponemos fuera de la funcion el eventlistener
let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {

    //preguntar gasto al usuario
    let descripcion = prompt("introduzca la Descripción del gasto");
    let valor = Number(prompt("introduzca el Valor del gasto"));
    let fecha = prompt("introduzca la fecha del gasto en formato yyyy-mm-dd");
    let etiquetas = prompt("introduzca las etiquetas del gasto separadas por comas").split(",");
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas));
    repintar();
}
//ponemos fuera de la funcion el eventlistener
let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

//editar gasto
let EditarHandle = {
    handleEvent: function (e) {
        let fechaOriginal = new Date(this.gasto.fecha).toISOString().substring(0, 10);
        let descripcion = prompt("introduzca la Descripción del gasto", this.gasto.descripcion);
        let valor = Number(prompt("introduzca el Valor del gasto", this.gasto.valor));
        let fecha = prompt("introduzca la fecha del gasto en formato yyyy-mm-dd", fechaOriginal);
        let etiquetas = prompt("introduzca las etiquetas del gasto separadas por comas", this.gasto.etiquetas.join(","));

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas.split(","))
        repintar()
    }
}


//borrar gasto
let BorrarHandle = {
    handleEvent: function (e) {
        gestionPresupuesto.borrarGasto(this.gasto.id)
        repintar()
    }
}


//borrar etiquetas
let BorrarEtiquetasHandle = {
    handleEvent: function (e) {
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();
    }
}


//formulario cerrar
let FormularioCerrar = {
    handleEvent: function (e) {
        this.formulario.remove();
        this.botonEditar.removeAttribute("disabled");
    }
}


function formularioCrearHandle(event) {
    event.preventDefault()
    let descripcion = event.currentTarget.descripcion.value;
    let valor = parseFloat(event.currentTarget.valor.value);
    let fecha = event.currentTarget.fecha.value;
    let etiquetas = event.currentTarget.etiquetas.value.split(",");
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas));
    repintar()
    document.querySelector("form").remove();
    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
}

function nuevoGastoWebFormulario(event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    let formulario = plantillaFormulario.querySelector("form");
    let botonCancelar = plantillaFormulario.querySelector("button.cancelar");
    let botonPrincipal = event.currentTarget;

    //boton enviar
    formulario.addEventListener("submit", formularioCrearHandle);

    //boton cancelar
    let cancelarHandle = Object.create(FormularioCerrar)
    cancelarHandle.formulario = formulario;
    cancelarHandle.botonEditar = botonPrincipal;
    botonCancelar.addEventListener("click", cancelarHandle);

    //desactivar boton
    event.currentTarget.setAttribute("disabled", "disabled");

    //añadir
    event.target.parentNode.append(plantillaFormulario);
}

let FormuHandle = {
    handleEvent: function (e) {
        e.preventDefault();

        this.gasto.actualizarDescripcion(e.target.descripcion.value);
        this.gasto.actualizarValor(parseFloat(e.target.valor.value));
        this.gasto.actualizarFecha(e.target.fecha.value)

        let etiquetas = e.target.etiquetas.value;
        this.gasto.etiquetas = [];
        this.gasto.anyadirEtiquetas(...etiquetas.split(","))
        repintar();

        this.botonEditar.disabled = false;


    }
}

let FormuClose = {
    handleEvent: function (e) {
        this.formulario.remove();
        this.botonEditar.removeAttribute("disabled");
    }
}


let EditarHandleFormulario = {
    handleEvent: function (e) {
        e.preventDefault()

        let formu = document.getElementById("formulario-template").content.cloneNode(true);

        let formulario = formu.querySelector("form");
        let botonCancelar = formu.querySelector("button.cancelar");
        let botonPulsado = e.currentTarget;

        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = this.gasto.valor;
        formulario.fecha.value = this.gasto.fecha;
        formulario.etiquetas.value = this.gasto.etiquetas.join();

        //evento para el boton actualizar
        let forHandle = Object.create(FormuHandle);
        forHandle.gasto = this.gasto;
        forHandle.botonEditar = botonPulsado;
        formulario.addEventListener("submit", forHandle);

        //evento para el boton cancelar

        let canHandle = Object.create(FormuClose);
        canHandle.formulario = formulario;
        canHandle.botonEditar = botonPulsado;
        botonCancelar.addEventListener("click", canHandle);


        //desactivar boton
        botonPulsado.disabled = true;

        //Añadir al DOM
        botonPulsado.parentNode.append(formu);
    }
}


let crearGastoFormulario = document.getElementById("anyadirgasto-formulario")
crearGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);







export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}
