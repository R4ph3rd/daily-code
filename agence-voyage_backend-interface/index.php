<?php
session_start();

$_SESSION['client'] = (object)[
  'name' => 'sardou', 
  'firstname' => 'michel', 
  'adress' => '8 rue de ladresse',
  'city' => 'ma ville',
  'zipcode' => '44000', 
  'phone' => '0654897658'
];

if (!isset($_SESSION['client_resas'])){
  $_SESSION['client_resas'] = [
    (object)[
      'name' => 'sardou', 
      'firstname' => 'michel', 
      'adress' => '8 rue de ladresse',
      'city' => 'ma ville',
      'zipcode' => '44000', 
      'phone' => '0654897658', 
      'tickets' => '3', 
      'eventName' => 'event name', 
      'eventID' => '54e58d5ed', 
      'date' => mktime(0,0,0, date('m'), date('d') - 22, date('Y')),
      'status' => 'terminé'
    ]
    ];
}

if (!isset($_SESSION['resas'])){
  // console_log('cool');
  $_SESSION['resas'] = [
      (object)[
          'name' => 'sardou', 
          'firstname' => 'michel', 
          'adress' => '8 rue de ladresse',
          'city' => 'ma ville',
          'zipcode' => '44000', 
          'phone' => '0654897658', 
          'tickets' => '3', 
          'eventName' => 'event name', 
          'eventID' => '54e58d5ed', 
          'date' => mktime(0,0,0, date('m'), date('d') - 22, date('Y')),
          'status' => 'terminé'
      ],
      (object)[
          'name' => 'ferro', 
          'firstname' => 'angie', 
          'adress' => '12 rue de carquefou',
          'city' => 'nantes',
          'zipcode' => '44000', 
          'phone' => '0654437658', 
          'tickets' => '5', 
          'eventName' => 'super event name', 
          'eventID' => '72Bhh26ig', 
          'date' => mktime(0,0,0, date('m'), date('d') - 8, date('Y')),
          'status' => 'en cours'
      ],
      (object)[
          'name' => 'ferro', 
          'firstname' => 'angie', 
          'adress' => '12 rue de carquefou',
          'city' => 'nantes',
          'zipcode' => '44000', 
          'phone' => '0654437658', 
          'tickets' => '5', 
          'eventName' => 'super event name', 
          'eventID' => '72Bhh26ig', 
          'date' => mktime(0,0,0, date('m'), date('d') - 8, date('Y')),
          'status' => 'en cours'
      ],
      (object)[
          'name' => 'Cloaque', 
          'firstname' => 'JP', 
          'adress' => '22 avenue du chorizo',
          'city' => 'Malhakoff',
          'zipcode' => '44000', 
          'phone' => '07654231', 
          'tickets' => '2', 
          'eventName' => 'La FICELLE des chorizos', 
          'eventID' => '98N9HG6Ff', 
          'date' => mktime(0,0,0, date('m'), date('d') + 4, date('Y')),
          'status' => 'à traiter'
      ],
      (object)[
          'name' => 'Cloaque', 
          'firstname' => 'JP', 
          'adress' => '22 avenue du chorizo',
          'city' => 'Malhakoff',
          'zipcode' => '44000', 
          'phone' => '07654231', 
          'tickets' => '2', 
          'eventName' => 'La FICELLE des chorizos', 
          'eventID' => '98N9HG6Ff', 
          'date' => mktime(0,0,0, date('m'), date('d') + 4, date('Y')),
          'status' => 'à traiter'
      ],
      (object)[
          'name' => 'Cloaque', 
          'firstname' => 'JP', 
          'adress' => '22 avenue du chorizo',
          'city' => 'Malhakoff',
          'zipcode' => '44000', 
          'phone' => '07654231', 
          'tickets' => '2', 
          'eventName' => 'La FICELLE des chorizos', 
          'eventID' => '98N9HG6Ff', 
          'date' => mktime(0,0,0, date('m'), date('d') + 4, date('Y')),
          'status' => 'à traiter'
      ]
  ];

  array_merge($_SESSION['resas']);
}

function createEventForm($event){
  echo '<form action="utils/addEvent.php" method="POST">
  <div>
    <input type="text" value="'.$event['name'].'" name="event[eventName]" hidden>
    <input type="text" value="'.$event['id'].'" name="event[eventID]" hidden>
    <input type="text" value="en cours" name="event[status]" hidden>
    <input type="number" class="quantity" name="event[quantity]" value="0">
    <label for="quantity">Places</label>
  </div>
  <button type="submit">Ajouter au panier</button>
</form>';
}

?>

<!DOCTYPE html>
<html>

<head>
  <title>Touristo - Tickets</title>
  <link rel="stylesheet" type="text/css" href="/index.css">
</head>

