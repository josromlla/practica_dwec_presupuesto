import{mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb} from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)

gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)

mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto());

//Añadir los gastos creados (función anyadirGasto)
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"))
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"))
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"))
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"))
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"))

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)

mostrarDatoEnId("gastos-totales",gestionPresupuesto.calcularTotalGastos())

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)

mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance())

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)

let gastos=gestionPresupuesto.listarGastos()
for (let i=0; i<gastos.length ; i++){
    mostrarGastoWeb("listado-gastos-completo",gastos[i])
}

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)

let filtro1={fechaDesde:"2021/09/01",fechaHasta:"2021/09/30"};
let gastosFiltrados1=gestionPresupuesto.filtrarGastos(filtro1)

for (let i=0; i<gastosFiltrados1.length ; i++){
    mostrarGastoWeb("listado-gastos-filtrado-1",gastosFiltrados1[i])
}

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let filtro2={valorMinimo:50}
let gastosFiltrados2=gestionPresupuesto.filtrarGastos(filtro2)

for (let i=0; i<gastosFiltrados2.length ; i++){
    mostrarGastoWeb("listado-gastos-filtrado-2",gastosFiltrados2[i])
}

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let filtro3={valorMinimo:200,etiquetasTiene:["seguros"]}
let gastosFiltrados3=gestionPresupuesto.filtrarGastos(filtro3)

for (let i=0; i<gastosFiltrados3.length ; i++){
    mostrarGastoWeb("listado-gastos-filtrado-3",gastosFiltrados3[i])
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 
// (funciones filtrarGastos y mostrarGastoWeb)
let filtro4={valorMaximo:50,etiquetasTiene:["comida", "transporte"]}
let gastosFiltrados4=gestionPresupuesto.filtrarGastos(filtro4)
for (let i=0; i<gastosFiltrados4.length ; i++){
    mostrarGastoWeb("listado-gastos-filtrado-4",gastosFiltrados4[i])
}

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)

let agrupacion1=gestionPresupuesto.agruparGastos("dia")
mostrarGastosAgrupadosWeb("agrupacion-dia",agrupacion1,"día")

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agrupacion2=gestionPresupuesto.agruparGastos("mes")
mostrarGastosAgrupadosWeb("agrupacion-mes",agrupacion2,"mes");

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agrupacion3=gestionPresupuesto.agruparGastos("anyo")
mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupacion3,"año");
