// script.js

$(document).ready(function(){
    var personen = {
      "Naam 1": { geslacht: "Man", lengte: "180cm", haarkleur: "Bruin" },
      "Naam 2": { geslacht: "Vrouw", lengte: "165cm", haarkleur: "Blond" },
      // Voeg hier de informatie toe voor elke persoon in de klas
    };
    var select = $('#personen');
    var persoonInfo = $('#persoonInfo');
  
    // Wanneer een persoon wordt geselecteerd, update de informatie
    select.change(function(){
      var gekozenNaam = $(this).val();
      var gekozenPersoon = personen[gekozenNaam];
      var informatieHTML = '<p>Geslacht: ' + gekozenPersoon.geslacht + '</p>' +
                           '<p>Lengte: ' + gekozenPersoon.lengte + '</p>' +
                           '<p>Haarkleur: ' + gekozenPersoon.haarkleur + '</p>';
      persoonInfo.html(informatieHTML);
    });
  });
  