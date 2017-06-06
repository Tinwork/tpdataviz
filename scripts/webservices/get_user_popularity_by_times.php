<?php

include("../bdd/connexion_bdd.php");

$result = [
    'user' => [],
    'popularity' => []
];
if (!isset($_GET['user'])) {
    echo json_encode($result);
}
$userId = $_GET['user'];
$query = $conn->prepare("SELECT user1, user2, date FROM relations WHERE user1 LIKE :user_id");
$query->bindParam(':user_id', $userId);
$query->execute();
$friends = $query->fetchAll();
// ses amis
$userFriends = [];
foreach ($friends as $friend) {
    $userFriends[] = [
        'id'    => $friend['user2'],
        'date'  => $friend['date']
    ];
}

usort($userFriends, function($friend1, $friend2) {
    $v1 = strtotime($friend1['date']);
    $v2 = strtotime($friend2['date']);

    return $v1 - $v2;
});

$lastValue = 0;
$lastIndex = null;
foreach ($userFriends as $friend) {
    $lastValue = $lastValue + 1;
    $index = $friend['date'];
    $result['popularity'][$index] = $lastValue;
}

$result['user']['id'] = $userId;

include("../bdd/deconnexion_bdd.php");

echo json_encode($result);
