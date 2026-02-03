// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto=0;
// TODO: Variable global


function actualizarPresupuesto(valor) {
    let resultado=0;
    if (valor >=0 ){
        presupuesto=valor;
        resultado=valor;
    }
    else{
        alert("ERROR, dato no válido");
        resultado=-1;
    }

    return resultado;
}

function mostrarPresupuesto() {
   let texto= "Tu presupuesto actual es de " + presupuesto + " €"
   return texto
}

function CrearGasto(descripcion, valor) {
    if (valor < 0 ){
        valor=0;
    }
    
    let gasto = {
        descripcion: descripcion,
        valor: valor,

        mostrarGasto: function() {
        alert("Gasto correspondiente a "+ this.descripcion +" con valor " + this.valor +" €") 
        },
         actualizarDescripcion: function(descripcion) {
        this.descripcion=descripcion;
        },
        actualizarValor: function(valor) {
            if (valor >=0 ){
            this.valor=valor; 
            }
        }

    }
    return gasto;
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
