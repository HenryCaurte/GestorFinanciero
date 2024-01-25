var addIncomeButton = document.getElementById("add-income");
var incomeTable = document.getElementById("income-table");
var eventsIngresos = [] // para ingresar los ingresos y luego pasarlos a php
const tablaIngresos =  new tablaDatos(); // creamos la tabla de los datos
const columnas = ["Tipo","Fecha","Valor"]

addIncomeButton.addEventListener("click", ()=>{
    var ingresoCantidad = document.getElementById("income-amount").value;
    var ingresoTipo = document.getElementById("income-type").value;
    var ingrsoFecha = document.getElementById("income-date").value;

    const obj = {
        Tipo : ingresoTipo,
        Fecha : ingrsoFecha,
        Cantidad : ingresoCantidad
    }
    const obj2 = [
        Tipo = ingresoTipo,
        Fecha = ingrsoFecha,
        Cantidad = ingresoCantidad
    ]

    eventsIngresos.push(obj2);
    enviarDatos(obj,'../../Logica/PHPP/ingresosGuardar.php');
    load();
});

function load(){
    tablaIngresos.crearTabla(columnas,eventsIngresos,document.getElementById('tablaIngresos'))
    ingresosPorMes();
}
//y aqui añadimos la tabla: 
load();
//Aqui vamos a enviar los gastos por mes: 
function ingresosPorMes() {
    var iMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var a = 0; a < eventsIngresos.length; a++) {
        var fecha = eventsIngresos[a][1].split('-'); // genera un arreglo frente a la fecha
        var mesIndex = parseInt(fecha[1], 10) - 1; // convierte a entero y ajusta al índice del array
        iMes[mesIndex] += eventsIngresos[a][2]; // acumula el ingreso en el mes correspondiente
    }

    enviarDatos(iMes, '../../Logica/PHPP/ingresosPorMes.php'); // enviamos los datos
}
//despues de cargar eso, ahora lo mandaremos por un fecth mientras usamos una tabla de ingresos que se vincula con las demaS:
async function recibir(){
    respuesta = await fetch('../../Logica/PHPP/ingresos.php');
    datos = await respuesta.json();
    for(let a  = 0; a <datos.length ; a++){
        const obj = 
        [
            Tipo = datos[a].num.Tipo,
            Fecha = datos[a].num.Fecha,
            Cantidad = datos[a].num.Valor
        ]
        eventsIngresos.push(obj);
        load();
    }
}
recibir();