//PRESENTATION: RENDERS ONE IMAGE PER SEARCH RESULT
//FUNCTIONALITY: FILTERS ONLY THE IMAGES FROM THE JSON RESPONSE AND MAPS THEM INTO <IMAGERESULT /> INSTANCES

import React from 'react'

export class ImageResult extends React.Component {
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleUpdateToggleArray = this.handleUpdateToggleArray.bind(this)
    }

    handleAdd() {
        this.props.onAdd(this.props.imgUrl)
        this.handleUpdateToggleArray('added')
    }

    handleUpdateToggleArray(direction) {
        this.props.updateImgToggleArray(direction, this.props.imgUrl)
    }

    render() {
        let styleCheck = this.props.imgToggleArray.find(x => x.imgID === this.props.imgUrl)
        return(
                <React.Fragment>
                <img src={this.props.imgUrl} onClick={this.handleAdd} style={
                    styleCheck? styleCheck.displayStyle : {filter: "grayscale(0%)"}
                } draggable="true"/>
                </React.Fragment>
        )
    }
}