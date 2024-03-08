<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expertisekosten Calculator</title>
</head>
<body>

    <div>
        <h1>Expertisekosten Calculator</h1>

        <label for="verzekeringsmaatschappij">Verzekeringsmaatschappij:</label>
        <select id="verzekeringsmaatschappij"></select>

        <label for="schadevergoeding">Bedrag van de schadevergoeding:</label>
        <input type="text" id="schadevergoeding" placeholder="Bedrag in Euro" oninput="this.value = this.value.replace(/[^0-9.]/g, '');">

        <button onclick="berekenExpertisekosten()">Bereken Expertisekosten</button>

        <p id="resultaat"></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
