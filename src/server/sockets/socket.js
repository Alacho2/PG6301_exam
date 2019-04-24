const WebSocket = require('ws');

const postRepo = require('../db/postRepo.js');

const app = (app) => {
  const ews = require('express-ws')(app);
  const clients = ews.getWss().clients;

  app.ws('/', function (ws, req) {
    console.log(`Houston, we have a connection. ${clients.size} connected`);

    const posts = postRepo.getAllPosts();

    ws.send(JSON.stringify(posts));

    ws.on('message', fromClient => {

      const dto = JSON.parse(fromClient);
      const createPost = postRepo.createPost(dto.author, dto.text);
      distributeSomething(postRepo.getAllPosts())
    });

    /*ws.send(JSON.stringify({messages: messages, noClient: clients.size}));

    distributeSomething([]);

    ws.on('message', fromClient => {

      const dto = JSON.parse(fromClient);
      const id = counter++;
      const msg = {id: id, author: dto.author, text: dto.text};

      messages.push(msg);

      distributeSomething([msg])
    });

    ws.on('close', () => {
      distributeSomething([]);
      console.log(`Houston, we lost a connection. ${clients.size} connected`);
    });
  });
*/
  });

  const distributeSomething = (msg) => {
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          messages: msg,
          noClient: clients.size
        }));
      }
    })
  };
};

module.exports = app;