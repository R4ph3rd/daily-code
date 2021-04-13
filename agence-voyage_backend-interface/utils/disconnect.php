<?php
session_start();

$_SESSION['connect'] = false ;
$_SESSION['resas'] = null;
$_SESSION['client'] = (object)[
    firstname => 'hugo',
    name => 'boss',
    mail=>'bossDu14@gmail.com',
    password=>'cestMoiLeBoss'
  ];
header("location:../index.php");
exit();
?>