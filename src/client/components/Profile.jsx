import React from 'react';
import {getProfile} from "../client-util.js";

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


  render() {
    console.log(this.state);
    const profileInfo = this.state.profile ? this.state.profile : null;
    return (
      <div>
        <h2>Profile</h2>
        {profileInfo &&
        <div>
          <p>{profileInfo.id}</p>
          <p>{profileInfo.birthday}</p>
          <p>{profileInfo.country}</p>
        </div>
        }
      </div>
    )
  }
}

export default Profile