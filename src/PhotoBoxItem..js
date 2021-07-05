import React from 'react'
import './PhotoBoxItem.css'
import star from './Images/star.png'

export class PhotoBoxItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }
    
    handleClick() {
        this.props.togglePopUp(this.props.imgUrl)
    }

    handleRemove() {
        this.props.onRemove(this.props.imgUrl)
    }

    render() {
        let currentStarRating = this.props.stars.find(x => x.imgID === this.props.imgUrl)
        let currentCaptionCheck = this.props.captions.find(x => x.imgID === this.props.imgUrl)
        let currentCaption = ''
        if (currentCaptionCheck) {
            currentCaption = currentCaptionCheck.caption
        }
        let captionStyles = {
            fontFamily: this.props.captionFontFamily,
            fontSize: this.props.captionFontSize
        }
        return (               
               <React.Fragment>
               <span id='photoBoxImgContainer'>
               <img id={this.props.imgUrl} className='photoBoxImg' src={this.props.imgUrl} onClick = {this.handleClick}/>
                       {
                        currentCaption && <div id={this.props.imgUrl} class='captionLabel' style={captionStyles}>{currentCaption}</div>
                       }
                   {   
                        //
                        currentStarRating && currentStarRating.starRating.map(eachStar => {
                            return <img className='stars' id={eachStar} src={star} style={{height:"20px", width:"20px"}}/>
                        })
                    }
               </span>
               </React.Fragment>
        )
    }
}