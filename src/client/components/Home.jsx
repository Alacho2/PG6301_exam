import React from 'react';
import {Link} from "react-router-dom";

export class Home extends React.Component {

  state = {
    postText: "",
    errorMsg: null
  };

  componentDidMount(){
    /*this.collectMenu() */

    this.socket = new WebSocket("ws://" + window.location.host + "/");
    this.socket.onmessage = ( event => {
      const resp = JSON.parse(event.data);
      console.log(resp);

      /*const resp = JSON.parse(event.data);

      this.setState(prev => {
        if(prev.messages === null){
          return {messages: resp.messages, clients: resp.noClient}
        } else {
          console.log(resp);
          return {messages: [...prev.messages, ...resp.messages], clients: resp.noClient}
        }
      }) */
    });
  }

  componentWillUnmount() {
    this.socket.close()
  }

  createPost = () => {
    const payload = JSON.stringify({author: this.props.username, text: this.state.postText});
    this.socket.send(payload);

    this.setState({postText: ""})
  };

  onTextChange = (event) => {
    this.setState({postText: event.target.value})
  };

  render() {
    //const menu = this.state.menu;
    const loggedIn = this.props.username ? this.props.username : null;
    const placeholderText = `What's on your mind, ${loggedIn}?`;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8"><p>Hallo <Link to={"/"}>{loggedIn}</Link> </p></div>
            <div className="col-sm-4">
              {!loggedIn && <Link to="/login" className="mr-5">Login</Link>}
              {!loggedIn && <Link to="/register">Register</Link> }
            </div>
           </div>
        </div>
        <div className="container p-xl-5">
          <div className="row">
            <div className="col-sm-12">
              <div>
                <textarea cols="50"
                          id="messageArea"
                          rows="5"
                          value={this.state.postText}
                          placeholder={placeholderText}
                          onChange={this.onTextChange} />
                <div id="btn" style={{cursor: "pointer"}} onClick={this.createPost}>Create post</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home