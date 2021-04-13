<?php
session_start();

// console_log('resas session :');
// console_log(isset($_SESSION['resas']));

// TODO : Le tableau de réservation de tickets de la page Accueil de l’espace d’administration
/* doit être ordonné par date de réservation de la plus ancienne à la plus récente​ .
Votre client peut seulement supprimer une ou plusieurs réservation(s) de ticket(s) à
la fois. Il ne peut ni ajouter, ni éditer les informations d’un ticket réservé mais il peut
éditer son état de réservation.
L’état de réservation suit le comportement suivant :
- Chaque nouvelle réservation de ticket(s) doit comporter l’état “à traiter” par
défaut.
- La modification de l’état à “en cours” ne permet plus de revenir à l’état “à
traiter”.
- La modification de l’état à “terminé” ne permet plus de revenir aux états “à
traiter” et “en cours”.*/

function addRow($data, $i){
    return '<tr>
            <th>'.$data->name.'</th>
            <th>'.$data->firstname.'</th>
            <th>'.$data->adress.'</th>
            <th>'.$data->city.'</th>
            <th>'.$data->zipcode.'</th>
            <th>'.$data->phone.'</th>
            <th>'.$data->tickets.'</th>
            <th>'.$data->eventName.'</th>
            <th>'.$data->eventID.'</th>
            <th><form method="POST" action="../utils/changeStatus.php"><input type="text" name="indexToChange" value="'.$i.'" style="display:none"> <input  type="submit" value="'.$data->status.'"> </form></th>
            <th><form method="POST" action="../utils/supprRow.php"><input type="number" name="indexToSuppr" value="'.$i.'" style="display:none"> <input type="submit" value="suppr"> </form></th>
        </tr>
    ';
}
?>

<table align="left" border="1">
    <thead>
        <tr>
            <th colspan="10">Liste de tickets réservés par les utilisateurs</th>
        </tr>
        <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Zipcpode</th>
            <th>Phone nomber</th>
            <th>Nb de tickets</th>
            <th>Nom de l'event</th>
            <th>ID de l'event</th>
            <th>Etat de réservation</th>
        </tr>
    </thead>

    <tbody>
        <?php
        for ($i = 0 ; $i < count($_SESSION['resas']) ; $i ++){
            // console_log($_SESSION['admin_page']);
            echo addRow($_SESSION['resas'][$i], $i);
        }
        ?>
    </tbody>
</table>