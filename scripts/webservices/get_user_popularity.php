<?php

$result = [
    'photo' => [],
    'notations' => []
];

if (!isset($_GET['user'])) {
    echo json_encode($result);
}
include("../bdd/connexion_bdd.php");
$userId = $_GET['user'];

$query = $conn->prepare('SELECT * FROM photos WHERE id = :user_id');
$query->bindParam(':user_id', $userId);
$query->execute();

$userPhoto = $query->fetch();
$result['photo'] = '/assets/img/' . $userPhoto['chemin'];

$query = $conn->prepare('SELECT * FROM notations WHERE photo = :photo_id');
$query->bindParam(':photo_id', $userPhoto['id']);
$query->execute();

$notations = $query->fetchAll();

foreach ($notations as $notation) {
    $result["notations"][$notation['date']][] = $notation['note'];
}

$tmp = 0;
foreach ($result['notations'] as $key => $row) {
    if (sizeof($row) > 1) {
        foreach ($row as $count) {
            $tmp += (int)$count;
        }
        $result['notations'][$key] = [(string)($tmp / 2)];
    }
}

include("../bdd/deconnexion_bdd.php");

echo json_encode($result);