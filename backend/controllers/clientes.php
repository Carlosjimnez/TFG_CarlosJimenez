<?php
// CONEXION
require('./../conexion.php');

// CONTROLLER (ANALIZAR LA PETICION, LOS PARAMETROS Y LLAMAR A UN SERVICIO U OTRO)
$email = $_GET['email'] ?? null;
$contrasena =  $_GET['contrasena'] ?? null;
$id_cliente =  $_GET['id_cliente'] ?? null;

$contents = json_decode(file_get_contents("php://input"), true);
$data = '';

try {
    if($email && $contrasena) {
        $data = datosCliente($conn, $email, $contrasena);
    } else if($id_cliente) {
        $data = datosClientePorId($conn, $id_cliente);
    } else if($contents['datos']) {
        $data = crearCliente($conn, $contents['datos']);
    }
    
    $status = 'succes';
     
} catch(Exception $e) {
    $data = "Error en la peticion" . $e->getMessage();
    $status = "Error";
}

//$response = ["status" => $status, "data" => $data ];

//echo json_encode($response);

// ------- MODELO ----------
function crearCliente($conn, $datos) {
    $datos['numTarjeta'] = 678567345;
    $datos['fechaTarjeta'] = '2026-10-11';
    try {
        $stmt = $conn->prepare("INSERT INTO clientes VALUES (6,:nombre,:apellido,:numtelef,:email,:contrasena,:nombretar,:numerotar,:fechatar)");
        $stmt->bindParam(':nombre', $datos['nombre']);
        $stmt->bindParam(':apellido', $datos['apellido']);
        $stmt->bindParam(':numtelef', $datos['contacto']);
        $stmt->bindParam(':email', $datos['email']);
        $stmt->bindParam(':contrasena', $datos['contrasena']);
        $stmt->bindParam(':nombretar', $datos['nombreTarjeta']);
        $stmt->bindParam(':numerotar', $datos['numTarjeta']);
        $stmt->bindParam(':fechatar', $datos['fechaTarjeta']);
    
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return json_encode($data);
    } catch (PDOException $error) {
        echo $error->getMessage();
        return 'Error: ' . $error->getMessage();
    }
}
function datosCliente($conn, $email, $contrasena) {
    try {
        $stmt = $conn->prepare("SELECT * FROM clientes WHERE email = :email AND contrasena = :contrasena");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':contrasena', $contrasena);
    
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return json_encode($data);
    } catch (PDOException $error) {
        return 'Error: ' . $error->getMessage();
    }
}

function datosClientePorId($conn, $id_cliente) {
    try {
        $stmt = $conn->prepare("SELECT * FROM clientes WHERE id_cliente = :id_cliente");
        $stmt->bindParam(':id_cliente', $id_cliente);
    
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);   

        return json_encode($data);
    } catch (PDOException $error) {
        return 'Error: ' . $error->getMessage();
    }
}

?>
