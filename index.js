const express = require('express')
const app = express()
const path = require('path')
const db = require('./models/db.js')

app.set('view engine', 'jade');

app.use(express.static('public'));

require('./controllers/routes.js')(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Stock watcher listening in port 3000')
});