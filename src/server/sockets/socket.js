const WebSocket = require('ws');

const postRepo = require('../db/postRepo.js');

const app = (app) => {
  const ews = require('express-ws')(app);
  const clients = ews.getWss().clients;

  app.ws('/feed', function (ws, req) {
    console.log(`Houston, we have a connection. ${clients.size} connected`);

    const posts = postRepo.getAllPosts();

    ws.send(JSON.stringify({posts: posts.reverse(), noClients: clients}));

    ws.on('message', fromClient => {
      const dto = JSON.parse(fromClient);

      if(dto.text !== "" && dto.author !== null){
        console.log(userRepo.get)
        postRepo.createPost(dto.author, dto.text);

        const postLength = postRepo.getAllPosts().length-1;
        const post = postRepo.getAllPosts()[postLength];
        distributeSomething([post])
      }
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
          posts: msg,
          noClient: clients.size
        }));
      }
    })
  };
};

module.exports = app;