import React from 'react';
import {Link} from "react-router-dom";

export class FriendRequests extends React.Component {

  state = {
    requests: [],
  };

  componentDidMount() {
    const user = this.props.username;
    this.getFriendRequests(user);
  }
  getFriendRequests = async (username) => {
    const url = `api/friend/${username}`;

    try {
      const response = await fetch(url,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json"
          },
        });
    const result = await response.json();
    this.setState({requests: result});
    } catch (err) {
      this.setState({errorMsg: "Failed to connect " + err});
    }
  };

  /*
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
   */



  render() {
    const requests = this.state.requests;

    return (
      <div>{requests && requests.map((request, index) => {
        return (
          <div key={index}>
            <Link to={`/profile?id=${request}`}>{request}</Link>
          </div>
        )
      })}</div>
    )
  }
}

export default FriendRequests