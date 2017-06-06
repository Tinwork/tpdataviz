<?php
	// Le tableau de résultat
	$result_request = array();
	
	/*
		On teste si le paramètre GET existe
		0 -> tous les utilisateurs
		id_unique -> un seul utilisateur
		plusieurs id séparés par des virgules -> plusieurs utilisateurs
	*/
	if(isset($_GET['user'])) {
		// Connexion à la BDD
		include("../bdd/connexion_bdd.php");
		
		$user = $_GET['user'];
	
		$query = "SELECT user, message, date
				FROM statuts";
		if($user != 0) {
			$query = $query." WHERE user IN (".$user.")";
		}

        $query = $conn->prepare($query);
        $query->execute();
        $res = $query->fetchAll();

		foreach ($res as $row) {
			$result_request[] = array(intval($row[0]), $row[1], $row[2]);
		}

		// Déconnexion de la BDD
		include("../bdd/deconnexion_bdd.php");
	}
	
	// Renvoyer le résultat au javascript
	echo json_encode($result_request);

?>