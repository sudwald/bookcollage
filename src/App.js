/* 
CHILD COMPONENTS: <SEARCHBAR/>, <SEARCHRESULTS/>, <PHOTOBOX/>

FUNCTIONS: 
  SEARCH() - RETRIEVES SEARCH RESULTS FROM GOOGLE API
  ADDPHOTO() - ADDS A PHOTO TO USER'S COLLAGE
  REMOVEPHOTO() - REMOVES A PHOTO FROM USER'S COLLAGE
  UPDATEIMGTOGGLEARRAY() - MANAGES IMGS APPEARING/DISAPPEARING WHEN ADDED/REMOVED FROM SEARCH RESUSLTS/COLLAGE
  MOVELEFT() - MOVES A PHOTO LEFT IN THE COLLAGE
  MOVERIGHT() - DITTO

PROPS: none

STATE:
  JSONARRAY - HOLDS THE SEARCH RESULTS FROM GOOGLE BOOKS API 
  PHOTOBOXARRAY - HOLDS AN ARRAY OF URLS OF BOOKS SELECTED FOR THE COLLAGE BY THE USER
  IMGTOGGLEARRAY - HOLDS DISPLAY INFO FOR PHOTOS WHICH HAVE BEEN ADDED/REMOVED 
  FIRSTLOAD -  BOOLEAN INDICATING IF THIS IS USER'S FIRST SEARCH
  LOADCONTENT - BOOLEAN USED TO CONTROL DISPLAY OF SEARCH RESULTS/COLLAGE
  HIDEHEADER - BOOLEAN USED TO CONTROL DISPLAY OF HEADER

PROPS PASSED:
  <SearchBar /> - STATE.HIDEHEADER, SEARCH()
  <SearchResults /> - STATE.LOADCONTENT, STATE.JSONARRAY, STATE.IMGTOGGLEARRAY, ADDPHOTO(), UPDATEIMGTOGGLEARRAY()
  <PhotoBox /> - STATE.PHOTOBOXARRAY, STATE.LOADCONTENT, REMOVEPHOTO(), MOVELEFT(), MOVERIGHT(), UPDATEIMGTOGGLEARRAY()
*/

