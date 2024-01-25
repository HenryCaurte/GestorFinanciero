<?php

//iniciaremos la sesion
session_start();

//necesitamos la instancia de la base de datos: 
$bd = new SQLite3('../../Persistencia/baseDato.db');


$idSesion = $_SESSION['id']; // el ide a buscar


$gastosConsulta = $bd->prepare('SELECT PersonaID,Fecha,Gasto,Id,Tipo,Valor,Cadena FROM gastos WHERE PersonaID =:id'); //tenicamente buscamos en gastos las filas que tengan como personaID un id
$gastosConsulta ->bindParam('id',$idSesion,SQLITE3_INTEGER); //ya que el id es un entero ponemos el id de arriba, luego el valor que es de la sesion anterior, y ahora el tipo, entero

// luego miramos la consulta y pasamos en un echo un array de arrays xd
$resultado =  $gastosConsulta->execute();
$arregloEnviar = array(); // una arreglo que vamos a enviar arreglo de arreglos
//ahora iteramos sobre un if

while($row =  $resultado->fetchArray()){
    $auxArr = array("Fecha"=> $row['Fecha'],"Id"=> $row['Id'],"Tipo"=> $row['Tipo'],"Gasto"=> $row['Gasto'],"Valor"=> $row['Valor'], "Cadena"=>$row['Cadena']);
    array_push($arregloEnviar, array("num"/*.$contador*/ => $auxArr)); // son de forma: num0 , num1 ... ; asi podemos enviarlos y decir, num1.fecha , num2.id, si?
}

echo json_encode($arregloEnviar); // enviamos el arreglo para leerlo como json.

?>