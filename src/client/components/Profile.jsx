import React from 'react';
import {getProfile} from "../client-util.js";
import {Link} from "react-router-dom";

export class Profile extends React.Component {

  state = {
    id: "",
    profile: {}
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

  becomeFriends = () => {

    //Vi skal fetche post til et end-point, som tar med fromUser og toUser
    //og legger til venneforespørselen på det arrayet
    //For å hente skal vi bruke websockets

  };


  render() {
    console.log(this.props.username);
    const profileInfo = this.state.profile ? this.state.profile : null;
    const loggedIn = this.props.username ? this.props.username : null;
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
          </div>
        }
        <div id="backBtn" onClick={this.props.history.goBack}>Go back</div>
      </div>
    )
  }
}

export default Profile