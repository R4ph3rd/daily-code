<?php
    include('./fonctions.php');
    session_start();
    echo $_POST['indexToChange'];
    
    if (isset($_SESSION['resas']) && isset($_POST['indexToChange'])){
        if ($_SESSION['resas'][$_POST['indexToChange']]->status == 'à traiter'){
            $_SESSION['resas'][$_POST['indexToChange']]->status = 'en cours';
        } else if ($_SESSION['resas'][$_POST['indexToChange']]->status == 'en cours'){
            $_SESSION['resas'][$_POST['indexToChange']]->status = 'terminé';
        }
    }

    header('location:../admin.php');
    exit();
?>