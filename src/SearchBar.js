//PRESENTATION: RENDERS A SEARCH BAR
//FUNCTIONALITY: CALLS AN INSTANCE OF APP/SEARCH() TO FETCH SEARCH RESULTS FROM GOOGLE API

import React from 'react';
import './SearchBar.css'

export class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        // searchTerm is initialised as empty
        this.state = {
          searchTerm: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
      }

    // updates searchTerm as the user types so it is ready when they press search
    handleChange(event) {
        this.setState({searchTerm: event.target.value})
      }

    //   calls the search function using the searchTerm
    handleSearch(event) {
        this.props.onSearch(this.state.searchTerm)
    }

    handleKeyUp(event) {
      if (event.keyCode === 13) {
        this.handleSearch(event)
      }
    }

    render() {
        return(
            <div className='searchBar'>
                <div id='header' style={this.props.hideHeader}>
                    <h1>EASY BOOK COLLAGE</h1>
                    <h2>READ? TBR? ALL-TIME FAVES? MAKE AN EASY COLLAGE OF BOOK COVERS</h2>
                </div>
                {/* space for user to input their search term, calls handleChange as they type */}
                <input className='searchText' placeholder='Search for a book' onChange={this.handleChange}  onKeyUp={this.handleKeyUp}/>
                {/* search button which invokes a search when clicked */}
                <button onClick={this.handleSearch}>SEARCH</button>
            </div>
        )
}
}
