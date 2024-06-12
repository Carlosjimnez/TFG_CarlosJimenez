<?php
// CONEXION
// require('./../conexion.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = '127.0.0.1';
$dbname = 'oasis';
$username = 'root';
$conn = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, '');
} catch (PDOException $error) {
    print "Error conexion base de datos: ";
    die();
}

// CONTROLLER (ANALIZAR LA PETICION, LOS PARAMETROS Y LLAMAR A UN SERVICIO U OTRO)
$email = $_GET['email'] ?? null;
$contrasena =  $_GET['contrasena'] ?? null;
$id_cliente =  $_GET['id_cliente'] ?? null;

$data = '';

try {
    if($email && $contrasena) {
        $data = datosCliente($conn, $email, $contrasena);
    } else if($id_cliente) {
        $data = datosClientePorId($conn, $id_cliente);
    }

    var_dump($_POST['body']);

    /*crearCliente(
        $conn, 
        $_POST['nombre'],
        $_POST['apellido'],
        $_POST['contacto'], 
        $_POST['email'], 
        $_POST['fechaTarjeta'], 
        $_POST['nombreTarjeta'], 
        $_POST['numTarjeta'], 
        $_POST['fechaTarjeta']
    );*/
    
    $status = 'succes';
     
} catch(Exception $e) {
    $data = "Error en la peticion" . $e->getMessage();
    $status = "Error";
}

//$response = ["status" => $status, "data" => $data ];

//echo json_encode($response);

// ------- MODELO ----------
function crearCliente($conn, $nombre, $apellido, $numtelef, $email, $contrasena, $nombretar, $numerotar, $fechatar) {
    try {
        $stmt = $conn->prepare("INSERT INTO clientes VALUES ('',:nombre,:apellido,:numtelef,:email,:contrasena,:nombretar,:numerotar,:fechatar)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':numtelef', $numtelef);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':contrasena', $contrasena);
        $stmt->bindParam(':nombretar', $nombretar);
        $stmt->bindParam(':numerotar', $numerotar);
        $stmt->bindParam(':fechatar', $fechatar);
    
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return json_encode($data);
    } catch (PDOException $error) {
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
