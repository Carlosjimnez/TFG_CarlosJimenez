<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = '127.0.0.1';
$dbname = 'balneario_oasis';
$username = 'root';
$conn = '';

try{
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, '');
} catch(PDOException $error) {
    print "Error conexion base de datos: " . $error->getMessage() . "<br/>";
    die();
}