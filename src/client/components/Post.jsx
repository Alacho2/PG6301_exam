import React from 'react';
import {getPost} from '../client-util.js';
import moment from "moment";

const paramMap = new Map();

export class Post extends React.Component {

  state = {
    id: "",
    post: {},
  };

  componentDidMount() {
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
    this.setState({id: res.id, post: res.post})
  };

  render() {
    const post = this.state.post;
    const ago = post.date ? moment(post.date, 'MMMM Do YYYY, h:mm:ss a').fromNow() : null;
    return (
      <div>
        {post && <div>
          <h2>Post</h2>
          <h5>{post.author}</h5>
          <p>{ago}</p>
          <p>{post.text}</p>
        </div>}
      </div>
    )
  }
}

export default Post