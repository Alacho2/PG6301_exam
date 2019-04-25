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

  respondReq = async (code, respondTo) => {


    const url =`/api/friend/${respondTo}`;

    const payload = {
      code: code,
      respondTo: respondTo,
      respondFrom: this.props.username
    };

    let response;
    try {
      response = await fetch(url, {
        method: "put",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })
    } catch(err) {
      return false
    }
    return response.status === 204
  };

  render() {
    const requests = this.state.requests;
    console.log(requests);

    return (
      <div>{requests && requests.map((request, index) => {
        return (
          <div key={index}>
            <div className="container border-bottom">
              <div className="row">
                <div className="col-sm-12">
                  <Link to={`/profile?id=${request}`}>{request}</Link>
                </div>
                <div className="col-sm-6 text-primary">
                  <div id="acceptBtn"
                       style={{cursor: "pointer"}}
                       onClick={() => {this.respondReq(1, request)}}>Accept</div>
                </div>
                <div className="col-sm-6 mb-lg-3 text-warning">
                  <div id="rejectBtn"
                       style={{cursor: "pointer"}}
                       onClick={() => {this.respondReq(0, request)}}>Reject</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}</div>
    )
  }
}

export default FriendRequests