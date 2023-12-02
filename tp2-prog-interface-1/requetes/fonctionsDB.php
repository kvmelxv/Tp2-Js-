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


/**
* Exécute la requête SQL
* Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
*/
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

/**
* Retourne la tache spécifié
*/

function getTache($id) {
	// La fonction mysqli_real_escape_string est utilisée pour créer une chaîne SQL légale qui peut être utilisée dans une instruction SQL, en tenant compte du jeu de caractères (charset) actuel de la connexion.
	global $connexion;
	$id = mysqli_real_escape_string($connexion, $id);
	return executeRequete('SELECT * FROM taches WHERE id=' . $id);		
}

/**
* Supprime la tache specifiée
*/

function supprimeTache($id) {

    global $connexion;
    $id = mysqli_real_escape_string($connexion, $id);
    return executeRequete('DELETE FROM taches WHERE id=' . $id);

}


/**
 * Trie les taches par ordre alphabétique
 */

function trierParOrdreAlphabetique() {
    $resultats = executeRequete("SELECT * FROM taches ORDER BY tache ASC");

    // Convertir le résultat en tableau associatif
    $tachesTriees = [];
    while ($row = mysqli_fetch_assoc($resultats)) {
        $tachesTriees[] = $row;
    }

    return $tachesTriees;
}
/**
 * Trier les taches par importance
 */

function trierParImportance() {
    $resultats = executeRequete("SELECT * FROM taches ORDER BY importance ASC");

    // Convertir le résultat en tableau associatif
    $tachesTriees = [];
    while ($row = mysqli_fetch_assoc($resultats)) {
        $tachesTriees[] = $row;
    }

    return $tachesTriees;
}