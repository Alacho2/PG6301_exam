const userRepo = require('../db/userRepo.js');

module.exports = app => {
  app.post("/api/friend", (req, res) => {
    const friendReq = req.body;
    const result = userRepo.askForFriendship(friendReq.userFrom, friendReq.userTo);
    if(!result){
      return res.status(304).send() //Request already exist
    } else {
      return res.status(201).send();
    }

  });

  app.get("/api/friend/:id", (req, res) => {
    const username = req.params['id'];
    const friendRequests = userRepo.getUser(username).requestFrom;


    if(!friendRequests){
      return res.status(304).send();//No available friend requests
    } else {
      return res.status(200).json(friendRequests);
    }
  });

  app.put("/api/friend/:code", (req, res) => {
    const {code, respondTo, respondFrom} = req.body;
    const updated = userRepo.friendRequestUpdate(code, respondTo, respondFrom);
    if (!updated) {
      res.status(304).send(); //Update didn't go through
    } else {
      res.status(204).send();
    }

  })
};
