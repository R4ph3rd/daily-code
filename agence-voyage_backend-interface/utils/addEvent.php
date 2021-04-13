<?php
session_start();

include('./fonctions.php');

console_log($_POST['event']);

if($_POST['event']){
    array_push($_SESSION['client_resas'], (object)[
        $_POST['event']
    ]);
    array_push($_SESSION['resas'], (object)[
        $_SESSION['client'],
        "eventName"=>$_POST['event']['name'],
        "eventID"=>$_POST['event']['id'],
        "tickets" => $_POST['event']['quantity']
    ]);
}

header('location:../index.php');
exit();
?>