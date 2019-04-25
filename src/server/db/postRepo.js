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

function getFriendsPost(username){
  const allPosts = getAllPosts();

  return allPosts.filter(post => {
    return post.writer.friends.includes(username);
  });
}

function getUsersOwnPost(username){
  const allPosts = getAllPosts();
  return allPosts.filter(post => {
    return post.writer.id.includes(username);
  })
}

function initWithSomePosts(){
  createPost('Chef', "Dette er historien om badekaret til Pelle");
  createPost('Håvard', "Let the games begin!");
  createPost('Chef', "Finally on this social media as well!");
}

module.exports = {
  getOnePost,
  createPost,
  getAllPosts,
  initWithSomePosts,
  getFriendsPost,
  getUsersOwnPost,
};