<?php
session_start();
$valid_id = ['bossDu14@gmail.com', password_hash('cestMoiLeBoss')];

if ($_POST['id'] == $valid_id[0] && password_hash($_POST['pswd']) == $valid_id[1]){
    $_SESSION['connect'] = true ;
    header("location:../admin.php");
} else {
    echo '<script language="javascript">';
    echo 'alert("Mauvais identifiants. Veuillez réessayer.")';
    echo '</script>';
}

exit();
?>