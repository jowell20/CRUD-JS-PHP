<?php
require('../model/usuarios.php');
//------------------------------------------------------------------------------


$usuario = new Usuarios();
//---------------------listar--------------------
$user = $usuario->selectAll();
if (!$user) {

    die("no hay datos");
} else {
    $json = array();
    while ($row = mysqli_fetch_array($user)) {
        $json[] = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'apellido' => $row['apellido'],
            'cedula' => $row['cedula'],
            'correo' => $row['correo'],
            'telefono' => $row['telefono'],
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
}
//----------------------agregar--------------
if (isset($_POST['nombre'])) {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $cedula = $_POST['cedula'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];

    $usuario = new Usuarios();
    $result = $usuario->insert($nombre, $apellido, $cedula, $correo, $telefono);

    if (!$result) {
        echo "error";
    } else {
        echo "Guardado";
    }
}
//-------------------------------eliminar------
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $usuario = new Usuarios();
    $result = $usuario->delete($id);
    if (!$result) {
        die("Error");
    } else {
        echo "empleado eliminado";
    }
}
//------------------editar-----------
if (isset($_POST['idP'])) {
    $idP = $_POST['idP'];
    $nombreP = $_POST['nombreP'];
    $apellido = $_POST['apellido'];
    $cedula = $_POST['cedula'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
  
    $usuario = new Usuarios();
    $result = $usuario->upDate(
        $nombreP,
        $apellido,
        $cedula,
        $correo,
        $telefono,
        $idP

    );
    if ($result) {
        echo "error";
    } else {
        echo "editado";
    }
}
    /*   if ($result) {
        $response = ["message" => "error"];
    } else {
        $response = ["message" => "editado"];
    }

    header('Content-Type: application/json');
    echo json_encode($response);*/

   /* if ($result) {
        echo "error";
    } else {
        echo "editado";
    }*/

// Verifica si la solicitud es de tipo PUT
/*// Verifica si la solicitud es de tipo PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Lee el cuerpo de la solicitud
    $putData = file_get_contents("php://input");

    // Analiza los datos en formato URL codificada
    parse_str($putData, $putDataArray);

    // Verifica si los datos requeridos existen
    if (isset($putDataArray['idP'], $putDataArray['nombreP'], $putDataArray['apellido'], $putDataArray['cedula'], $putDataArray['correo'], $putDataArray['telefono'])) {
        $idP = $putDataArray['idP'];
        $nombreP = $putDataArray['nombreP'];
        $apellido = $putDataArray['apellido'];
        $cedula = $putDataArray['cedula'];
        $correo = $putDataArray['correo'];
        $telefono = $putDataArray['telefono'];

        $usuario = new Usuarios();
        $result = $usuario->upDate(
            $nombreP,
            $apellido,
            $cedula,
            $correo,
            $telefono,
            $idP
        );
        if ($result) {
            echo "error";
        } else {
            echo "editado";
        }
    } else {
        echo "Datos incompletos en la solicitud PUT";
    }
} else {
    echo "Método de solicitud incorrecto. Se esperaba PUT.";
}*/
/*Este código verifica que la solicitud sea de tipo PUT, luego lee y analiza los datos del cuerpo de la solicitud y realiza la actualización en la base de datos. Asegúrate de que los datos se estén enviando en formato JSON en la solicitud AJAX desde tu frontend para que puedan ser analizados correctamente en el controlador.*/
