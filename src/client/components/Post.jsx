import React from 'react';
import {getPost} from '../client-util.js';
import {getProfile} from "../client-util";

export class Post extends React.Component {

  state = {
    id: "",
    post: {},
  };

  componentDidMount() {
    const paramMap = new Map();
    const searchSplit = location.search.split("&");
    searchSplit.forEach(item => {
      paramMap.set(item.split("=")[0], item.split("=")[1])
    });

    this.getPost(paramMap.get("?id"))
  }

  getPost = async (postId) => {
    const res = await getPost(postId);
    if(res.status !== 200) {
      //window.location = "/create";
      return
    }
    this.setState({id: res.id, post: res})
  };

  render() {
    return (
      <div>
        <h2>Posts</h2>
      </div>
    )
  }
}

export default Post