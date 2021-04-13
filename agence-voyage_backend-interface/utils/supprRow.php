<?php
    include('./fonctions.php');
    session_start();
    echo $_POST['indexToSuppr'];
    
    if (isset($_SESSION['resas']) && isset($_POST['indexToSuppr'])){
        unset($_SESSION['resas'][$_POST['indexToSuppr']]);
    }

    header('location:../admin.php');
    exit();
?>