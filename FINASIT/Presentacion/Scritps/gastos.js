//vamos a hacer el fecht: 

fetch('../../Logica/PHPP/gastos.php')
    .then(res => res.json())
    .then(dato => {
        for(let i = 0; i< dato.length ; i++){

            const aux1 = {
                Fecha: dato[i].num.Fecha, // en si guarda lo que es la fecha que clickeamos
                Id: dato[i].num.Id,
                Tipo: dato[i].num.Tipo, // si es alimento, transporte etc
                Gasto: dato[i].num.Gasto,
                Valor: dato[i].num.Valor,
                Cadena: dato[i].num.Cadena //agregamos la cadena
            }
            events.push(aux1)
           // aqui esta el problema y no se como solucionarlo 
             const newItem = document.createElement('div');
            newItem.classList = 'newItem';
            newItem.id =dato[i].num.Id;
            newItem.dataset.date = dato[i].num.Fecha; // le añado la fecha a cada item, de esa forma los puedo organizar
            newItem.dataset.modelo = dato[i].num.Tipo; // entonces cada div tiene una fecha y un munodelo, es decir, 05/12/2023 -> Alimentos , si?
            newItem.innerHTML = `
            <div class = "ppI" id = "arribaNew${dato[i].num.Id}"> 
                <input type="text" id="inputTipo${dato[i].num.Id}" style = "margin:1%" class = "inputItem" placeholder = "Item" value="${dato[i].num.Gasto}" >
                <input type="number" id="inputValor${dato[i].num.Id}" style = "margin:1%" class = "inputItem" placeholder = "Valor" value="${dato[i].num.Valor}" >
                <div class="empresa" id="empresa${dato[i].num.Id}"></div>

            </div>
            <div class = "ppI" id ="abajoNew${dato[i].num.Id}">
                <button onclick="aceptar(this)" id = "bontonAceptar${idNI}" >Aceptar </button>
                <button onclick="modificar(this)" id = "botonModificar${idNI}">Modificar</button>
                <button onclick="eliminar(this)" id = "botonEliminar${idNI}" > Eliminar</button>
            </div>
                `;
            centoModal.appendChild(newItem); // añadimos el nuevo item
            const empresaAuxMeter = document.getElementById('empresa'+dato[i].num.Id)
            cadena(empresaAuxMeter, dato[i].num.Tipo,dato[i].num.Id); //aqui metemos los dos si algo xdxxd
        }
        load();
    })
