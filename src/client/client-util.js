const getProfile = async (id) => {
  const url = `/api/profile/${id}`;
  try {
    const response = await fetch(url,
      {
        method: 'get',
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const result = await response.json();
    return {user: result, status: response.status}
  } catch (error) {
    return {errorMsg: error}
  }
};

const getPost = async (id) => {
  const url = `/api/posts/${id}`;
  try {
    const response = await fetch(url,
      {
        method: 'get',
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const result = await response.json();
    return {post: result, status: response.status}
  } catch (error) {
    return {errorMsg: error}
  }
};

const askFriendship = async (userTo, userFrom) => {
  const url = '/api/friend';

  const payload = {userFrom: userFrom, userTo: userTo};

  let response;
  try {
    response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.log(err);
    return {errorMsg: "Failed to connect " + err};

  }

  if (response.status === 400) {
    return {errorMsg: "Invalid username/password"};
  }

  if(response.status === 304){
    return {errorMsg: "You've already done that"};

  }

  if (response.status !== 201) {
    return {errorMsg: "Error when connecting to server. Status code: " + response.status};

  }
  return {errorMsg: "Request sent"};
};

export {getProfile, getPost, askFriendship}