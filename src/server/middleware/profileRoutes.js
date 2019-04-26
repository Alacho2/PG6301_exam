/*
   This file is influenced, but not explictly copied from the course content.
   https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/server/app.js
 */

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