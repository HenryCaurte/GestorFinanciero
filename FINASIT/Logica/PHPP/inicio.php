<?php
    //iniciamos la sesion primero
    session_start();
    $bdMes = new SQLite3('../../Persistencia/baseDato.db');

    //verificamos si estuvo activada mirando si hay esas "variables globales" 
    if (session_status() === PHP_SESSION_ACTIVE) { //, $_SESSION['apellido'], $_SESSION['edad'])) {
        $nombre = $_SESSION['nombre']; $apellido = $_SESSION['apellido']; $edad =  $_SESSION['edad']; // inicializamos estas variables
        $arrayMesesGastos = array();
        $arrayMesesIngresos = array();
        //la parte donde se meten los meses de Gastos
        $busca = $bdMes->prepare('SELECT * FROM GastoMes WHERE PersonaID = :pid');
        $busca->bindParam('pid',$_SESSION['id']); // asignamos el que buscaremos dentro de esta para luego pasarle el dato
        //como solo hay un registro en cada mes por persona
        $respuesta=$busca->execute();
        if($row = $respuesta->fetchArray()){
            $arrayMesesGastos = array("ENERO"=>$row['ENERO'],"FEBRERO"=>$row['FEBRERO'],"MARZO"=>$row['MARZO'],"ABRIL"=>$row['ABRIL'],
                                "MAYO"=>$row['MAYO'] ,"JUNIO"=>$row['JUNIO'],"JULIO"=>$row['JULIO'],"AGOSTO"=>$row['AGOSTO'],
                                "SEPTIEMBRE"=>$row['SEPTIEMBRE'],"OCTUBRE"=>$row['OCTUBRE'],"NOVIEMBRE"=>$row['NOVIEMBRE'],"DICIEMBRE"=>$row['DICIEMBRE']);
        }
        //aca termina lo de los emeses de gasto,
        $buscaIng = $bdMes->prepare('SELECT * FROM IngresoMes WHERE PersonaID = :pid');
        $buscaIng->bindParam('pid',$_SESSION['id']); // asignamos el que buscaremos dentro de esta para luego pasarle el dato
        //como solo hay un registro en cada mes por persona
        $respuestaIng=$buscaIng->execute();
        if($row = $respuestaIng->fetchArray()){
            $arrayMesesIngresos = array("ENERO"=>$row['ENERO'],"FEBRERO"=>$row['FEBRERO'],"MARZO"=>$row['MARZO'],"ABRIL"=>$row['ABRIL'],
                                "MAYO"=>$row['MAYO'] ,"JUNIO"=>$row['JUNIO'],"JULIO"=>$row['JULIO'],"AGOSTO"=>$row['AGOSTO'],
                                "SEPTIEMBRE"=>$row['SEPTIEMBRE'],"OCTUBRE"=>$row['OCTUBRE'],"NOVIEMBRE"=>$row['NOVIEMBRE'],"DICIEMBRE"=>$row['DICIEMBRE']);
        }
        //aca termina lo de los emeses de gasto,

        $jj = array("nombre"=>$nombre,"apellido"=>$apellido,"edad"=>$edad); // mandamos un arreglo

        $unionEnviar = array("dataPersona" => $jj,"dataMeses" => $arrayMesesGastos,"dataMesesIngresos" => $arrayMesesIngresos);
        echo json_encode($unionEnviar); // y aqui lo mandamos
        exit();//y salimos
    }
    else{
        $jj = array('url'=> '../Vistas/index.html');
        echo json_encode("noxd"); // lo devolvemos al index, no puede ingresar xd
    }

    //ahora mandaremos la info de las tablas



?>