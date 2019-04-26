import Home from "./Home.jsx";
import Login from "./Login.jsx";
import NotFound from "./NotFound.jsx";
import React from 'react';
import ReactDOM from "react-dom";
import Register from "./Register.jsx";
import {
  BrowserRouter as Router, Link,
  Route,
  Switch
} from "react-router-dom";
import Profile from "./Profile.jsx";
import SearchBar from "./SearchBar";

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: null
    };
  }

  componentDidMount(){
    this.getUser();
  }

  getUser = async () => {
      const response = await fetch('/api/user', {
        method: 'GET',
        credentials: 'include',
      });
      if(response.status === 200){
        const payload = await response.json();
        this.setSignIn(payload.userId)
      }
  };

  setSignIn = (username) => {
    this.setState({username: username})
  };

  render(){
    const loggedIn = this.state.username ? this.state.username : null;
    return (
      <div>
        <Router>
          <div>
          <div className="container">
            <div className="row">
              <div className="col-sm-4"> {loggedIn ?
                <p>Hallo <Link to={"/"}>{loggedIn}</Link></p> : "Welcome to Exambook"}
              </div>
              <div className="col-sm-4">
                {loggedIn && <SearchBar />}
              </div>
              <div className="col-sm-4">
                {!loggedIn && <Link to="/login" className="mr-5">Login</Link>}
                {!loggedIn && <Link to="/register">Register</Link> }
              </div>
            </div>
          </div>
            <Switch>
              <Route path="/login"
                     exact={true}
                     render={props =>
                       <Login {...props}
                         username={this.state.username}
                         setSignIn={this.setSignIn}/>}/>
              <Route exact path="/register"
                     render={props =>
                       <Register {...props}
                         username={this.state.username}
                         setSignIn={this.setSignIn}/>}/>
              <Route exact path="/profile"
                     render={props =>
                       <Profile {...props}
                                 username={this.state.username}
                                 setSignIn={this.setSignIn}/>}/>
              <Route path="/"
                     exact={true}
                     render={props =>
                       <Home {...props}
                             username={this.state.username}
                             setSignIn={this.setSignIn}/>}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>

      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));