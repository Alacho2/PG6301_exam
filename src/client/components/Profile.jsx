import React from 'react';
import {getProfile} from "../client-util.js";
import {askFriendship} from "../client-util";
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

    this.getProfile(paramMap.get("?id"));

    this.openSocketFor(paramMap.get("?id"));
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if(nextProps.username !== this.props.username){
      this.openSocketFor(nextProps.username);
    }
  }

  componentDidUnmount() {
    console.log("Unmount");
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

  becomeFriends = async () => {
    const {profile} = this.state;
    const {username} = this.props;

    const result = await askFriendship(profile.id, username);
      this.setState({errorMsg: result.errorMsg})
    };


  render() {
    const profileInfo = this.state.profile ? this.state.profile : null;
    const loggedIn = this.props.username ? this.props.username : null;
    const errorMsg = this.state.errorMsg;
    const posts = this.state.posts ? this.state.posts : null;
    return (
      <div>
        <h2>Profile</h2>
        {!loggedIn ? <div>You may not</div> :
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
                <p>{post.text}</p>
              </div>}
            </div>
          )
        })}


        <div id="backBtn" onClick={this.props.history.goBack}>Go back</div>
      </div>
    )
  }
}

export default Profile