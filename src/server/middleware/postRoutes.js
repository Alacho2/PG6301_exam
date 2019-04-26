/*
   This file is influenced, but not explictly copied from the course content.
   https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/server/app.js
 */

const postRepo = require('../db/postRepo.js');

module.exports = app => {
  app.get("/api/posts/:id", (req, res) => {
    const id = req.params['id'];
    const user = postRepo.getOnePost(id);
    if(user){
      res.status(200).json(user);
    } else {
      res.status(404).send()
    }
  });

  app.get("/api/posts", (req, res) => {
    const posts = postRepo.getAllPosts();
    res.status(200).json(posts)
  });

  app.post("/api/posts", (req, res) => {
    const post = req.body;
    postRepo.createPost(post.author, post.text);
    res.status(201).send()
  })
};