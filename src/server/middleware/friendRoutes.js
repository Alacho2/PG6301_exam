const userRepo = require('../db/userRepo.js');

module.exports = app => {
  app.post("/api/friend", (req, res) => {
    const friendReq = req.body;
    const result = userRepo.askForFriendship(friendReq.userFrom, friendReq.userTo);
    if(!result){
      res.status(304).send() //Request already exist
    }
    res.status(201).send();

    //res.status(404).send() // Something went wrong
  });

  app.get("/api/friend/:id", (req, res) => {
    const username = req.params['id'];
    console.log(username);
    const friendRequests = userRepo.getUser(username).requestFrom;

    if(!friendRequests){
      res.status(304).send() //No available friend requests
    }
    res.status(200).json(friendRequests)
  })
};
