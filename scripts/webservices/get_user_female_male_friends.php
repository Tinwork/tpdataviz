<?php

$result = [
    'user' => [],
    'friends' => [
        'female' => 0,
        'male' => 0
    ]
];

if (!isset($_GET['user'])) {
    echo json_encode($result);
}
include("../bdd/connexion_bdd.php");
$userId = $_GET['user'];

$query = $conn->prepare('SELECT id, sexe, pseudo FROM utilisateurs');
$query->execute();
$users = $query->fetchAll();

$query = $conn->prepare("SELECT user1, user2, date FROM relations WHERE user1 LIKE :user_id");
$query->bindParam(':user_id', $userId);
$query->execute();
$friends = $query->fetchAll();

$userFriends = [];
foreach ($friends as $friend) {
    $userFriends[] = $friend['user2'];
}

foreach ($userFriends as $friend) {
    foreach ($users as $user) {
        if ($user['id'] !== $friend) {
            continue;
        }
        if ((int)$user['sexe'] == 1) {
            $result['friends']['male'] = (int)$result['friends']['male'] + 1;
            continue;
        }

        $result['friends']['female'] = (int)$result['friends']['female'] + 1;
    }
}

$result['user'] = $userId;

include("../bdd/deconnexion_bdd.php");

echo json_encode($result);