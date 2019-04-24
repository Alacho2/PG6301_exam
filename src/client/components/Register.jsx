/*
  NOTE - File has been copied (and to some degree extended/modified) from
  course content by https://github.com/arcuri82
  https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/signup.jsx
  TODO(Håvard) - Change input to label for
*/

import React from 'react';

export class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmedPsw: "",
      birthday: "",
      country: "",
      errorMsg: null,
    }
  }

  onUserIdChange = (event) => {
    this.setState({username: event.target.value});
  };

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  };

  onConfirmChange = (event) => {
    this.setState({confirmedPsw: event.target.value})
  };


  onBirthdayChange = (event) => {
    this.setState({birthday: event.target.value})
  };

  onCountryChange = (event) => {
    this.setState({country: event.target.value})
  };

  doRegister = async () => {
    const {username, password, confirmedPsw, birthday, country} = this.state;

    if (confirmedPsw !== password) {
      this.setState({errorMsg: "You did a booboo with password"});
      return;
    }
    const url = '/api/register';

    const payload = {username: username, password: password, birthday, country};

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

    if (response.status !== 201) {
      this.setState({errorMsg: "Error when connecting to server. Status code: " + response.status});
      return;
    }
    this.setState({errorMsg: null});
    this.props.setSignIn(username);
    this.props.history.push("/");
  };


  render() {
    let error = <div/>;
    if (this.state.errorMsg !== null) {
      error = (
        <div className="errorMsg">
          <p>{this.state.errorMsg}</p>
        </div>
      );
    }

    let confirmMsg = undefined;

    if(this.state.password === ""){
      confirmMsg = null;
    } else if (this.state.confirmedPsw !== this.state.password) {
      confirmMsg = "Not matching";
    } else {
      confirmMsg = "Ok"
    }

    return (
      <div>
        <div className="signupArea">
          <div>
            <p>Name</p>
            <input
              id="username"
              type="text"
              value={this.state.username}
              onChange={this.onUserIdChange}
            />
          </div>
          <div>
            <p>Password:</p>
            <input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </div>
          <div>
            <p>Confirm:</p>
            <input
              id="confirm"
              type="password"
              value={this.state.confirmedPsw}
              onChange={this.onConfirmChange}
            />
            <div>{confirmMsg}</div>
          </div>
          <div>
            <p>Birthday:</p>
            <input
              id="birthday"
              type="text"
              value={this.state.birthday}
              onChange={this.onBirthdayChange}
            />
          </div>
          <div>
            <p>Country:</p>
            <input
              id="country"
              type="text"
              value={this.state.country}
              onChange={this.onCountryChange}
            />
          </div>

          {error}
          <div id="signupBtn" onClick={this.doRegister}>
            Sign Up
          </div>
        </div>
        <div onClick={this.props.history.goBack}>Go back</div>
      </div>
    );
  }
}

export default Register