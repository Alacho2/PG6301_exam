const express = require('express');
const path = require('path');
const app = express();
require('./middleware/authHandling.js')(app);
//require('./middleware/menuHandling.js')(app);
require('./middleware/profileHandling.js')(app);
require('./middleware/postHandling.js')(app);
require('./sockets/socket.js')(app);

app.use(express.static('public'));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {app};
