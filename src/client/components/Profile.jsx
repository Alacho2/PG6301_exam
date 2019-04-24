import React from 'react';
import {getProfile} from "../client-util.js";
import {Link} from "react-router-dom";

export class Profile extends React.Component {

  state = {
    id: "",
    profile: {},
    errorMsg: null,
  };

  componentDidMount() {
    const paramMap = new Map();
    const searchSplit = location.search.split("&");
    searchSplit.forEach(item => {
      paramMap.set(item.split("=")[0], item.split("=")[1])
    });

    this.getProfile(paramMap.get("?id"))
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

  becomeFriends = async () => {
    const {profile} = this.state;
    const {username} = this.props;

    const url = '/api/friend';

    const payload = {userFrom: username, userTo: profile.id};

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
      this.setState({errorMsg: "Failed to connect " + err});
      return;
    }
    if (response.status === 400) {
      this.setState({errorMsg: "Invalid username/password"});
      return;
    }

    if(response.status === 304){
      this.setState({errorMsg: "Already got a request"})
    }

    if (response.status !== 201) {
      this.setState({errorMsg: "Error when connecting to server. Status code: " + response.status});
      return;
    }
    this.setState({errorMsg: "Request sent"});
    };


  render() {
    console.log(this.state.profile);
    const profileInfo = this.state.profile ? this.state.profile : null;
    const loggedIn = this.props.username ? this.props.username : null;
    const errorMsg = this.state.errorMsg;
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
        <div id="backBtn" onClick={this.props.history.goBack}>Go back</div>
      </div>
    )
  }
}

export default Profile