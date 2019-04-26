const express = require('express');
const path = require('path');
const app = express();
require('./middleware/authHandling.js')(app);
require('./middleware/profileRoutes.js')(app);
require('./middleware/postRoutes.js')(app);
require('./middleware/friendRoutes.js')(app);
require('./sockets/feed-socket.js')(app);
const postRepo = require('./db/postRepo.js');

app.use(express.static('public'));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

postRepo.initWithSomePosts();

module.exports = {app};
