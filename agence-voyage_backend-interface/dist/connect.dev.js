"use strict";

var favDialog = document.getElementById('connect_dialog');
var updateButton = document.getElementById('connectme');

if (typeof favDialog.showModal != "function") {
  favDialog.style.display = "none";
}

updateButton.addEventListener('click', function onOpen() {
  console.log('open connect', favDialog);

  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    favDialog.style.display = "block";
    console.error("L'API dialog n'est pas prise en charge par votre navigateur");
  }
});