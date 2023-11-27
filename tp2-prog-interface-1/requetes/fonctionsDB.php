<?php

$connexion = connexionDB();


/**
 * Connection avec la base de données
 */
function connexionDB() {
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASSWORD', ''); // Windows
    //define('DB_PASSWORD', 'root'); // MAC

    $laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);

    if (!$laConnexion) {
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }
    
    $db = mysqli_select_db($laConnexion, 'to-do-list');

    if (!$db) {
        die('La base de données n\'existe pas.');
    }
    
    mysqli_query($laConnexion, 'SET NAMES "utf8"');
    return $laConnexion;
}


/********** Requetes Sql **********/



function executeRequete($requete, $insert = false) {
    global $connexion;
    if ($insert) {
        mysqli_query($connexion, $requete);
        return $connexion->insert_id;
    } else {
        $resultats = mysqli_query($connexion, $requete);
        return $resultats;
    }
}

/**
* Retourne la liste des Taches
*/
function getAllTaches() {
	return executeRequete("SELECT * FROM taches");		
}


/**
* Ajoute le nouveau joueur
 */
function ajouteJoueur($tache, $description, $importance) {
	$query = "INSERT INTO taches (`tache`, `description`, `importance`) 
		      VALUES ('" . $tache . "','" . $description . "','" . $importance. "' )";
	return executeRequete($query, true);
}


