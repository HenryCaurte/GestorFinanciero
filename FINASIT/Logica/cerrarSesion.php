<?php

session_start();


$dirIndex = array('url' =>'../../index.html');
echo json_encode($dirIndex);

// Destruye la sesión
session_destroy();

?>