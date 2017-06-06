<?php

include("../bdd/connexion_bdd.php");

const TRANCHE_NOTATIONS = [0, 1, 2, 3, 4, 5];
const SEX = [
    0 => 'female',
    1 => 'male'
];

$result = [
    'user' => [],
    'query' => null,
    'popularity' => []
];
if (!isset($_GET['user'])) {
    echo json_encode($result);
}
if (!isset($_POST['sex_target'])) {
    $sexTarget = 1;
} else {
    $sexTarget = $_POST['sex_target'];
}
// Set si on target sur le femmes ou hommes
$result['query'] = SEX[$sexTarget];
$result['popularity'][SEX[$sexTarget]] = [];

$userId = $_GET['user'];

$query = $conn->prepare('SELECT * FROM photos WHERE id = :user_id');
$query->bindParam(':user_id', $userId);
$query->execute();
$userPhoto = $query->fetch();
$result['user']['photo'] = '/assets/img/' . $userPhoto['chemin'];

$query = $conn->prepare('SELECT * FROM notations WHERE photo = :photo_id');
$query->bindParam(':photo_id', $userPhoto['id']);
$query->execute();
$notations = $query->fetchAll();

$query = $conn->prepare("SELECT id, pseudo FROM utilisateurs WHERE sexe = :sexe_id");
$query->bindParam(':sexe_id', $sexTarget);
$query->execute();
$usersTarget = $query->fetchAll();
$usersId = [];
foreach ($usersTarget as $user) {
    $usersId[] = $user['id'];
}

foreach (TRANCHE_NOTATIONS as $key => $tranche) {
    $result['popularity'][SEX[$sexTarget]]["rate_" . $tranche] = 0;
}

foreach ($notations as $notation) {
    if (!isset($notation['note'])) {
        continue;
    }
    if (!in_array($notation['noteur'], $usersId)) {
        continue;
    }
    $tmpTranche = "rate_" . $notation['note'];
    if (isset($result['popularity'][SEX[$sexTarget]][$tmpTranche])) {
        $result['popularity'][SEX[$sexTarget]][$tmpTranche] = (int)$result['popularity'][SEX[$sexTarget]][$tmpTranche] + 1;
    }
}

$result['user']['id'] = $userId;

include("../bdd/deconnexion_bdd.php");

echo json_encode($result);