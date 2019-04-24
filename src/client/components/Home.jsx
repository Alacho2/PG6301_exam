import React from 'react';
import {Link} from "react-router-dom";

export class Home extends React.Component {

  state = {
    errorMsg: null
  };

  componentDidMount(){
    /*this.collectMenu() */
  }

  collectMenu = async () => {
    /*const req = await getMenu(1);
    this.setState({menu: req.menu}) */
  };

  render() {
    //const menu = this.state.menu;
    const loggedIn = this.props.username ? this.props.username : null;

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
        {/*menu === null ? <p>Fetching menu</p> : menu.days.map(item => {
          return (
            <div key={item.name}>
              <p>{`${item.name} - ${item.meal}`}</p>
            </div>
          )
        })*/}
        {/*loggedIn && menu ? <div>
            <Link to={`/edit?menuId=${menu.id}`}>Edit menu</Link>
            <Link to={`/create`}>Create menu</Link>
        </div> : null*/}
      </div>
    )
  }
}

export default Home