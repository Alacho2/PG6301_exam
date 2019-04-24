const moment = require('moment');
const userRepo = require('../db/userRepo.js');
const posts = new Map();

let counter = 0;

function getOnePost(id) {
  return posts.get(id)
};

function createPost(author, text){

  counter = ++counter+"";

  const user = userRepo.getUserInfo(author);

  const date = moment().format('MMMM Do YYYY, h:mm:ss a');

  const post = {
    id: counter,
    writer: user,
    text: text,
    date: date,
  };

  posts.set(counter, post);
  return true;
}

function getAllPosts(){
  return Array.from(posts.values())
}

function initWithSomePosts(){
  createPost('Chef', "Dette er historien om badekaret til Pelle");
  createPost('Håvard', "Let the games begin!");
  createPost('Chef', "Finally on this social media as well!");
}

module.exports = {getOnePost, createPost, getAllPosts, initWithSomePosts};