import React from 'react';

export class NotFound extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h2>I'm sorry, kind human</h2>

        <p>That page is not available. A team of highly trained monkeys were here before you to check it.</p>
        <div><button onClick={this.props.history.goBack}>Back in time</button></div>
      </div>
    )
  }
}

export default NotFound