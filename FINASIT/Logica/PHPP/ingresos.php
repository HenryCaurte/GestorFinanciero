<?php
session_start(); // iniciamos la session que venia ya por defecto y debemos crear una tabla, una base de datos



$bd = new SQLite3('../../Persistencia/baseDato.db');

$idSession =  $_SESSION['id'];

$ingresosConsulta =  $bd->prepare('SELECT PersonaID,Tipo,Fecha,Valor FROM ingresos WHERE PersonaID = :id');
$ingresosConsulta-> bindParam('id',$idSession,SQLITE3_INTEGER); // aqui ponemos que es un entero y que es igual a idSession.

$resultado =  $ingresosConsulta->execute();
$arregloEnviar =  array(); // enviamos un array


while($row  =  $resultado->fetchArray()){
    $auxArr =  array("Tipo"=>$row['Tipo'],"Fecha"=>$row['Fecha'],'Valor'=>$row['Valor']);
    array_push($arregloEnviar,array("num"=>$auxArr)); // siento que es inecesario pero vamos a probarlo asi
}

echo json_encode($arregloEnviar); // y enviamos el arreglo, xjkanskjdna

?>