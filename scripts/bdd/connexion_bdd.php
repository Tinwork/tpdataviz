<?php
// On se connecte de la BDD
$servername = "db";
$port = 3306;
$username = "root";
$password = "admin";
$bdd_name = "app";

$conn = new PDO('mysql:host=mysql;port='. $port .';dbname=' .$bdd_name, $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>