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
  })
};