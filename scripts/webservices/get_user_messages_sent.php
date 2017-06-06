<?php

$result = [
    'user' => [],
    'messages' => [
        'to_friend' => [],
        'to_foreigners' => []
    ]
];

if (!isset($_GET['user'])) {
    echo json_encode($result);
}
include("../bdd/connexion_bdd.php");
$userId = $_GET['user'];

$query = $conn->prepare('SELECT * FROM messages WHERE emetteur = :user_id');
$query->bindParam(':user_id', $userId);
$query->execute();

$messages = $query->fetchAll();

$query = $conn->prepare("SELECT user1, user2, date FROM relations WHERE user1 LIKE :user_id");
$query->bindParam(':user_id', $userId);
$query->execute();
$friends = $query->fetchAll();
$userFriends = [];
foreach ($friends as $friend) {
    $userFriends[] = $friend['user2'];
}

$nbMessages = 0;
foreach ($messages as $message) {
    $nbMessages++;
    $destinataire = $message['destinataire'];
    if (in_array($destinataire, $userFriends)) {
        $result['messages']['to_friend'][] = $destinataire;
    } else {
        $result['messages']['to_foreigners'][] = $destinataire;
    }
}

$result['user'] = $userId;
$result['messages']['to_friend'] = (sizeof($result['messages']['to_friend']) / $nbMessages) * 100;
$result['messages']['to_foreigners'] = (sizeof($result['messages']['to_foreigners']) / $nbMessages) * 100;


include("../bdd/deconnexion_bdd.php");

echo json_encode($result);