<?php
//IMPORTAMOS EL MODELO CON SUS SERVICIOS
require('./../services/clientes.php');

// CONTROLLER (ANALIZAR LA PETICION, LOS PARAMETROS Y LLAMAR A UN SERVICIO U OTRO)
$email = $_GET['email'] ?? null;
$contrasena =  $_GET['contrasena'] ?? null;
$id_cliente =  $_GET['id_cliente'] ?? null;

$contents = json_decode(file_get_contents("php://input"), true);

$datos_crear =  $contents['datos_crear'] ?? null;
$datos_actualizar =  $contents['datos_actualizar'] ?? null;

$data = '';

try {
    if($email && $contrasena) {
        $data = datosCliente($conn, $email, $contrasena);
    } else if($id_cliente) {
        $data = borrarClientePorId($conn, $id_cliente);
    } else if($datos_crear) {
        $data = crearCliente($conn, $datos_crear);
    } else if($datos_actualizar) {
        $data = actualizarCliente($conn, $datos_actualizar);
    }
    $status = 'succes';  

    if(strstr($data, "Error")) {
        $status = 'Error';
    }
} catch(Exception $e) {
    $data = "Error en la peticion" . $e->getMessage();
    $status = "Error";
}

$response = ["status" => $status, "data" => $data];

echo json_encode($response);
?>
