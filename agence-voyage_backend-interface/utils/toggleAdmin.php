<?php
session_start();

$_SESSION['admin_page'] = !$_SESSION['admin_page'];

header('location:../admin.php');

exit();

?>