<?php

$singin = new SQLite3('baseDato.db');

$nombreIn = $_POST['nombreIn'];
$usuarioIn = $_POST['usuarioIn'];
$passwordIn = $_POST['passwordIn'];
$apellidoIn = "-";
$edadIn = 0;
//hacemos la validacion: 
$passSegura =  password_hash($passwordIn,PASSWORD_BCRYPT);


//ahora el comando para ingresar
$ingresar ="INSERT INTO login(Usuario,Contrasena,Nombre,Apellido,Edad) VALUES('$usuarioIn','$passSegura','$nombreIn','$apellidoIn','$edadIn')"; // aca ingresamos cada uno
//ejecutamos la consulta:
$res =  $singin->exec($ingresar);

if ($res) {
    echo json_encode("Registro Exitoso");
} else {
    echo json_encode("Error al insertar fila: " . $singin->lastErrorMsg());
}
?>