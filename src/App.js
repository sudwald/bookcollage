//PRESENTATION: <SEARCHBAR/>, <SEARCHRESULTS/>, AND <PHOTOBOX/>
//FUNCTIONALITY: 
  //SEARCH() - RETRIEVES SEARCH RESULTS FROM GOOGLE API
  //ADDPHOTO - ADDS A PHOTO TO USER'S COLLAGE
  //REMOVEPHOTO - REMOVES A PHOTO FROM USER'S COLLAGE
  //RESTORERESET - RESTORES A REMOVED PHOTO TO THE SEARCH RESULTS

import './App.css';
import React from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { PhotoBox } from './PhotoBox';
import { Notification } from './Notification';
import html2canvas from 'html2canvas';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jsonFullObject: [],
      // jsonArray holds the .items[...] array of search results returned by the Google Books API
      jsonArray: [],
      // photoBoxArray holds an array of the urls of images the user has shortlisted for their collage
      photoBoxArray: [],
      // photoToRestore temporarily holds the URL of a photo which needs to be made visible in the search results again as the user has removed it from their collage
      photoToRestore: '',
      firstLoad: true,
      notificationStyle: {display: 'none'},
      loadContent: {display: 'none'},
      hideHeader: {display: 'block'},
      imgToggleArray: []
    }
    this.search = this.search.bind(this)
    this.addPhoto = this.addPhoto.bind(this)
    this.removePhoto = this.removePhoto.bind(this)
    this.restoreReset = this.restoreReset.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.updateImgToggleArray = this.updateImgToggleArray.bind(this)
  }

  // called when user clicks a search result to add it to their collage
  addPhoto(photoUrl) {
    let photos = this.state.photoBoxArray
    // checks photo isn't already in the collage
    if(photos.find(savedPhoto => savedPhoto === photoUrl)) {
      return
    }
    // add the url of the clicked photo to the PhotoBox array
    photos.push(photoUrl)
    // update the PhotoBox array
    this.setState({photoBoxArray: photos})
    // this.setState({notificationText: 'Added!'})
    // this.setState({notificationStyle: {display:"inline"}})
    // setInterval(() => this.setState({notificationStyle: {display: "none"}}),2000)
  }
  
  // once a photo has been removed from the collage and reinstated to the search results, this function resets the tracker variable which tells ImageResult if an image needs restoring
  restoreReset() {
    this.setState({photoToRestore: ''})
  }

  // called when user clicks an image in their collage to remove it
  removePhoto(photoUrl) {
    let photos = this.state.photoBoxArray
    // creates a new PhotoBoxArray minus the image the user no longer wants 
    photos = photos.filter(selectedToRemove => selectedToRemove !== photoUrl)
    // updates the photoBoxArray
    this.setState({photoBoxArray: photos})
    // sets the tracker variable photoToRestore to indicate to ImageResult that a removed image needs reinstating to the search results
    this.setState({notificationText: 'Removed!'})
    this.setState({notificationStyle: {display:"inline"}})
    setTimeout(() => this.setState({notificationStyle: {display: "none"}}),2000)
    this.setState({photoToRestore: photoUrl})
    this.updateImgToggleArray('removed',photoUrl)
  }
  
  // fetches search results from the Google Books API
  search(titleSearchTerm, authorSearchTerm) {
    const combinedSearchTerm = titleSearchTerm + " " + authorSearchTerm
    // carries out the search using the indicated search term
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${combinedSearchTerm}&intitle:${titleSearchTerm}&inauthor:${authorSearchTerm}&printType=books&maxResults=40`)
        .then(response => response.json())
        // takes only the .items[...] array from the json response and stores it in state.jsonArray, this is the only part of the json response we will work with
        .then(data => 
          this.setState({jsonArray: data.items}))
        
    /*
        alert(JSON.stringify(this.state.jsonFullObject))
        if(this.state.jsonFullObject.totalItems > 0) {
          this.setState({jsonArray: this.state.jsonFullObject.items})
          alert("there were items! items were: " + (JSON.stringify(this.state.jsonArray)))
        }
        else {
          this.setState({jsonArray: []})
          alert("there were no items, json array is empty")
        }
    
    if(!this.state.jsonArray) {
      alert("No search results!")
    }
    */

    if (this.state.firstLoad) {
      this.setState({loadContent:{display: 'inline'}})
      this.setState({hideHeader:{display: 'none'}})
    }
  }

  updateImgToggleArray(direction, imgUrl) {
    let newImgStyleArray = this.state.imgToggleArray;
    let found = false;
    let foundAt = 0;
    const hidden = {display:"none"};
    const visible = {display:"block"};

    for (let i=0; i<newImgStyleArray.length;i++) {
        if (newImgStyleArray[i].imgID === imgUrl) {
            found = true;
            foundAt = i;
            break;
        }
    }

    if(found) { 
      if(direction === 'added') {
            newImgStyleArray[foundAt].displayStyle = hidden    
        }
        else {
            newImgStyleArray[foundAt].displayStyle = visible    
        }
    }

    else {
        if (direction='added') {  
            newImgStyleArray.push({
                imgID: imgUrl,
                displayStyle: hidden,
            })
        }
        else {
            newImgStyleArray.push({
                imgID: imgUrl,
                displayStyle: visible, 
           })
        }
    }
    this.setState({imgToggleArray: newImgStyleArray})
}

  moveLeft(imgUrl) {
    const currentPosition = this.state.photoBoxArray.indexOf(imgUrl)
    const newPosition = currentPosition - 1
    this.state.photoBoxArray.splice(currentPosition, 1)
    this.state.photoBoxArray.splice(newPosition, 0, imgUrl)
  }

  moveRight(imgUrl) {
    const currentPosition = this.state.photoBoxArray.indexOf(imgUrl)
    const newPosition = currentPosition + 1
    this.state.photoBoxArray.splice(currentPosition, 1)
    this.state.photoBoxArray.splice(newPosition, 0, imgUrl)
  }

  render() {
    return (
      <div className="App">
        {/* passes SearchBar the ability to conduct an API search */}
        <SearchBar hideHeader={this.state.hideHeader} onSearch={this.search} />
        {/* passes SearchResults the results of the search, access to add a photo,  access to the toRestore tracker variable, and access to the restore function should an image need to be reinstated in the search results*/}
        <SearchResults loadContent={this.state.loadContent} jsonArray={this.state.jsonArray} onAdd={this.addPhoto} toRestore={this.state.photoToRestore} restoreReset={this.restoreReset} updateImgToggleArray={this.updateImgToggleArray} imgToggleArray={this.state.imgToggleArray}/>
        {/* passes PhotoBox the array of the user's chosen collage photos and the ability to remove a photo from the collage */}
        <PhotoBox loadContent={this.state.loadContent} photoBoxArray={this.state.photoBoxArray} onRemove={this.removePhoto} moveLeft={this.moveLeft} moveRight={this.moveRight} updateImgToggleArray={this.updateImgToggleArray}/>
        <Notification notificationStyle={this.state.notificationStyle} notificationText={this.state.notificationText}/>
      </div>
    );
  }
};

export default App;
