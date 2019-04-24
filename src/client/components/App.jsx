import Chat from "./Chat.jsx";
//import Edit from "./Edit.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import NotFound from "./NotFound.jsx";
import React from 'react';
import ReactDOM from "react-dom";
import Register from "./Register.jsx";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
//import Create from "./Create";

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: null
    };
  }

  componentDidMount(){
    this.fetchUser();
  }

  fetchUser = async () => {
    if(this.state.username){
      const response = await fetch('/api/user', {
        method: 'GET',
        credentials: 'include',
      });
      if(response.status === 200){
        const payload = await response.json();
        this.setSignIn(payload.userId)
      }
    }
  };

  setSignIn = (username) => {
    this.setState({username: username})
  };

  render(){
    return (
      <div>
        <Router>
          <div>
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
              <Route exact path="/chat"
                     render={props =>
                       <Chat {...props}
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