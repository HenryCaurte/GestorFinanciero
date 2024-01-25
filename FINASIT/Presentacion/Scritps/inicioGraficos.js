// aqui en teoria ya tiene lo que tenemos en inicio, entonces tenemos lo que es dataFechas
const gastoMayor =  new grafico();
const ingresoMayor =  new grafico();
var dataValor = [];
var dataTipo = [];
//
var dataValorIngreso  = [];
var dataTipoIngreso = [];

async function gastoMesMayor(){ // elegimos cual es el mes mayor
    maximo = Math.max(...dataFechas) // ... es un operador de propagacion :O, para exapndir los elementos como argumentos de una funcion
    maximoIngreso = Math.max(...dataFechasIngresos); // ahora para el maximo de ingreso

//necesito hacer el llamado asi no le envie nada
    for(let a = 0; a< dataFechas.length ; a++){
        if(dataFechas[a]===maximo){
        data = await enviarDatos({'MAX': a+1},'../../Logica/PHPP/gastoMesMayor.php');
        
        for(const clave in data){
            const valor =  data[clave];
            for(const tipo in valor){
                const vv = valor[tipo];
                dataValor.push(vv);
                dataTipo.push(tipo);
            }
          }  
        break;
        }
    }
    for(let a = 0; a< dataFechasIngresos.length ; a++){
        if(dataFechasIngresos[a]===maximoIngreso){
        data = await enviarDatos({'MAX': a+1},'../../Logica/PHPP/ingresosMesMayor.php');
        
        for(const clave in data){
            const valor =  data[clave];
            for(const tipo in valor){
                const vv = valor[tipo];
                dataValorIngreso.push(vv);
                dataTipoIngreso.push(tipo);
            }
          }  
        break;
        }
    }



    gastoMayor.renderModelsChart(dataTipo,dataValor,["#ff000060","#DAF7A660","#FFC30060","#7CD08560","#900C3F60","#5F8FB660"],document.getElementById("gastoMayor"),'polarArea');
    ingresoMayor.renderModelsChart(dataTipoIngreso,dataValorIngreso,["#FFC30060","#7CD08560","#900C3F60","#5F8FB660"],document.getElementById("ingresoMayor"),"polarArea")
}
setTimeout(function() {
    gastoMesMayor();
  }, 500);
