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
            this.setState({imgStyle: {display:"inline"}})
            this.props.restoreReset()
        }
    }

    handleAdd() {
        this.props.onAdd(this.props.imgUrl)
        this.setState({imgStyle: {display:"none"}})
    }

    render() {
        return(
                <React.Fragment>
                <img src={this.props.imgUrl} onClick={this.handleAdd} style={this.state.imgStyle} draggable="true"/>
                </React.Fragment>
        )
    }
}