function berekenExpertisekosten() {
  var maatschappij = document.getElementById("verzekeringsmaatschappij").value;
  var vergoeding = parseFloat(document.getElementById("vergoeding").value);

  // Haal de expertisekosten op uit het CSV-bestand voor de geselecteerde maatschappij
  fetch('verzekeringsmaatschappijen.csv')
      .then(response => response.text())
      .then(data => {
          // Verwerk de CSV-gegevens
          var rows = data.split('\n');
          var expertisekosten;
          for (var i = 1; i < rows.length; i++) { // Begin bij 1 om de koptekst over te slaan
              var columns = rows[i].split(',');
              if (columns[0] === maatschappij) {
                  expertisekosten = berekenExpertisekostenVolgensTarieven(columns.slice(1), vergoeding); // Slice om het maatschappijnaam te verwijderen
                  if (expertisekosten) {
                      document.getElementById("resultaat").innerText = "Expertisekosten bij " + maatschappij + ": " + expertisekosten.toFixed(2) + " Euro";
                  } else {
                      document.getElementById("resultaat").innerText = "Fout bij het berekenen van de expertisekosten.";
                  }
                  return;
              }
          }
          document.getElementById("resultaat").innerText = "Tarieven voor deze maatschappij niet gevonden.";
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById("resultaat").innerText = "Er is een fout opgetreden bij het verwerken van het CSV-bestand.";
      });
}

function berekenExpertisekostenVolgensTarieven(tarieven, vergoeding) {
  try {
      var minimum = parseFloat(tarieven[0]); // Minimum expertisekosten
      var maximum = parseFloat(tarieven[1]); // Maximum expertisekosten
      var expertisekosten = minimum;

      // Loop door de rest van de tarieven en thresholds en bereken de expertisekosten
      for (var i = 2; i < tarieven.length; i += 2) {
          var threshold = parseFloat(tarieven[i]);
          var rate = parseFloat(tarieven[i + 1]);

          if (vergoeding > threshold) {
              expertisekosten += (vergoeding - threshold) * rate;
          } else {
              break; // Stop de loop als de vergoeding lager is dan de huidige drempel
          }
      }

      // Toepassen van het maximum expertisekosten
      if (expertisekosten > maximum) {
          expertisekosten = maximum;
      }

      return expertisekosten;
  } catch (error) {
      console.error('Fout bij het berekenen van expertisekosten:', error);
      return null;
  }
}