<body>

  <main>

    <section class="cover">
      <!-- -------------- -->
      <!-- nav -->
      <!-- -------------- -->
      <?php include('./components/navbar.php'); ?>

      <!-- -------------- -->
      <!-- header -->
      <!-- -------------- -->

      <header>
        <small>Événements</small>
        <h1>Touristo & Co</h1>


        <!-- -------------- -->
        <!-- left column aside -->
        <!-- -------------- -->

        <aside class="left-column">
          <span>Touristo présente</span>
        </aside>

        <!-- -------------- -->
        <!-- right column aside -->
        <!-- -------------- -->

        <aside class="right-column">
          <a href="#">
            <img src="/assets/images/facebook.svg" alt="">
          </a>
          <a href="#">
            <img src="/assets/images/twitter.svg" alt="">
          </a>
          <a href="#">
            <img src="/assets/images/instagram.svg" alt="">
          </a>
          <a href="#">
            <img src="/assets/images/rss.svg" alt="">
          </a>
        </aside>

      </header>
    </section>


    <section class="page">

      <!-- -------------- -->
      <!-- section -->
      <!-- -------------- -->

      <div class="article featured">
        <span>Featured</span>
        <div class="image">
          <img src="/events/final/mystere-caen.jpg" alt="">
        </div>
        <div class="contents">
          <h3>Petits Mystères dans Caen</h3>
          <p>Découvrez le côté obscur de Caen ! Une visite insolite retraçant les histoires glaçantes de maisons
            hantées, de légendes urbaines et d'événements tragiques ayant eu lieu dans notre magnifique centre-ville de
            Caen.</p>
          <div class="separator"></div>
          <small>Tous les mardis à partir de 14h - durée: 1h30 - 14 euros par personne.</small>
          <?php
            $e = [
              'name' => 'Petits Mystères dans Caen',
              'id' => 'e5477ed4'
            ];

            createEventForm($e);
          ?>
        </div>
      </div>

      <div class="container">

        <div class="articles">

          <article class="article left">
            <div class="article-inner">
              <img src="/events/final/gourmandhises.jpg" alt="">
              <h3>L'atelier Gourm'Handi'Ses, ses chocolats et biscuits</h3>
              <p>Vous connaissez peut-être la boutique Gourm’handi'ses située rue de la fontaine à Caen. Cette visite
                sera
                l'occasion de découvrir comment sont confectionnés les chocolats et biscuits par l'Etablissement de
                Service
                et d’Aide par le Travail de Colombelles, quelles sont les spécificités d'une entreprise solidiaire</p>
              <div class="separator"></div>
              <small>Tous les jeudis à partir de 10h - durée: 45mn - 7 euros par personne.</small>
              <?php
                $e = [
                  'name' => "L'atelier Gourm'Handi'Ses, ses chocolats et biscuits",
                  'id' => 'azeza247qa'
                ];

                createEventForm($e);
              ?>
            </div>
          </article>

          <article class="article right">
            <div class="article-inner">
              <img src="/events/final/charlotte-corday.jpg" alt="">
              <h3>Dans les pas de Charlotte Corday</h3>
              <p>Un itinéraire en ville dans le sillage de Charlotte Corday, l’occasion de retracer la trajectoire de
                celle
                que Lamartine surnommait « l’ange de l’assassinat » et de retraverser quelques-uns des grands épisodes
                révolutionnaires qui se sont déroulés à Caen.</p>
              <div class="separator"></div>
              <small>Tous les jeudis à partir de 10h - durée: 2h30 - 7 euros par personne.</small>
              <?php
                $e = [
                  'name' => "Dans les pas de Charlotte Corday",
                  'id' => '564zed8z56jk'
                ];

                createEventForm($e);
              ?>
            </div>
          </article>

          <article class="article left">
            <div class="article-inner">
              <img src="/events/final/cuisine.jpg" alt="">
              <h3>Démonstration de cuisine au restaurant Riva-Bella-Thalazur</h3>
              <p>Ce rendez-vous sera l’occasion de rencontrer le Chef Patrick Durant au parcours très riche qui vous
                fera
                partager son amour de la cuisine à travers l’exécution d’une recette de son secret. Ce sera également
                l’occasion d’évoquer les fondamentaux de sa cuisine à savoir les « Cinq S »: des produits de Saison
                pleins
                de Saveur, issus de Situations géographiques exceptionnelles, cuisinés Sainement avec Simplicité.</p>
              <div class="separator"></div>
              <small>Tous les lundis à partir de 20h - durée: 1h00 - 45 euros par personne.</small>
              <?php
                $e = [
                  'name' => "Démonstration de cuisine au restaurant Riva-Bella-Thalazur",
                  'id' => '5qs8e5Kh'
                ];

                createEventForm($e);
              ?>
            </div>
          </article>

          <article class="article right">
            <div class="article-inner">
              <img src="/events/final/vaugueux.jpg" alt="">
              <h3>Le Vaugueux et la montagne du Sépulcre</h3>
              <p>Sise au pied de quatre collines, la ville de Caen s’étale dans la basse vallée de l’Orne. Les collines
                s’appelaient montagnes ou monts fort couramment au Moyen-Âge. Le faubourg du Vaugueux, bien caché,
                n’est
                pas ignoré des touristes ; c’est en quelque sorte notre place du Tertre.</p>
              <div class="separator"></div>
              <small>De juin à septembre, les mercredis à partir de 14h - durée: 1h00 - 5 euros par personne.</small>
              <?php
                $e = [
                  'name' => "Le Vaugueux et la montagne du Sépulcre",
                  'id' => 'zer7qs82q1qs'
                ];

                createEventForm($e);
              ?>
            </div>
          </article>

        </div>

      </div>

    </section>

  </main>

  <footer>
    <p>Touristo - 2018</p>
  </footer>

</body>
<script src="./connect.js"></script>
<script>
let submits = document.querySelectorAll('button')

Array.from(submits).forEach(btn => {
  btn.addEventListener('click', function(e){
    if (Array.from(btn.parentElement.children[0].children).find(child => child.name == 'event[quantity]').value == 0){
      alert('Veuillez définir un nombre de tickets');

      e.preventDefault();
    }
  })
})
</script>
</html>