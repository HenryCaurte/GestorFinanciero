<?php

// INICIAMOS sesion
session_start();

$bd = new SQLite3('../../Persistencia/baseDato.db');

$data = json_decode(file_get_contents('php://input'), true); // esto es para poder obtener los datos, detectarlos de donde 
$id = $_SESSION['id'];
$mesMayor = $data['MAX'];
$gastosMes = array();
// Ahora tenemos que llamar a la base de datos del mes que queremos y de la persona que queremos claramente, entonces, no osotros vamos 
// a tener que llamar a cada uno de los gastos del mes, entonces: 
$busquedaMes = $bd->prepare("SELECT PersonaID, Fecha, Valor,Tipo
FROM ingresos
WHERE PersonaID =:id");
$busquedaMes->bindParam('id',$id,SQLITE3_INTEGER);
$resultado = $busquedaMes->execute(); //ejecutamos esto

while($row = $resultado->fetchArray()){
    $salto = 1;
    //separamos las fechas
    $fechaTotal = $row['Fecha'];
    //verificamos si da
    $mesFecha = explode("-",$fechaTotal);
    if($mesFecha[1]==$mesMayor){
        $tipo = $row['Tipo'];
        $valor = $row['Valor'];
        
        $encontrado = false;
        
        foreach ($gastosMes as &$gasto) {
            if (isset($gasto[$tipo])) {
                // Si ya existe el tipo, sumar el valor
                $gasto[$tipo] += $valor;
                $encontrado = true;
                break;
            }
        }
        
        // Si no se encontró el tipo, agregarlo al array
        if (!$encontrado) {
            $gastosMes[] = [$tipo => $valor];
        }
        
    }
}

echo json_encode($gastosMes);



?>