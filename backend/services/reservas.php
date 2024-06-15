<?php
// CONEXION
require('./../conexion.php');

// ------- MODELO ----------
function crearReserva($conn, $datos) {
    
    try {
        $stmt = $conn->prepare("INSERT INTO reservas 
     
        VALUES ('',:id_cliente, :nombre, :telefono, :id_oferta, :id_tratamiento, :id_trabajador,
        :fecha_reserva, :hora_reserva, :detalles)");

        $stmt->bindParam(':id_cliente', $datos['id_cliente'], PDO::PARAM_INT);
        $stmt->bindParam(':nombre', $datos['nombre'], PDO::PARAM_STR);
        $stmt->bindParam(':telefono', $datos['contacto'], PDO::PARAM_STR);
        $stmt->bindValue(':id_oferta',$datos['oferta'], PDO::PARAM_INT);
        $stmt->bindValue(':id_tratamiento', $datos['producto'], PDO::PARAM_INT);
        $stmt->bindValue(':id_trabajador', $datos['trabajador'], PDO::PARAM_INT);
        $stmt->bindParam(':fecha_reserva', $datos['fechaReserva'], PDO::PARAM_STR);
        $stmt->bindParam(':hora_reserva', $datos['hora'], PDO::PARAM_STR);
        $stmt->bindParam(':detalles', $datos['detalles'], PDO::PARAM_STR);

        $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return json_encode($data);
    } catch (PDOException $error) {
        echo $error->getMessage();
        return 'Error: ' . $error->getMessage();
    }
}