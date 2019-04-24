/*
  NOTE - File has been copied (and to some degree extended/modified) from
  course content by https://github.com/arcuri82
  https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/server/routes.js
*/

const express = require('express');
const router = express.Router();
const passport = require('passport');
const userRepo = require('../db/userRepo.js');

  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(204).send();
  });

  router.post('/register', (req, res) => {
    const {username, password, birthday, country} = req.body;

    const created = userRepo.createUser(username, password, birthday, country);

    if(!created) {
      res.status(400).send();
      return;
    }

    passport.authenticate('local')(req, res, () => {
      req.session.save(err => {
        if(err) {
          res.status(500).send()
        } else {
          res.status(201).send()
        }
      })
    })
  });

  router.post('/logout', (req, res) => {
    req.logout();
    res.status(204).send()
  });

  router.get("/user", (req, res) => {
    if(req.user){
      res.json({
        userId: req.user.id,
      });
      return
    }
    res.status(401).send()
  });


module.exports = router;