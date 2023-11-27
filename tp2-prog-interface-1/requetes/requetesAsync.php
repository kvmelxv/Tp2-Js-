<?php

// Pour accéder à la base de données
require_once('fonctionsDB.php');


$request_payload = file_get_contents('php://input');
$data = json_decode($request_payload, true);


if (isset($data['action'])) {

    // Switch en fonction de l'action envoyée
    switch ($data['action']) {

        case 'ajouteTache':

            if (isset($data['tache'], $data['description'], $data['importance'])) {

                $tache = htmlspecialchars($data['tache']);
                $description = htmlspecialchars($data['description']);
                $importance = htmlspecialchars($data['importance']);

                echo json_encode(['result' => ajouteJoueur($tache, $description, $importance)]);
				
            } else {
                echo json_encode(['error' => 'Erreur query string']);
            }

            break;
    }

} else {
    
    echo json_encode(['error' => 'Erreur action']);
}