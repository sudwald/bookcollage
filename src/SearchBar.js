//PRESENTATION: RENDERS A SEARCH BAR
//FUNCTIONALITY: CALLS AN INSTANCE OF APP/SEARCH() TO FETCH SEARCH RESULTS FROM GOOGLE API

import React from 'react';
import './SearchBar.css'
import help from './Images/help.png'
import closeicon from './Images/closeicon.png'

export class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        // searchTerm is initialised as empty
        this.state = {
          titleSearchTerm: '',
          authorSearchTerm: '',
        }
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleAuthorChange = this.handleAuthorChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.userHelpOn = this.userHelpOn.bind(this)
        this.userHelpOff = this.userHelpOff.bind(this)
      }

    // updates searchTerm as the user types so it is ready when they press search
    handleTitleChange(event) {
        this.setState({titleSearchTerm: event.target.value})
      }

    handleAuthorChange(event) {
        this.setState({authorSearchTerm: event.target.value})
    }

    //   calls the search function using the searchTerm
    handleSearch() {
        if (this.state.authorSearchTerm || this.state.titleSearchTerm) {
          this.props.onSearch(this.state.titleSearchTerm, this.state.authorSearchTerm)
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
          this.handleSearch()
        }
    }

    userHelpOn() {
      document.getElementById('userHelpBox').style.display='inline'
    }

    userHelpOff() {
      document.getElementById('userHelpBox').style.display='none'
    }

    render() {
        return(
            <div className='searchBar'>
                <div id='header' style={this.props.hideHeader}>
                    <h1>EASY BOOK COLLAGE</h1>
                    <h2>READ? TBR? ALL-TIME FAVES? MAKE AN EASY COLLAGE OF BOOK COVERS</h2>
                </div>
                {/* space for user to input their search term, calls handleChange as they type */}
                <input id='titleSearch' className='searchText' placeholder='Title' onChange={this.handleTitleChange}  onKeyUp={this.handleKeyUp}/>
                <input id='authorSearch' className='searchText' placeholder='Author' onChange={this.handleAuthorChange}  onKeyUp={this.handleKeyUp}/>
                {/* search button which invokes a search when clicked */}
                <button onClick={this.handleSearch}>SEARCH</button>
                <div id='userHelp' onClick={this.userHelpOn}>
                  <img src={help}/> 
                  I can't find the book I'm looking for  
                </div>
                <div id='userHelpBox'>
                  <div id='closeIconDiv'>
                    <img src={closeicon} id='helpCloseIcon' onClick={this.userHelpOff}/><br/>
                  </div>
                  <div>
                This website uses data from <a href='https://books.google.com/' target="_blank">Google Books</a>. If you can't find the book you're looking for, try visiting Google Books to check the book you're looking for is in their database and has a cover image. This website will only pull through search results which have a cover image in Google Books.<br/><br/> You can also search by IBSN in the title field.
                </div>
                </div>
            </div>
        )
}
}
