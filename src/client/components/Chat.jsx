import React from 'react';

export class Chat extends React.Component {
  state = {
    author: "",
    text: "",
    messages: null,
    clients: 0,
  };

  //Add momentum for time
  componentDidMount() {
    this.socket = new WebSocket("ws://" + window.location.host + "/");
    this.socket.onmessage = ( event => {
      const resp = JSON.parse(event.data);
      this.setState(prev => {
        if(prev.messages === null){
          return {messages: resp.messages, clients: resp.noClient}
        } else {
          console.log(resp);
          return {messages: [...prev.messages, ...resp.messages], clients: resp.noClient}
        }

      })
    });
  }

  onNameChange = (event) => {
    this.setState({author: event.target.value})
  };

  onTextChange = (event) => {
    this.setState({text: event.target.value})
  };

  sendMessage = () => {
    const payload = JSON.stringify({author: this.state.author, text: this.state.text});
    this.socket.send(payload);

    this.setState({text: ""})
  };

  render(){

    let messages;
    if(this.state.messages !== null){
      messages = <div>
        {this.state.messages.map(m =>
          <p key={"msg_key_" + m.id}> {m.author + ": " + m.text}</p>
        )}
      </div>;
    }

    return(
      <div>
        {//<NameHandler changeName={this.state.author}/>
        }<p>Connected clients: {this.state.clients}</p>
        <h2>WebSocket-based Chat</h2>
        <div>
          <p id="inputName">Your name:</p>
          <input type="text"
                 className="inputName"
                 placeholder="Anon"
                 value={this.state.name}
                 onChange={this.onNameChange}/>
        </div>
        <br/>
        <div>
          <p>Your message:</p>
          <textarea cols="50"
                    id="messageArea"
                    rows="5"
                    value={this.state.text}
                    onChange={this.onTextChange} />
        </div>
        <br/>
        <div id="sendBtn" className="btn" onClick={this.sendMessage}>Send</div>
        {messages}
      </div>

    )
  }
}

export default Chat