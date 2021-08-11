//PRESENTATION: RENDERS A COLLECTION OF IMAGES (SEARCH RESULTS) AS <IMAGERESULT /> INSTANCES
//FUNCTIONALITY: FILTERS ONLY THE IMAGES FROM THE JSON RESPONSE AND MAPS THEM INTO <IMAGERESULT /> INSTANCES

import React from 'react';
import './searchResults.css'
import { ImageResult } from './ImageResult';

export class SearchResults extends React.Component {        
    render() {
        let foundSearchResults = false;
        if (typeof(this.props.jsonArray)=='undefined') {
            foundSearchResults = false;
        }
        else {
            foundSearchResults = true;
        }
        return(
            <div className='searchResultsContainer' style={this.props.loadContent}>
                <div className='instructions'>
                    <h2>CLICK ANY RESULT TO ADD IT TO YOUR COLLAGE</h2>
                </div>
                <div className='searchResults'>
                {/* maps the jsonArray to extract the image url ("thumbnail") and invokes an instance of ImageResult in each case */}
                    {/* checks that there actually is a thumbnail property, skips it if the item has no image */}
                    {
                        !foundSearchResults? 
                            <div id='noResults'>
                                <p>No search results found</p>
                                <p id='noResultsFurtherInfo'>This website uses data from <a href='https://books.google.com/' target="_blank">Google Books</a>. If you can't find the book you're looking for, try visiting Google Books to check the book you're looking for is in their database and has a cover image. This website will only pull through search results which have a cover image in Google Books.<br/><br/> You can also search by IBSN in the title field.</p>
                            </div>
                            : 
                        this.props.jsonArray.filter(item => item.volumeInfo?.imageLinks?.thumbnail)
                        .map(item => {
                        // return an instance of ImageResult for each thumbnail, also passes it the ability to add a photo
                        return <ImageResult imgUrl={item.volumeInfo.imageLinks.thumbnail} onAdd={this.props.onAdd} updateImgToggleArray={this.props.updateImgToggleArray} imgToggleArray={this.props.imgToggleArray}/>
                    })
                    }
                </div>
            </div>
        )
}
}
