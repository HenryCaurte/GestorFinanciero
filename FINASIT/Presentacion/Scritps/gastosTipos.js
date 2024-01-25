//pondremos la cadena a la que le hizo algo: 
//hay diferentes tipos de gasto entonces: 
//Primero cogeremos el que escogimos: 

function cadena(contendorPadre,eleccion, idNI) {
    switch (eleccion) {
        case 'Entretenimiento':
            const entretenimientoCadenas = `
                <select class = "centrosDeCadena" id ="cadenaElegida${idNI}">
                    <option class ="marca" data-marca="Netflix">Netflix </option>
                    <option class ="marca" data-marca="HBO">HBO </option>
                    <option class ="marca" data-marca="DisneyPlus">Disney</option>
                    <option class ="marca" data-marca="PrimeVideo">Prime</option>
                </select>`
                contendorPadre.innerHTML = entretenimientoCadenas;
        break;
        case 'Alimentos':
            const alimentosCadenas = `
                <select class = "centrosDeCadena" id ="cadenaElegida${idNI}">
                    <option class ="marca" data-marca="Alpina">Alpina</option>
                    <option class ="marca" data-marca="Colanta">Colanta</option>
                    <option class ="marca" data-marca="Alqueria">Alqueria</option>
                    <option class ="marca" data-marca="Barrio">Barrio</option>
                </select>`
            contendorPadre.innerHTML = alimentosCadenas;
        
        break;
        case 'Transporte':
            const trasporteCadenas = `
                <select class = "centrosDeCadena" id ="cadenaElegida${idNI}">
                    <option class ="marca" data-marca="Transmilenio">Transmilenio</option>
                    <option class ="marca" data-marca="Sitp">Sitp</option>
                    <option class ="marca" data-marca="Taxi">Taxi</option>
                    <option class ="marca" data-marca="Didi">Didi</option>
                    <option class ="marca" data-marca="Uber">Uber</option>
                </select>`
            contendorPadre.innerHTML = trasporteCadenas;

        break;
        case 'Mercado':
            const mercadoCAdenas = `
                    <select class = "centrosDeCadena" id ="cadenaElegida${idNI}">
                        <option class ="marca" data-marca="Ara">Ara </option>
                        <option class ="marca" data-marca="Exito">Exito </option>
                        <option class ="marca" data-marca="Justo y Bueno">Justo y Bueno</option>
                        <option class ="marca" data-marca="Jumbo">Jumbo</option>
                    </select>`
            contendorPadre.innerHTML = mercadoCAdenas;
        break;
        default:
            contendorPadre.innerHTML = '-';
        break;
    }
}