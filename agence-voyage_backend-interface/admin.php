<?php
session_start();
include('./utils/fonctions.php');
//$_SESSION['connect'] = false ;

if (!isset($_SESSION['admin_page'])){
  $_SESSION['admin_page'] = false;
}

if (!isset($_SESSION['client'])){
  $_SESSION['client'] = (object)[
    firstname => 'hugo',
    name => 'boss',
    mail=>'bossDu14@gmail.com',
    password=>'cestMoiLeBoss'
  ];
}

console_log($_SESSION['client']);
?>

<!DOCTYPE html>
<html>

<head>
  <title>Touristo - Panier</title>
  <link rel="stylesheet" type="text/css" href="/index.css">
  <link rel="stylesheet" type="text/css" href="/admin.css">
</head>

<body>

  <main>

    <section class="cover cart">
      <!-- -------------- -->
      <!-- nav -->
      <!-- -------------- -->
      <?php include('./components/navbar.php'); ?>

      <!-- -------------- -->
      <!-- header -->
      <!-- -------------- -->

      <header>
        <small>Espace d'administration</small>
        <h1>Votre espace</h1>
      </header>
    </section>


    <section class="page">

    <span class="tab">
      <a <?php if($_SESSION['admin_page']) echo 'href="./utils/toggleAdmin.php" class="inactiveTab"' ?>>Accueil</a>
      <a <?php if(!$_SESSION['admin_page']) echo 'href="./utils/toggleAdmin.php" class="inactiveTab"' ?>>Client</a>
    </span>

      <?php if ($_SESSION['admin_page']){
        include('./components/client.php');
      } else {
        include('./components/home.php');
      }

      ?>

    </section>


  </main>

  <footer>
    <p>Touristo - 2018</p>
  </footer>

</body>
<script src="./connect.js"></script>
</html>