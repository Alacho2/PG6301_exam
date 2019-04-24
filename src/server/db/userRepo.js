const users = new Map();

function getUser(id){
  return users.get(id)
}

function getUserInfo(id) {
  const user = getUser(id);
  if(user){
    user.password = null;
  }
  return user;
}

function removeUser(id) {
  users.forEach(user => {
    if(user.id === id){
      users.delete(id);
      return true;
    }
  });
  return false
}

function verifyUser(id, password){
  const user = getUser(id);
  return getUser(id) === undefined ? false : user.password === password
}

function createUser(id, password, birthday, country){
  if(getUser(id) !== undefined || id === undefined){
    return false
  }

  const user = {
    id,
    password,
    birthday,
    country
  };

  users.set(id, user);
  return true;
}

function removeAllUsers(){
  if(users.size === 0){
    return "Users are already empty";
  } else {
    users.clear();
    return "Deleted all users";
  }
}

//TODO(Håvard) Perhaps
/*function updateUser(id, password, name){
  users.forEach(user => {
    //Yet to be implemented
  })
} */

//users.clear();
console.log("user was cleared");

module.exports = {getUser, getUserInfo, removeUser, createUser, removeAllUsers, verifyUser};