// Functie om de expertisekosten te berekenen volgens de tarieven
function berekenExpertisekostenVolgensTarieven(tarieven, schadevergoeding) {
  try {
      var minimum = parseFloat(tarieven[0]); // Minimum expertisekosten
      var expertisekosten = minimum;

      // De eerste drempel en het bijbehorende tarief
      var threshold1 = parseFloat(tarieven[1]);
      var rate1 = parseFloat(tarieven[2]);

      // Bereken de kosten voor het bedrag tot aan de eerste drempel
      if (schadevergoeding > threshold1) {
          expertisekosten += (threshold1 - 0) * rate1; // Kosten tot de eerste drempel
      } else {
          expertisekosten += (schadevergoeding - 0) * rate1; // Kosten voor volledige schadevergoeding
          return expertisekosten;
      }

      // Loop door de rest van de tarieven en thresholds en bereken de expertisekosten
      for (var i = 3; i < tarieven.length; i += 2) {
          var threshold = parseFloat(tarieven[i]);
          var rate = parseFloat(tarieven[i + 1]);

          if (schadevergoeding > threshold) {
              expertisekosten += (schadevergoeding - threshold) * rate;
          } else {
              break; // Stop de loop als de schadevergoeding lager is dan de huidige drempel
          }
      }

      return expertisekosten;
  } catch (error) {
      console.error('Fout bij het berekenen van expertisekosten:', error);
      return null;
  }
}

// Haal de maatschappijnamen op uit het CSV-bestand en laad ze in het pulldown-menu
fetch('verzekeringsmaatschappijen.csv')
  .then(response => response.text())
  .then(data => {
      var rows = data.trim().split('\n').slice(1); // Sla de eerste rij over (kopregel)
      var companies = rows.map(row => row.split(',')[0]); // Extracteer de maatschappijnamen
      var options = companies.map(company => `<option value="${company}">${company}</option>`);
      document.getElementById('verzekeringsmaatschappij').innerHTML = options.join('');
  })
  .catch(error => console.error('Error:', error));

// Functie om de expertisekosten te berekenen
function berekenExpertisekosten() {
  var maatschappij = document.getElementById("verzekeringsmaatschappij").value;
  var schadevergoeding = parseFloat(document.getElementById("schadevergoeding").value);

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
                  expertisekosten = berekenExpertisekostenVolgensTarieven(columns.slice(1), schadevergoeding); // Slice om het maatschappijnaam te verwijderen
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
