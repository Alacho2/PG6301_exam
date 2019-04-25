/*
  NOTE - File has been created based upon websockets lecture from
  course content by https://github.com/arcuri82
  https://github.com/arcuri82/web_development_and_api_design/blob/master/les09/chat/websocket-rest/src/client/home.jsx
  TODO(Håvard) - Change input to label for
*/

import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import Linkify from "react-linkify";
import {FriendRequests} from "./FriendRequests.jsx";

export class Home extends React.Component {

  state = {
    postText: "",
    posts: null,
    errorMsg: null,
  };

  componentDidMount(){
    //console.log(this.props.username, "Did mount");
      this.openSocketFor(this.props.username);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if(nextProps.username !== this.props.username){
      this.openSocketFor(nextProps.username);
    }
  }
//
  openSocketFor = (username) => {
    this.socket = new WebSocket(
      `ws://${window.location.host}/feed?id=${encodeURIComponent(username)}`);
    this.socket.onmessage = ( event => {
      const resp = JSON.parse(event.data);
      this.setState(prev => {
        if(prev.posts === null){
          return {posts: resp.posts}
        } else {
          return {posts: [...resp.posts, ...prev.posts]}
        }
      })
    });
  };

  //Close the socket so we don't trigger state render on unmounted component
  componentWillUnmount() {
    console.log("UNmount");
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  createPost = () => {
    const payload = JSON.stringify({author: this.props.username, text: this.state.postText});
    this.socket.send(payload);

    this.setState({postText: ""})
  };

  onPostTextChange = (event) => {
    this.setState({postText: event.target.value})
  };

  render() {
    const loggedIn = this.props.username ? this.props.username : null;
    const placeholderText = `What's on your mind, ${loggedIn}?`;
    const posts = this.state.posts ? this.state.posts : null;
    return (
      <div>
        <div className="container p-xl-5">
          <div className="row">
            <div className="col-sm-3 align-self-center" />
            <div className="col-sm-6 align-self-center">
              {loggedIn ? <div><textarea cols="50"
                          id="messageArea"
                          rows="3"
                          value={this.state.postText}
                          placeholder={placeholderText}
                          onChange={this.onPostTextChange} />
                <div id="btn" style={{cursor: "pointer"}} onClick={this.createPost}>Create post</div>
              </div> : <p className="text-center">Please log in to be a part of this thing</p>}
            </div>
            <div className="col-sm-3 align-self-center" />

            <div className="col-sm-1 align-self-center" />
            <div className="col-sm-7 align-self-center">
            {posts !== null && posts.map(post => {
              const ago = post.date ? moment(post.date, 'MMMM Do YYYY, h:mm:ss a').fromNow() : null;
              const writer = post.writer;
              return (
                <div key={post.id} className="border-bottom mt-3">
                  {post && <div>
                    <h5><Link to={`/profile?id=${writer.id}`} >{writer.id}</Link>
                      <span style={{
                        fontSize: "14px",
                        float: "right"}}>{ago}
                      </span>
                    </h5>
                    <Linkify>{post.text}</Linkify>
                  </div>}
                </div>
              )
            })}
            </div>
            <div className="col-sm-3 align-self-center">
              <FriendRequests username={loggedIn}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home