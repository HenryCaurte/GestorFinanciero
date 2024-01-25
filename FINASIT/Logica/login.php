<?php
//iniciamos la sesion: 
session_start(); 

//miramos la base de datos: 
$login = new SQLite3('../Persistencia/baseDato.db');
$user = $_POST['user'];
$pass = $_POST['password'];

// ahora buscamos al usurio:

$busca =  $login->prepare('SELECT id,Usuario,Contrasena,Nombre,Apellido,Edad FROM login WHERE Usuario = :usuario');
$busca->bindParam(':usuario', $user,SQLITE3_TEXT);
$respuesta = $busca->execute();
//miramos con un fecht Array , si ingresa
if ($row = $respuesta->fetchArray()) {
//miramos la contraseña
    if(password_verify($pass,$row['Contrasena'])){
        //coloco los session para mandar
        $_SESSION['nombre'] = $row['Nombre'];
        $_SESSION['apellido'] = $row['Apellido'];
        $_SESSION['edad'] = $row['Edad'];
        $_SESSION['id'] = $row['id']; //pasamos el id a todas las demas paginas

        // redirigimos
        $jj = array("url" => "Presentacion/Paginas/inicio.html");
        echo json_encode($jj); // enviamos como json
        die(); // se acaba
    }
    else{
        $jj = array("url" => '1' , "txt" =>"El usuario o contraseña han sido invalidos");
        echo json_encode($jj);
    }
}
else{
    $jj = array("url" => '1' , "txt" =>"El usuario o contraseña han sido invalidos");
    echo json_encode($jj);
}



?>