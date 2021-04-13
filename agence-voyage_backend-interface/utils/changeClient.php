<?php
session_start();
include('./fonctions.php');

console_log($_POST['client']['name']);
if (isset($_POST['client']['name']) && $_SESSION['client']->name != $_POST['client']['name']){
    $_SESSION['client']->name = $_POST['client']['name'];
}
if (isset($_POST['client']['firstname']) && $_SESSION['client']->firstname != $_POST['client']['firstname']){
    $_SESSION['client']->firstname = $_POST['client']['firstname'];
}

header('location:../admin.php');

exit();
?>