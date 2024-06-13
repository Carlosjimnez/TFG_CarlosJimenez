<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$datos = json_decode(file_get_contents("php://input"), true);

if ($datos && isset($datos['datos'])) {
    $body = $datos['datos'];
    $response = ['status' => 'success', 'message' => 'Datos recibidos correctamente', 'body' => $body];
} else {
    $response = ['status' => 'error', 'message' => 'No se recibieron datos'];
}

echo json_encode($response);

?>
