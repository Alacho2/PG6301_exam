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

export {getProfile, getPost}