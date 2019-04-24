import React from 'react';

export class Login extends React.Component{

  state = {
    username: "",
    password: "",
    errorMsg: null
  };

  constructor(props){
    super(props);
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  };

  changePassword = event => {
    this.setState({password: event.target.value})
  };

  doLogin = async () => {
    const { username, password } = this.state;
    const url = "/api/login";

    const payload = { username: username, password: password };

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
      this.setState({ errorMsg: "Failed to connect to server: " + err });
      return;
    }

    if (response.status === 401) {
      this.setState({ errorMsg: "Invalid username/password" });
      return;
    }

    if (response.status !== 204) {
      this.setState({errorMsg:
          "Error when connecting to server: status code " + response.status
      });
      return;
    }

    this.setState({ errorMsg: null });
    await this.props.setSignIn(username);
    this.props.history.push("/");
  };

  render() {
    return (
    <div>
      <label htmlFor="username">Username</label>
      <input id="username"
             placeholder="Username"
             type="text"
             value={this.state.username}
             onChange={this.changeUsername}/>
      <br />
      <label htmlFor="password">Password</label>
      <input id="password"
             placeholder="Password"
             type="password"
             value={this.state.password}
             onChange={this.changePassword}/>
      {this.state.errorMsg !== null ? <div>{this.state.errorMsg}</div> : null}
      <div id="btn" onClick={this.doLogin}>Login</div>
      <div onClick={this.props.history.goBack}>Go back</div>
    </div>
    )
  }
}

export default Login