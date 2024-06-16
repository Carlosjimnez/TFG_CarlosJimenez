<?php
//IMPORTAMOS EL MODELO CON SUS SERVICIOS
require('./../services/reservas.php');

$contents = json_decode(file_get_contents("php://input"), true);

$id_reserva =  $_GET['id_reserva'] ?? null;
$datos_reserva =  $contents['datos_reserva'] ?? null;

$data = '';

try{
    if($id_reserva) {
        //$data = borrarReserva()
    } else if($datos_reserva) {
        $data = crearReserva($conn, $datos_reserva);
    }

    $status = 'succes';

} catch(Exception $e) {
    $data = "Error en la peticion" . $e->getMessage();
    $status = "Error";
}

$response = ["status" => $status, "data" => $data];

echo json_encode($response);