<?php
session_start();


$bd = new SQLite3('../../Persistencia/baseDato.db');


$data = json_decode(file_get_contents("php://input"), true);

$idEliminar = $data['id'];

$eliminar =  $bd->prepare("DELETE FROM gastos WHERE id = :idE");
$eliminar -> bindParam("idE",$idEliminar,SQLITE3_TEXT);

$resultado = $eliminar->execute(); // lo ejecutamos

if($resultado){
    echo json_encode("eliminado");

}
else{
    echo json_encode("no eliminado");
}


?>