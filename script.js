// Functie om de expertisekosten te berekenen volgens de tarieven
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
     
