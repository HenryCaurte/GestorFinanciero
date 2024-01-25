<?php
//este sera para guardar los datos digitados en el sistema acerca de los ingresos: 

session_start(); // iniciamos secion

$bd = new SQLite3('../../Persistencia/baseDato.db');

$data = json_decode(file_get_contents('php://input'),true);

$idPersona= $_SESSION['id'];
$Fecha = $data['Fecha'];
$Tipo = $data['Tipo'];
$Valor = $data['Cantidad'];

// metemos cada uno de los datos y ahora hacemos la consulta de lo que queremos hacer : 
//primeor lo que queremos hacer es buscar los datos:
$busqueda =  $bd->prepare('SELECT PersonaID,Fecha,Tipo,Valor FROM ingresos WHERE PersonaID=:personaid AND Fecha =:fecha AND Tipo = :tipo AND Valor =:valor');
$busqueda -> bindParam("personaid",$idPersona,SQLITE3_INTEGER);
$busqueda -> bindParam("fecha",$Fecha,SQLITE3_TEXT);
$busqueda -> bindParam("tipo",$Tipo,SQLITE3_TEXT);
$busqueda -> bindParam("valor",$Valor,SQLITE3_NUM);

$resultado = $busqueda->execute(); //ejecutamos

if($row = $resultado->fetchArray()){
    // esta es la parte de modificar
}
else{
    // aqui lo que tenemos que hacer es insertar: 
    $insertar =  $bd->prepare("INSERT INTO ingresos(PersonaID,Fecha,Tipo,Valor) VALUES (:personaid,:fecha,:tipo,:valor)");
    $insertar ->bindParam('personaid',$idPersona,SQLITE3_INTEGER);
    $insertar ->bindParam('fecha',$Fecha,SQLITE3_TEXT);
    $insertar ->bindParam('tipo',$Tipo,SQLITE3_TEXT);
    $insertar ->bindParam('valor',$Valor,SQLITE3_NUM);

    $res =  $insertar->execute(); // lo ejecutamos 

    if ($res) {
        echo json_encode("Registro insertado con éxito. ");
    } else {
        echo json_encode("Error al insertar registro:");
    } //y aqui verifgicamos si esta bien o mal
}

?>