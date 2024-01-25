// aquid edeberia conocer un fetch para los datos de la persona: 
let dataFechas = [] ;//vamos a pasarnos lo desde el main, entonces, a leer, como datos a pasar entre las sessiones 
let dataFechasIngresos = [];
const nombreSpan = document.getElementById('nombreSpan');
const nombrePerfil = document.getElementById('nombrePerfil');
const apellidoPerfil = document.getElementById('apellidoPerfil');
const edadPerfil =  document.getElementById('edadPerfil');
//sync await
async function obtenerDatos(){
  try{
    const respuesta =  await fetch('../../Logica/PHPP/inicio.php',{method:'POST'});
    const data =  await respuesta.json()

    if(data.dataPersona.url){
          window.location.replace(data.url);
        }
        nombreSpan.innerHTML=data.dataPersona.nombre;
        nombrePerfil.innerHTML=data.dataPersona.nombre;
        apellidoPerfil.innerHTML = data.dataPersona.apellido;
        edadPerfil.innerHTML = data.dataPersona.edad;

        //ahora pondermos lo que son lo de los meses en lkos gastos, se puede automatizar en vez de colocar "ENERO,FEBRERO" con un numer y un for de 6, pero despues: 

        for(const clave in data.dataMeses){
          const valor =  data.dataMeses[clave];
          dataFechas.push(valor);
        }
        for(const clave in data.dataMesesIngresos){ //metemos ingresos
          const valor =  data.dataMesesIngresos[clave];
          dataFechasIngresos.push(valor);
        }
        crearGraficas();

  }
  catch(error){
    console.error('Error al obtener datos:', error);
  }
}
obtenerDatos();
///////////////////////////////////// graficas 
function crearGraficas(){
const ingresosGrafica =  document.getElementById('ingresosGrafica') //esto refleja los espacios
const gastosGrafica = document.getElementById('gastosGrafica') // espacioes no la grafica
// graficas
graficaIngresos =  new Chart(ingresosGrafica ,{
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      datasets: [{
        label: 'Gastos',
        data:dataFechas,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});

graficaGastos =  new Chart(gastosGrafica ,{ //le quite el var
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      datasets: [{
        label: 'Ingresos',
        data: dataFechasIngresos,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});
}
// aqui crearemos la fucnion para podere enviar datos a la pagina
function datosFormulario(){
  let nombre = document.querySelector('input[name="nombreEnvio"]').value;
  let apellido = document.querySelector('input[name="apellidoEnvio"]').value;
  let edad = document.querySelector('input[name="edadEnvio"]').value;

  if(nombre.length === 0){
    nombre= nombreSpan.innerHTML;
  }
  
  if(apellido.length === 0){
    apellido= apellidoPerfil.innerHTML;
  }
  
  if(edad.length === 0){
    edad= edadPerfil.innerHTML;
  }
  
  return {
    nombre: nombre,
    apellido: apellido,
    edad: edad,
  };
}

function enviarFormulario(){
  const formData =  datosFormulario();
  enviarDatos(formData,'../../Logica/PHPP/inicioDatos.php');
}


/* Aqui viene el codigo para el modalPerfil y botones*/
const perfil = document.getElementById('perfil')
const sombra =  document.getElementById('sombra')
const modalPerfil = document.getElementById('modalPerfil')
const cerrarModal = document.getElementById('cerrarModal')
const modificarDatos =  document.getElementById('modificarDatos')
const form = document.getElementsByClassName('form');
//botones""
const cerrarSesion = document.getElementById('cerrarSesion');
const btnModificar = document.getElementsByClassName('btnModificar')

function initButtons(){
perfil.addEventListener('click', ()=> {
    sombra.style.visibility = 'visible';
    modalPerfil.classList.remove('cerrar')
    modalPerfil.classList.add('abrir')
})
cerrarModal.addEventListener('click', () => {
    sombra.style.visibility = 'hidden'
    modalPerfil.classList.remove('abrir')
    modalPerfil.classList.add('cerrar');
})
cerrarSesion.addEventListener('click',()=>{
    fetch('../../Logica/cerrarSesion.php')
          .then(res => res.json())
          .then(data => {
            window.location.replace(data.url);
          })
})
modificarDatos.addEventListener('click', ()=>{
  console.log("a"+form[0].style.display)
  form[0].style.display = 'flex';
  modalPerfil.style.display = 'none';

})
btnModificar[0].addEventListener('click', ()=>{
  form[0].style.display = 'none';
  modalPerfil.style.display = 'flex';
  // el resto sobre el registros
  enviarFormulario();
  window.alert("Cuando vuelvas a ingresar a la pagina, encontraras los cambios correspondientes")

})
}
// ahora partado de la tabla y las graficas de Pie: 
const tabla =  new tablaDatos();
tabla.crearTabla(["Tipo","Cadena","Logo","Cantidad"],[["INGRESO"," ","",""],["GASTOS"," ","",""]],document.getElementById("tablaGI"));

initButtons();