<?php
session_start();
?>

<nav>
        <ul>
          <li class="<?php echo $_SERVER[REQUEST_URI] == '/workshops.php' ? 'active' : ''; ?>">
            <a href="">Workshops</a>
          </li>
          <li class="<?php echo $_SERVER[REQUEST_URI] == '/index.php' ? 'active' : ''; ?>">
            <a href="index.php">Événements</a>
          </li>
          <li class="<?php echo $_SERVER[REQUEST_URI] == '/cart.php' ? 'active' : ''; ?>">
            <a href="cart.php">
              <span>Panier</span>
              <?php 
              if(count($_SESSION['client_resas']) > 0){
                echo '<i>'.count($_SESSION['client_resas']).'</i>';
              }
              ?>
            </a>
          </li>
          <li style="position:absolute; right:24px;">
          <?php 
            if( !$_SESSION['connect']){
              echo '<a href="#" id="connectme">Se connecter</a>
              <dialog id="connect_dialog">
              <form action="utils/connection.php" method="POST" >
                <!-- <label for="id">Enter your nickname</label> -->
                <input type="text" name="id" id="id" placeholder="Micheldu31...">

                <!-- <label for="pswd">Enter your password</label> -->
                <input type="password" name="pswd" id="pswd" placeholder="Mon motdepasse...z">

                <input type="submit" value="Me connecter">
              </form>
            </dialog>';
            } else {
                if ($_SERVER[REQUEST_URI] == '/admin.php'){
                    echo '<a href="utils/disconnect.php">Se déconnecter</a>';
                } else {
                    echo '<a href="admin.php">Acceder à mon espace</a>';
                }
            }
            ?>
          </li>
        </ul>
      </nav>