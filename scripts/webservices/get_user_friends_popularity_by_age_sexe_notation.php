<?php

include("../bdd/connexion_bdd.php");

const TRANCHE_AGE = ['18-21', '22-25', '26-29'];
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
    $sexTarget = 0;
} else {
    $sexTarget = $_POST['sex_target'];
}
// User ID
$userId = $_GET['user'];
// Set si on target sur le femmes ou hommes
$result['query'] = SEX[$sexTarget];
$result['popularity'][SEX[$sexTarget]] = [];

$query = $conn->prepare("SELECT user1, user2, date FROM relations WHERE user1 LIKE :user_id");
$query->bindParam(':user_id', $userId);
$query->execute();
$friends = $query->fetchAll();
// ses amis
$userFriends = [];
foreach ($friends as $friend) {
    $userFriends[] = $friend['user2'];
}
$array_ids = '('. implode(',', $userFriends) . ')';
$query = $conn->prepare('
    SELECT id, pseudo, age, sexe
    FROM utilisateurs U 
    WHERE U.id IN' . $array_ids
);
$query->execute();
$friends = $query->fetchAll();

$query = $conn->prepare('SELECT * FROM photos p WHERE p.id = :user_id ');
$query->bindParam(':user_id', $userId);
$query->execute();
$photo = $query->fetch();

$query = $conn->prepare('SELECT * FROM notations WHERE photo = :photo_id ');
$query->bindParam(':photo_id', $photo['id']);
$query->execute();
$notations = $query->fetchAll();

foreach (TRANCHE_AGE as $tranche) {
    $result['popularity']['male'][$tranche] = 0;
    $result['popularity']['female'][$tranche] = 0;
}

foreach ($friends as $friend) {
    if (!isset($friend['age'])) {
        continue;
    }
    $friendId = $friend['id'];
    $friendAge = $friend['age'];
    $friendSex = $friend['sexe'];
    foreach ($notations as $notation) {
        if ($friendId !== $notation['noteur']) {
            continue;
        }
        $tranche = getTrancheAge(TRANCHE_AGE, $friendAge);
        $result['popularity'][SEX[$friendSex]][$tranche] = $result['popularity'][SEX[$sexTarget]][$tranche] + 1;
    }
}

$result['user']['id'] = $userId;

include("../bdd/deconnexion_bdd.php");

echo json_encode($result);

function getTrancheAge($tranches, $age) {
    foreach ($tranches as $tranche) {
        $explodeTranche = explode('-', $tranche);
        if ((int)$explodeTranche[0] <= (int)$age && $age <= (int)$explodeTranche[1]) {
            return $tranche;
        }
    }

    return null;
}