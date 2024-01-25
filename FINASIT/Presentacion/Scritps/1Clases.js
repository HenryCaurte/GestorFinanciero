//clase para el grafico de pie, si funciona lo exporto a otro archivo y lo pego para hacerlo mas ordenado
class grafico{
    constructor() {
        this.modelsChartInstance = null; // para que sea null
    }
    renderModelsChart(label, dataLable, colorLabel, lugarCreacion, tipo = 'doughnut') { // Metodo para crear
        if (this.modelsChartInstance) {
            this.modelsChartInstance.destroy();
        }
        const data = {
            labels: label,
            datasets: [{
                data: dataLable,
                backgroundColor: colorLabel
            }]
        };
        this.modelsChartInstance = new Chart(lugarCreacion, { type: tipo, data });
    }
}

class tablaDatos {
    constructor() {
        this.fade = null;
    }

    crearTabla(columnas, datos, lugarCreacion) {
        if (this.fade) {
            this.fade.destroy(); // si esta ya iniciam
        }
        this.fade = new gridjs.Grid({
            columns: columnas,
            search: true,
            data: () => {
                return new Promise(resolve => {
                    setTimeout(() =>
                        resolve(datos), 100);
                });
            }
        }).render(lugarCreacion);
    }
}

//no es una clase pero sirve para enviar datos: 
async function enviarDatos(obj,sitioFetch) {
    try {
       const response = await fetch(sitioFetch, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(obj)
       });
   
       const data = await response.json();
       return data;
    } catch (error) {
    console.error("Error al enviar datos:", error);
    }
}