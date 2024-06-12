<?php
function datosCliente($conn, $email, $contrasena) {
    try {
        $stmt = $conn->prepare("SELECT * FROM clientes WHERE email = :email AND contrasena = :contrasena");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':contrasena', $contrasena);
    
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        //ARRAY ASOCIATIVO
        $response = ['status' => 'success', 'data' => $data];
    
        return json_encode($response);
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
    
        //ARRAY ASOCIATIVO
        $response = ['status' => 'success', 'data' => $data];
    
        return json_encode($response);
    } catch (PDOException $error) {
        return 'Error: ' . $error->getMessage();
    }
}