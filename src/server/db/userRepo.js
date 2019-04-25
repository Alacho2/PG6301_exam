const users = new Map();

function getUser(id){
  return users.get(id)
}

function getUserInfo(id) {
  const user = getUser(id);
  if(user){
    //delete user.password
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

function getAllUsers(){
  return Array.from(users.values());
}


function createUser(id, password, birthday, country){
  if(getUser(id) !== undefined || id === undefined){
    return false
  }

  const user = {
    id,
    password,
    birthday,
    country,
    friends: [],
    requestTo: [],
    requestFrom: [],
  };

  users.set(id, user);
  return true;
}

function askForFriendship(fromUser, toUser){
  const askedUser = getUser(toUser);
  const asker = getUser(fromUser);

  if(askedUser.requestFrom.includes(asker.id)) {
    return false;
  }

  askedUser.requestFrom.push(asker.id);
  asker.requestTo.push(askedUser.id);
  return true;
}

function friendRequestUpdate(code, fromUser, to){
  const askedUser = getUser(to);
  const asker = getUser(fromUser);

  const askedIndex = askedUser.requestFrom.findIndex(user => {
    return user === asker.id
  });

  const askIndex = asker.requestTo.findIndex(user => {
    return user === askedUser.id
  });

  if(code === 1){
    askedUser.friends.push(asker.id);
    asker.friends.push(askedUser.id);
    askedUser.requestFrom.splice(askedIndex, 1);
    asker.requestTo.splice(askIndex, 1);
    return true;
  } else {
    askedUser.requestFrom.splice(askedIndex, 1);
    asker.requestTo.splice(askIndex, 1);
    console.log(askedUser.friends, asker.friends, code);
    console.log(askedUser.requestFrom, asker.requestTo);
    return false
  }
}

function removeAllUsers(){
  if(users.size === 0){
    return false;
  } else {
    users.clear();
    return true;
  }
}

users.clear();

createUser('Chef', 'lok', "29.09.1929", "Norway");
createUser('Håvard', 'pok', "25.05.1994", "Norway");
//getUser('Chef').friends.push("Sjoko");
getUser("Chef").requestFrom.push("Håvard");
getUser("Håvard").requestTo.push("Chef");
//getUser('Håvard').friends.push("Sjoko");


module.exports = {
  getUser,
  getUserInfo,
  removeUser,
  createUser,
  removeAllUsers,
  verifyUser,
  getAllUsers,
  askForFriendship,
  friendRequestUpdate,
};
