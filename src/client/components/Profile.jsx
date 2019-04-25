import React from 'react';
import {getProfile, askFriendship} from "../client-util.js";
import moment from 'moment';
import {Link} from "react-router-dom";

export class Profile extends React.Component {

  state = {
    id: "",
    profile: {},
    errorMsg: null,
    posts: []
  };

  componentDidMount() {
    const paramMap = new Map();
    const searchSplit = location.search.split("&");
    searchSplit.forEach(item => {
      paramMap.set(item.split("=")[0], item.split("=")[1])
    });

    const user = paramMap.get("?id");

    this.getProfile(user);

    this.openSocketFor(user);
  }

  componentWillUnmount() {
    console.log("Unmount profile");
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  getProfile = async (profileId) => {
    const res = await getProfile(profileId);
    if(res.status !== 200) {
      //window.location = "/create";
      return
    }
    const user = res.user;
    this.setState({id: user.id, profile: user})
  };

  openSocketFor = (username) => {
    this.socket = new WebSocket(
      `ws://${window.location.host}/feed?profile=${encodeURIComponent(username)}`);
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

  onPostTextChange = (event) => {
    this.setState({postText: event.target.value})
  };

  becomeFriends = async () => {
    const {profile} = this.state;
    const {username} = this.props;

    const result = await askFriendship(profile.id, username);
      this.setState({errorMsg: result.errorMsg})
    };

  createPost = () => {
    const payload = JSON.stringify({author: this.props.username, text: this.state.postText});
    this.socket.send(payload);

    this.setState({postText: ""})
  };


  render() {
    const profileInfo = this.state.profile ? this.state.profile : null;
    const loggedIn = this.props.username ? this.props.username : null;
    const errorMsg = this.state.errorMsg;
    const posts = this.state.posts ? this.state.posts : null;
    const placeholderText = `What's on your mind, ${profileInfo.id}?`;
    return (
      <div>
        <h2>Profile</h2>
        {!loggedIn ? <div>You may not view someones page without logging in</div> :
          profileInfo && <div>
            <p>{profileInfo.id}</p>
            <p>{profileInfo.birthday}</p>
            <p>{profileInfo.country}</p>
            {profileInfo.id !== loggedIn &&
            <div id="friendBtn"
                 onClick={this.becomeFriends}>Ask for friendship</div>
            }
            {errorMsg}
          </div>
        }

        {loggedIn === profileInfo.id ? <div><textarea cols="50"
                                   id="messageArea"
                                   rows="3"
                                   value={this.state.postText}
                                   placeholder={placeholderText}
                                   onChange={this.onPostTextChange} />
          <div id="btn" style={{cursor: "pointer"}} onClick={this.createPost}>Create post</div>
        </div> : null}
        {loggedIn ? posts !== null && posts.map(post => {
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
                <p>{post.text}</p>
              </div>}
            </div>
          )
        }) : null}
        <div id="backBtn" onClick={this.props.history.goBack}>Go back</div>
      </div>
    )
  }
}

export default Profile