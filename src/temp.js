const newCaption = e.target.value
        let newCaptionArray = this.state.captions
        const imgUrl = this.state.imgUrlTemp
        
        let found = false;
        let foundAt = 0;

        for (let i=0; i<newCaptionArray.length;i++) {
            if (newCaptionArray[i].imgID === imgUrl) {
                found = true
                foundAt = i;
                break;        
            }
        }

        if (found) {
            //logic to change existing star rating
            newCaptionArray[foundAt].caption = newCaption
        }
        else {
            //logic to add new star rating
            newCaptionArray.push({
                imgID: imgUrl,
                caption: newCaption
            })
        }

        this.setState({captions: newCaptionArray})   



      //OLD IMAGE RESULT 

      //PRESENTATION: RENDERS ONE IMAGE PER SEARCH RESULT AND RENDERS A POP-UP NOTIFICATION WHEN
//FUNCTIONALITY: FILTERS ONLY THE IMAGES FROM THE JSON RESPONSE AND MAPS THEM INTO <IMAGERESULT /> INSTANCES

import React from 'react'

export class ImageResult extends React.Component {
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.state = {
            imgStyle: {display:"inline"},
        }
    }

    componentDidUpdate() {
        if(this.props.toRestore === this.props.imgUrl) {
            this.setState({imgStyle: {filter:"grayscale(0%)"}})
            this.props.restoreReset()
        }
    }

    handleAdd() {
        this.props.onAdd(this.props.imgUrl)
        this.setState({imgStyle: {filter:"grayscale(100%)"}})
    }

    render() {
        return(
                <React.Fragment>
                <img src={this.props.imgUrl} onClick={this.handleAdd} style={this.state.imgStyle} draggable="true"/>
                </React.Fragment>
        )
    }
}