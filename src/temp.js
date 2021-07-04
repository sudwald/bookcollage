///previous search function

search(titleSearchTerm, authorSearchTerm) {
    const combinedSearchTerm = titleSearchTerm + " " + authorSearchTerm
    // carries out the search using the indicated search term
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${combinedSearchTerm}&intitle:${titleSearchTerm}&inauthor:${authorSearchTerm}&printType=books&maxResults=40`)
        .then(response => response.json())
        // takes only the .items[...] array from the json response and stores it in state.jsonArray, this is the only part of the json response we will work with
        .then(data => this.setState({jsonArray: data.items}))

    if (this.state.firstLoad) {
      this.setState({loadContent:{display: 'inline'}})
      this.setState({hideHeader:{display: 'none'}})
    }
  }
