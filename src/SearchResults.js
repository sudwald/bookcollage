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
                        !foundSearchResults? <div id='noResults'>No search results found</div> : 
                        this.props.jsonArray.filter(item => item.volumeInfo?.imageLinks?.thumbnail)
                        .map(item => {
                        // return an instance of ImageResult for each thumbnail, also passes it the ability to add a photo, the toRestore tracker variable and access to the restore function
                        return <ImageResult imgUrl={item.volumeInfo.imageLinks.thumbnail} onAdd={this.props.onAdd}  toRestore={this.props.toRestore} restoreReset={this.props.restoreReset} updateImgToggleArray={this.props.updateImgToggleArray} imgToggleArray={this.props.imgToggleArray}/>
                    })
                    }
                </div>
            </div>
        )
}
}
