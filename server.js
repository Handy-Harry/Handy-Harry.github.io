const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/save', (req, res) => {
  const { name, age } = req.body;
  const data = `${name},${age}\n`;

  fs.appendFile('persons.csv', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error saving person' });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
