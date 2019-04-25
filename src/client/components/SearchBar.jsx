import React from 'react';
import {Link} from "react-router-dom";

let timeout;

export class SearchBar extends React.Component {

  state= {
    text: "",
    users: [],
    errorMsg: "",
  };

  onSearchChange = (event) => {
    this.setState({text: event.target.value})
  };

  searchForUser = async (event) => {
    if (event.key === 'Enter') {
      const text = this.state.text;
      const url = `/api/users/`;
      try {
        const response = await fetch(url,
          {
            method: 'get',
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        const result = await response.json();
        const newUsers = result.users.filter(user => {
          return user.id.includes(text)
        });
        this.setState({users: newUsers, text: ""})
      } catch (error) {
        this.setState({errorMsg: error})
      }
      timeout = setTimeout(() => {
        this.clearState()
      }, 5000)
    }
  };

  clearState = () => {
    this.setState({text: "", users: []});
    clearTimeout(timeout)
  };

  render() {
    const placeHolderText = this.state.errorMsg !== "" ?
      this.state.errorMsg : "Search for a user";
    const users = this.state.users;
    return (
      <div>
        <input id="searchField"
               placeholder={placeHolderText}
               type="text"
               value={this.state.text}
               onChange={(event) => {this.onSearchChange(event)}}
               onKeyDown={(event) => {this.searchForUser(event)}}/>
        {users.map(user => {
          return (
            <div key={user.id}>
              <Link to={`/profile?id=${user.id}`} onClick={this.clearState}>{user.id}</Link>
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default SearchBar