import{mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb} from '/.gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)

gestionPresupuesto.actualizarPresupuesto("1500");

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)

mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto());

//Añadir los gastos creados (función anyadirGasto)
gestionPresupuesto.anyadirGasto(gestionPresupuesto.crearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestionPresupuesto.anyadirGasto(gestionPresupuesto.crearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"))
gestionPresupuesto.anyadirGasto(gestionPresupuesto.crearGasto("Bonobús", 18.60, "2020-05-26", "transporte"))
gestionPresupuesto.anyadirGasto(gestionPresupuesto.crearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"))
gestionPresupuesto.anyadirGasto(gestionPresupuesto.crearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"))
gestionPresupuesto.anyadirGasto(gestionPresupuesto.crearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"))

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)

mostrarDatoEnId("gastos-totales",gestionPresupuesto.calcularTotalGastos())

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)

mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance())
//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)

mostrarGastoWeb("listado-gastos-completo",gestionPresupuesto.listarGastos)
//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let filtro1={fechaDesde="1/09/2021",fechaHasta:"30/09/2021"};
mostrarGastoWeb("listado-gastos-filtrado-1", gestionPresupuesto.filtrarGastos(filtro1));

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let filtro2={valorMinimo:50}
mostrarGastoWeb("listado-gastos-filtrado-2",gestionPresupuesto.filtrarGastos(filtro2));

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let filtro3={valorMinimo:200,etiqueta:seguros}
mostrarGastoWeb("listado-gastos-filtrado-3",gestionPresupuesto.filtrarGastos(filtro3));

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 
// (funciones filtrarGastos y mostrarGastoWeb)
let filtro4={valorMinimo:200,etiquetas:["comida", "transporte"]}
mostrarGastoWeb("listado-gastos-filtrado-4",gestionPresupuesto.filtrarGastos(filtro4));

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
