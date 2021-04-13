<?php
session_start();
//$_SESSION['connect'] = false ;
?>

<!DOCTYPE html>
<html>

<head>
  <title>Touristo - Panier</title>
  <link rel="stylesheet" type="text/css" href="/index.css">
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
        <small>Événements</small>
        <h1>Votre panier</h1>
      </header>
    </section>


    <section class="page cart">

      <!-- -------------- -->
      <!-- section -->
      <!-- -------------- -->

      <!-- no product in cart -->
      <div class="cart-empty" style="display: none">Votre panier est vide</div>

      <!-- product(s) in cart -->
      <table class="cart-products">
        <thead>
          <tr>
            <th>Nom de l'évènement</th>
            <th>Nombre de tickets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mon évènement 1</td>
            <td>3 tickets</td>
            <td>
              <div class="action">
                <form action="">
                    <input type="number" value="0"><small>places</small>
                    <button type="button">Mettre à jour</button>
                </form>
              </div>
              <div class="action">
                <button type="button" class="red">Supprimer</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Mon évènement 1</td>
            <td>3 tickets</td>
            <td>
              <div class="action">
                <form action="">
                    <input type="number" value="0"><small>places</small>
                    <button type="button">Mettre à jour</button>
                </form>
              </div>
              <div class="action">
                <button type="button" class="red">Supprimer</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="cart-validation">
        <button class="btn-validate" type="button">Valider et réserver</button>
      </div>

      <div class="cart-address-form">
        <!-- form here - no design applied -->
      </div>

    </section>

  </main>

  <footer>
    <p>Touristo - 2018</p>
  </footer>

</body>
<script src="./connect.js"></script>
</html>