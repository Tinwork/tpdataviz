<?php

$result = [
    'user' => [],
    'friends' => [
        'male' => [
            '18-21' => 0,
            '22-25' => 0,
            '26-29' => 0
        ],
        'female' => [
            '18-21' => 0,
            '22-25' => 0,
            '26-29' => 0
        ]
    ]
];
if (!isset($_GET['user'])) {
    echo json_encode($result);
}
include("../bdd/connexion_bdd.php");
$userId = $_GET['user'];

$tranches = ['18-21', '22-25', '26-29'];

$query = $conn->prepare('SELECT id, sexe, pseudo, age FROM utilisateurs');
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
        $friendAge = $user['age'];
        if ((int)$user['sexe'] == 1) {
            $tranche = getTrancheAge($tranches, $friendAge);
            $result['friends']['male'][$tranche] = (int)$result['friends']['male'][$tranche] + 1;
            continue;
        }
        $tranche = getTrancheAge($tranches, $friendAge);
        $result['friends']['female'][$tranche] = (int)$result['friends']['female'][$tranche] + 1;
    }
}

$result['user'] = $userId;

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