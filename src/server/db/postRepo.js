const moment = require('moment');
const posts = new Map();

let counter = 0;

getOnePost = (id) => {
  return posts.get(id)
};

function createPost(author, text){

  counter = ++counter+"";

  const date = moment().format('MMMM Do YYYY, h:mm:ss a');

  const post = {
    id: counter,
    author: author,
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
  createPost("Håvard", "Dette er historien om badekaret til Pelle");
  createPost("Andrea", "The point is");
  createPost("Andrea", "Never TRUST user input");
}

initWithSomePosts();

module.exports = {getOnePost, createPost, getAllPosts};