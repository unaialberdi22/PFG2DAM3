const express = require('express')
const app = express();
const { sequelize } = require("./models/index")

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-requested-with');
  next();
});

require("./routes/paradas")(app);

app.get('/', (req, res) => {
    res.send("Hello from Express!")
  })
  app.listen(4000, () => {
    console.log('Listening on port 4000')
  })
  module.exports = app;