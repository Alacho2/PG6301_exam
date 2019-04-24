import React from 'react';
import {Link} from "react-router-dom";
import {getMenu} from "../client-util.js";

export class Home extends React.Component {

  state = {
    errorMsg: null
  };

  componentDidMount(){
    this.collectMenu()
  }

  collectMenu = async () => {
    const req = await getMenu(1);
    this.setState({menu: req.menu})
  };

  render() {
    //const menu = this.state.menu;
    //const loggedIn = this.props.username ? this.props.username : null;
    return (
      <div>
        {//<p>Hello {loggedIn}</p>
        }
        <Link to="/login" style={{marginRight: "20px"}}>Login</Link>
        {!this.props.username && <Link to="/register">Register</Link> }
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