import './App.css';
import React from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { PhotoBox } from './PhotoBox';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jsonArray: [], //HOLDS SEARCH RESULTS FROM GOOGLE BOOKS
      photoBoxArray: [], //HOLDS URLS OF IMAGES SELECTED BY USER FOR THEIR COLLAGE
      imgToggleArray: [], //HOLDS DISPLAY INFO FOR IMAGES ADDED/REMOVED FROM COLLAGE
      firstLoad: true, //BOOLEAN USED TO LOAD A SIMPLIFIED INTERFACE THEN EXPAND WHEN USER PERFORMS FIRST SEARCH
      loadContent: {display: 'none'}, //BOOLEAN USED TO DISPLAY FULL CONTENT WHEN USER PERFORMS FIRST SEARCH
      hideHeader: {display: 'block'} //BOOLEAN USED TO HIDE SIMPLIFIED INTERFACE WHEN USER PERFORMS FIRST SEARCH
    }
    this.search = this.search.bind(this)
    this.addPhoto = this.addPhoto.bind(this)
    this.removePhoto = this.removePhoto.bind(this)
    this.moveImage = this.moveImage.bind(this)
    this.updateImgToggleArray = this.updateImgToggleArray.bind(this)
  }

  // called when user clicks a search result to add it to their collage
  addPhoto(photoUrl) { //FUNCTION TO ADD A PHOTO FROM THE SEARCH RESULTS TO THE USER'S COLLAGE
    let photos = this.state.photoBoxArray //CREATE A TEMP DUPLICATE OF THE CURRENT COLLAGE
    // checks photo isn't already in the collage
    if(photos.find(savedPhoto => savedPhoto === photoUrl)) { //CHECK IF PHOTO IS ALREADY IN THE COLLAGE, IF SO DO NOTHING
      return
    }
    photos.push(photoUrl) //OTHERWISE PUSH THE URL OF THE SELECTED PHOTO TO THE TEMP ARRAY
    this.setState({photoBoxArray: photos}) //UPDATE STATE WTIH THE TEMP ARRAY
  }

  removePhoto(photoUrl) { //FUNCTION TO REMOVE AN IMAGE FROM THE COLLAGE
    let photos = this.state.photoBoxArray //CREATE A TEMP DUPLICATE OF THE CURRENT COLLAGE
    photos = photos.filter(selectedToRemove => selectedToRemove !== photoUrl) //FILTER THE CHOSEN PHOTO OUT OF THE PHOTOBOX ARRAY
    this.setState({photoBoxArray: photos}) //UPDATE STATE WITH THE FILTERED ARRAY
    this.updateImgToggleArray('removed',photoUrl) //CALL FUNCTION WHICH WILL MAKE THE REMOVED PHOTO VISIBLE IN SEARCH RESULTS AGAIN
  }
  
  search(titleSearchTerm, authorSearchTerm) { //FUNCTION TO PERFORM A SEARCH / RETRIEVE DATA FROM GOOGLE BOOKS API 
    const combinedSearchTerm = titleSearchTerm + " " + authorSearchTerm //A GENERIC SEARCH TERM (Q=) IS MANDATORY - CONCATENATE AUTHOR AND TITLE SEARCH TERMS TO MAKE ONE
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${combinedSearchTerm}&intitle:${titleSearchTerm}&inauthor:${authorSearchTerm}&printType=books&maxResults=40`) //CARRY OUT SEARCH USING CONCATENATED/GENERIC SEARCH TERM (Q=) AND AUTHOR/TITLE SPECIFIC SEARCHES
        .then(response => response.json())
        .then(data => 
          this.setState({jsonArray: data.items})) //ISOLATES .ITEMS ARRAY FROM THE RETURNED JSON, THIS CONTAINS THE COVER IMAGE THUMBNAILS

    if (this.state.firstLoad) { //IF THIS IS THE USER'S FIRST SEARCH...
      this.setState({loadContent:{display: 'inline'}}) //DISPLAY THE FULL UI
      this.setState({hideHeader:{display: 'none'}}) //HIDE THE SIMPLIFIED LOAD UI
    }
  }

  updateImgToggleArray(direction, imgUrl) { //FUNCTION WHICH SHOWS/HIDES IMAGES IN THE SEARCH RESULTS DEPENDING ON IF THEY'RE IN THE USER'S COLLAGE
    let newImgStyleArray = this.state.imgToggleArray; //TEMP DUPLICATE OF CURRENT IMG DISPLAY ARRAY
    let found = false; //SET DEFAULT VALUE FOR ARRAY SEARCH
    let foundAt = 0; //SET DEFAULT VALUE FOR ARRAY SEARCH
    const hidden = {display:"none"}; //SETS DISPLAY CSS FOR A HIDDEN ELEMENT
    const visible = {display:"block"}; //SETS DISPLAY CSS FPR A VISIBLE ELEMENT

    for (let i=0; i<newImgStyleArray.length;i++) { //LOOP THROUGH CURRENT ARRAY TO CHECK IF DISPLAY PROPERTIES ALREADY SET FOR THIS IMAGE - I.E. IMAGE ALREADY ADDED TO COLLAGE OR REMOVED FROM COLLAGE
        if (newImgStyleArray[i].imgID === imgUrl) { //IF URL IS ALREADY IN THE ARRAY
            found = true; //SET FOUND TO TRUE 
            foundAt = i; //SET FOUNDAT TO INDEX IT WAS FOUND AT 
            break; //STOP LOOPING
        }
    }

    if(found) {  //IF IT WAS FOUND...
      if(direction === 'added') { //IF IT'S BEING ADDED TO THE COLLAGE...
            newImgStyleArray[foundAt].displayStyle = hidden     //IT SHOULD DISPAPPEAR FROM THE SEARCH RESULTS
        }
        else { //IF IT'S BEING REMOVED FROM THE COLLAGE
            newImgStyleArray[foundAt].displayStyle = visible    //IT SHOULD APPEAR IN THE SEARCH RESULTS AGAIN
        }
    }

    else { //IF IT WASN'T FOUND
            newImgStyleArray.push({ //PUSH A NEW ENTRY TO THE IMG STYLE ARRAY... 
                imgID: imgUrl, //...USING THE URL AS THE IDENTIFIER...
                displayStyle: hidden, //...AND HIDING THE RELEVANT IMAGE IN THE SEARCH RESULTS
            })
    }
    this.setState({imgToggleArray: newImgStyleArray}) //PUSH TEMP ARRAY TO STATE
}

  moveImage(direction, imgUrl) {
    const currentPosition = this.state.photoBoxArray.indexOf(imgUrl)
    const newPosition = direction === 'left'? currentPosition - 1: currentPosition + 1
    this.state.photoBoxArray.splice(currentPosition, 1)
    this.state.photoBoxArray.splice(newPosition, 0, imgUrl)
    this.setState({photoBoxArray: this.state.photoBoxArray})
  }

  moveRight(imgUrl) {
    const currentPosition = this.state.photoBoxArray.indexOf(imgUrl)
    const newPosition = currentPosition + 1
    this.state.photoBoxArray.splice(currentPosition, 1)
    this.state.photoBoxArray.splice(newPosition, 0, imgUrl)
    this.setState({photoBoxArray: this.state.photoBoxArray})
  }

  render() {
    return (
      <div className="App">
        {/* passes SearchBar the ability to conduct an API search */}
        <SearchBar hideHeader={this.state.hideHeader} onSearch={this.search} />
        {/* passes SearchResults the results of the search, access to add a photo*/}
        <SearchResults loadContent={this.state.loadContent} jsonArray={this.state.jsonArray} onAdd={this.addPhoto} updateImgToggleArray={this.updateImgToggleArray} imgToggleArray={this.state.imgToggleArray}/>
        {/* passes PhotoBox the array of the user's chosen collage photos and the ability to remove a photo from the collage */}
        <PhotoBox loadContent={this.state.loadContent} photoBoxArray={this.state.photoBoxArray} onRemove={this.removePhoto} moveImage={this.moveImage} updateImgToggleArray={this.updateImgToggleArray}/>
      </div>
    );
  }
};

export default App;
