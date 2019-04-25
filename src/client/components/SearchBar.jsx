import React from 'react';

export class SearchBar extends React.Component {

  state= {
    text: "",
  };

  onSearchChange(event) {
    this.setState({text: event.target.value})
  }

  render() {
    return (
      <div>
        <input id="searchField"
               placeholder="Search for a user"
               type="text"
               onChange={this.onSearchChange}/>
      </div>
    )
  }
}

export default SearchBar