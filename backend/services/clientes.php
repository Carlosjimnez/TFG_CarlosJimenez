<?php

// CONEXION
require('./../conexion.php');

// ------- MODELO ----------
function crearCliente($conn, $datos) {
    try {
        $stmt = $conn->prepare("INSERT INTO clientes VALUES ('',:nombre,:apellido,:numtelef,:email,:contrasena,:nombretar,:numerotar,:fechatar)");
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

        $response = $data[0] ?? null;

        return json_encode($response);

    } catch (PDOException $error) {
        return 'Error: ' . $error->getMessage();
    }
}

function datosClientePorID($conn, $id_cliente) {
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


function borrarClientePorId($conn, $id_cliente) {
    try {
        $stmt = $conn->prepare("DELETE FROM clientes WHERE id_cliente = :id_cliente");
        $stmt->bindParam(':id_cliente', $id_cliente);
    
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);   

        return json_encode($data);
    } catch (PDOException $error) {
        return 'Error: ' . $error->getMessage();
    }
}

function actualizarCliente($conn, $datos) {
    try {
        $stmt = $conn->prepare("UPDATE clientes 
                                SET id_cliente = :id_cliente, nombre = :nombre, apellido = :apellido, telefono = :numtelef, email = :email, 
                                contrasena = :contrasena, nombre_tarjeta = :nombretar, numero_tarjeta = :numerotar, fecha_tarjeta = :fechatar
                                WHERE id_cliente = :id_cliente");
        
        $stmt->bindParam(':id_cliente', $datos['id_cliente']);
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

function recuperarEmail($conn, $email) {
    try {
        $stmt = $conn->prepare("SELECT email FROM clientes WHERE email = :email");
        $stmt->bindParam(':fechatar', $email);
        
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);   

        return json_encode($data);
    } catch (PDOException $error) {
        return 'Error: ' . $error->getMessage();
    }
}
