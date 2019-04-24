const userRepo = require('../db/userRepo.js');

module.exports = app => {
  app.get("/api/profile/:id", (req, res) => {
    const id = req.params['id'];
    const user = userRepo.getUserInfo(id);
    if(user){
      res.status(200).json(user);
    } else {
      res.status(404).send()
    }
  });
};