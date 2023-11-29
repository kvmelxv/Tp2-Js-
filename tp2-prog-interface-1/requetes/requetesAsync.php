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
        
        case 'supprimeTache':

            if (isset($data['id']) && !empty($data['id'])) {
                $success = supprimeTache($data['id']);
                $response = $success ? array('success' => true) : array('success' => false, 'error' => 'Erreur lors de la suppression de la tâche.');
                
                header('Content-type: application/json; charset=utf-8');
                echo json_encode($response);
            } else {
                echo json_encode('erreur');
            }

            break;
        
        case 'getTache' :

            if (isset($data['id'])) {
                $tache = mysqli_fetch_assoc(getTache($data['id']));
                header('Content-type: application/json; charset=utf-8');
                echo json_encode($tache);
            }

            break;
    }

} else {
    
    echo json_encode(['error' => 'Erreur action']);
}