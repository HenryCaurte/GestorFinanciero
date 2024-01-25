<?php
//iniciamos sesion
session_start();

$bd = new SQLite3('../../Persistencia/baseDato.db');

$data = json_decode(file_get_contents('php://input'), true); // esto es para poder obtener los datos
// los datos obtenidos son:  Nombre, Apellido y Edad, y los vamos a cambiar, es decir, modificar, entonces: 

$idPersona = $_SESSION['id'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$edad = $data['edad'];


$buscar =  $bd->prepare("UPDATE login SET 
Nombre = :nuevoNombre, 
Apellido = :nuevoApellido, 
Edad = :nuevaEdad 
WHERE id = :idPersona");

$buscar->bindParam("idPersona",$idPersona,SQLITE3_INTEGER);
$buscar->bindParam("nuevoNombre",$nombre,SQLITE3_TEXT);
$buscar->bindParam("nuevoApellido",$apellido,SQLITE3_TEXT);
$buscar->bindParam("nuevaEdad",$edad,SQLITE3_INTEGER);

$resultado = $buscar->execute();

if($resultado){
    echo json_encode("Realizado");
}
else{
    echo json_encode("No Realizado");
}


?>