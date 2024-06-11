<?php



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$numero = $_GET['numero'] ?? null;

if ($numero) {
    $response = ['status' => 'success', 'message' => 'Número recibido', 'numero' => $numero];
} else {
    $response = ['status' => 'error', 'message' => 'No se recibió ningún número'];
}

echo json_encode($response);

/* http://localhost/TFG_Carlos/backend/index.php * */
?>