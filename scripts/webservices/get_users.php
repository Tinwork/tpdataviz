<?php
// Le tableau de résultat
$result_request = array();

// Connexion à la BDD
include("../bdd/connexion_bdd.php");

$query = "SELECT id, pseudo FROM utilisateurs";
$query = $conn->prepare($query);
$query->execute();

$res = $query->fetchAll();

foreach ($res as $row) {
    $result_request[] = [
        'id' => $row['id'],
        'pseudo' => $row['pseudo']
    ];
}

// Déconnexion de la BDD
include("../bdd/deconnexion_bdd.php");

// Renvoyer le résultat au javascript
echo json_encode($result_request);
