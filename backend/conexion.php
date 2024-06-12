<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = '127.0.0.1';
$dbname = 'oasis';
$username = 'root';
$conn = '';

try{
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, '');
    echo "Se ha realizado correctamente la conexion a la base de datos"; 
} catch(PDOException $error) {
    print "Error conexion base de datos: " . $error->getMessage() . "<br/>";
    die();
}