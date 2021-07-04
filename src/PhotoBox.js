import React from 'react'
import { PhotoBoxItem } from './PhotoBoxItem.'
import './PhotoBox.css'
import { Customise } from './Customise'
import sparklebg from './Images/sparklebg.png'
import beach from './Images/beach.png'
import bookbg from './Images/bookbg.png'
import coffee from './Images/coffee.png'
import flowersbg from './Images/flowersbg.png'
import flowersbg2 from './Images/flowersbg2.png'
import geometric1 from './Images/geometric1.png'
import geometric2 from './Images/geometric2.jpg'
import geometric3 from './Images/geometric3.png'
import reading from './Images/reading.png'
import world from './Images/world.png'
import star from './Images/star.png'
import closeicon from './Images/closeicon.png'
import removeicon from './Images/removeicon.png'
import lefticon from './Images/lefticon.png'
import righticon from './Images/righticon.png'
import caption from './Images/caption.png'
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';

export class PhotoBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogStyle: {display: 'none'},
            popUpVisible: false,
            imgUrlTemp: '',
            leftButtonDisabled: false,
            rightButtonDisabled: false,
            stars: [],
            captions: []
        }
        this.displayChange = this.displayChange.bind(this)
        this.alignmentChange = this.alignmentChange.bind(this)
        this.bgColorChange = this.bgColorChange.bind(this)
        this.titleChange = this.titleChange.bind(this)
        this.fontSizeChange = this.fontSizeChange.bind(this)
        this.fontFaceChange = this.fontFaceChange.bind(this)
        this.fontColorChange = this.fontColorChange.bind(this)
        this.backgroundTypeChange = this.backgroundTypeChange.bind(this)
        this.togglePopUp = this.togglePopUp.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleLeft = this.handleLeft.bind(this)
        this.handleRight = this.handleRight.bind(this)
        this.togglePopUpOff = this.togglePopUpOff.bind(this)
        this.handleStarRate = this.handleStarRate.bind(this)
        this.clearRating = this.clearRating.bind(this)
        this.generateImg = this.generateImg.bind(this)
        this.base64Converter = this.base64Converter.bind(this)
        this.setCaption = this.setCaption.bind(this)
        this.captionFontFaceChange = this.captionFontFaceChange.bind(this)
        this.captionFontSizeChange = this.captionFontSizeChange.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    displayChange(itemsPerRow) {        
        itemsPerRow = parseInt(itemsPerRow)
        document.getElementById('PhotoBox').style.gridTemplateColumns = `repeat(${itemsPerRow}, 1fr)`
    }

    alignmentChange(alignment) {    
        //    alert("main function triggered with value " + alignment)
      //  
        //switch(alignment) {
          //  case "Left":
            //    document.getElementById('PhotoBox').style.margin = "";
              //  break;
            //case "Centre":
              //  document.getElementById('PhotoBox').style.margin="0 auto"
                //break;
       // }
    }

    bgColorChange(color, bgType) {
        if (bgType === 'gradient') {
            const bgGradient = `linear-gradient(120deg, #FFFFFF, ${color}, #FFFFFF)`
            document.getElementById('Collage').style.backgroundColor = ""
            document.getElementById('Collage').style.backgroundImage = bgGradient
        }
        else if (bgType === 'solid') {
            document.getElementById('Collage').style.backgroundImage = ""
            document.getElementById('Collage').style.backgroundColor = color
        }
        else {
            document.getElementById('Collage').style.backgroundColor = color
            document.getElementById('Collage').style.backgroundImage = document.getElementById('Collage').style.backgroundImage
        }

        document.getElementById('bgColorSelector').value=color
    }

    fontColorChange(color) {
        document.getElementById('collageTitle').style.color = color
    }

    titleChange(title) {
        document.getElementById('collageTitle').innerText = title
    }

    fontSizeChange(size) {
        document.getElementById('collageTitle').style.fontSize = `${size}px`
    }

    captionFontSizeChange(size) {
        if (this.state.captions.length > 0) {
            const captions = document.querySelectorAll("div.captionLabel")
            for (let i=0; i<captions.length; i++) {
                captions[i].style.fontSize = `${size}px`
            }
            }
      }
      
      fontFaceChange(font) {
        document.getElementById('collageTitle').style.fontFamily = font
      }
      
      captionFontFaceChange(font) {
        if (this.state.captions.length > 0) {
        const captions = document.querySelectorAll("div.captionLabel")
        for (let i=0; i<captions.length; i++) {
            captions[i].style.fontFamily = font
        }
        }
      }

    backgroundTypeChange(bgType, currentColor) {
        const myCollage = document.getElementById('Collage')
        const bgGradient = `linear-gradient(120deg, ${currentColor}, #FFFFFF)`
        
        switch(bgType) {

            case 'solid': 
                myCollage.style.backgroundImage = ""
                myCollage.style.backgroundColor = currentColor
                break;

            case 'gradient':
                myCollage.style.backgroundImage = bgGradient
                break;

            case 'sparkle':
                myCollage.style.backgroundImage = `url(${sparklebg})`
                break;

            case 'beach':
                myCollage.style.backgroundImage = `url(${beach})`
                break;

            case 'geoFlower':
                myCollage.style.backgroundImage = `url(${flowersbg})`
                break;

            case 'natFlower':
                myCollage.style.backgroundImage = `url(${flowersbg2})`
                break;

            case 'book':
                myCollage.style.backgroundImage = `url(${bookbg})`
                break;

            case 'reading':
                myCollage.style.backgroundImage = `url(${reading})`
                break;

            case 'coffee':
                myCollage.style.backgroundImage = `url(${coffee})`
                break;

            case 'geo1':
                myCollage.style.backgroundImage = `url(${geometric1})`
                break;

            case 'geo2':
                myCollage.style.backgroundImage = `url(${geometric2})`
                break;

            case 'geo3':
                myCollage.style.backgroundImage = `url(${geometric3})`
                break;

            case 'map':
                myCollage.style.backgroundImage = `url(${world})`
                break;

        }        
    }

    togglePopUp(imgUrl) {  
        
            this.setState({dialogStyle: {display: 'grid'}})
            this.setState({popUpVisible: true})

            if (this.props.photoBoxArray.indexOf(imgUrl) === 0) {
                this.state.leftButtonDisabled = true;
                this.state.rightButtonDisabled = false;
            }
            else if (this.props.photoBoxArray.indexOf(imgUrl) === (this.props.photoBoxArray.length - 1)) {
                this.state.leftButtonDisabled = false;
                this.state.rightButtonDisabled = true;
            }
            else {
                this.state.leftButtonDisabled = false;
                this.state.rightButtonDisabled = false;
            }

            const checkRating = this.state.stars.find(x => x.imgID === imgUrl)
            let currentRating = 0
            let found = false
        
            if (checkRating) {
                found = true;
                const ratingArray = checkRating.starRating
                const ratingIndex = ratingArray.length-1
                currentRating = parseInt(ratingArray[ratingIndex][4])
            }
            else {
                found=false;
            }

            if (found) {
                for (let i=1; i< currentRating+1; i++) {
                    document.getElementById(`starRating${i}`).style.filter = 'grayscale(0%)'
                }

                for (let i=currentRating + 1;i<6; i++) {
                    document.getElementById(`starRating${i}`).style.filter = 'grayscale(100%)'
                }
            }
            else {
                for (let i=1;i<6; i++) {
                    document.getElementById(`starRating${i}`).style.filter = 'grayscale(100%)'
                }
            } 


            const checkCaption = this.state.captions.find(x => x.imgID === imgUrl)
        
            if (checkCaption) {
                document.getElementById('captionInput').value = checkCaption.caption
            }
            else {
                document.getElementById('captionInput').value = ''
            }

            this.setState({imgUrlTemp: imgUrl})
            setTimeout(function() {document.getElementById("captionInput").focus()},100)
        } 

    togglePopUpOff(imgUrl) {
            this.setState({dialogStyle: {display: 'none'}})
            this.setState({popUpVisible:false})
    }

    handleRemove() {
        this.props.onRemove(this.state.imgUrlTemp)
        this.setState({popUpVisible:false})
        this.setState({dialogStyle: {display: 'none'}})
    }

    handleLeft() {
        this.props.moveLeft(this.state.imgUrlTemp)
        if (this.props.photoBoxArray.indexOf(this.state.imgUrlTemp) === 0) {
            this.state.leftButtonDisabled = true;
        }
        else {
            this.state.leftButtonDisabled = false;
        }
    }

    handleRight() {
        this.props.moveRight(this.state.imgUrlTemp)
        if (this.props.photoBoxArray.indexOf(this.state.imgUrlTemp) === (this.props.photoBoxArray.length - 1)) {
            this.state.rightButtonDisabled = true;
        }
        else {
            this.state.rightButtonDisabled = false;
        }
    }

    handleStarRate(e) {
        const rating = parseInt(e.target.value)
        let newStarContainer = []
        let newStarArray = this.state.stars
        const imgUrl = this.state.imgUrlTemp

        for (let i=1; i< rating+1; i++) {
            document.getElementById(`starRating${i}`).style.filter = 'grayscale(0%)'
            newStarContainer.push("star" + i)
        }
        for (let i=rating + 1;i<6; i++) {
            document.getElementById(`starRating${i}`).style.filter = 'grayscale(100%)'
        }
        
        let found = false;
        let foundAt = 0;

        for (let i=0; i<newStarArray.length;i++) {
            if (newStarArray[i].imgID === imgUrl) {
                found = true
                foundAt = i;
                break;        
            }
        }

        if (found) {
            //logic to change existing star rating
            newStarArray[foundAt].starRating = newStarContainer
        }
        else {
            //logic to add new star rating
            newStarArray.push({
                imgID: imgUrl,
                starRating: newStarContainer
            })
        }

        this.setState({stars: newStarArray})    
    }

    setCaption(e) {
    
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
    }

    clearRating() {
        const newStars = this.state.stars.filter(x => x.imgID !== this.state.imgUrlTemp)
        this.setState({stars: newStars})
        for (let i=1;i<6; i++) {
            document.getElementById(`starRating${i}`).style.filter = 'grayscale(100%)'
        }
    }

    handleKeyUp(e) {
        if (e.keyCode === 13) {
            this.togglePopUpOff()
        }
    }

    base64Converter () {            
        const imgs = document.querySelectorAll('img')
        for (let i=0;i<imgs.length;i++) {
        fetch(imgs[i].src)
          .then(res => res.blob())
          .then(blob => new Promise((resolve, reject) => {
              const reader = new FileReader;
              reader.onerror = reject;
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(blob);
            })
          )
          .then(dataURL => {
            imgs[i].src = dataURL
          })
        }
        }

    generateImg() {
        // html2canvas(document.getElementById('Collage'),{useCORS: true}).then(function(canvas) {
            // document.body.appendChild(canvas);
        // });

        this.base64Converter()
        setTimeout(function(){
            html2canvas(document.body)
            .then(function(canvas) {
                document.body.appendChild(canvas);
            })
        }, 5000)        
    }

        // const divText = document.getElementById('Collage').outerHTML
        // const newWindow = window.open("", "")
        // const doc = newWindow.document
        // doc.open()
        // doc.write(divText)
        // doc.close()

    render() {
        let i = 1
        return (
           <div id='PhotoBoxContainer' style={this.props.loadContent}>
               <div id='PhotoBoxHeader'>
                    <h2 id='customiseHeader'>CUSTOMISE YOUR COLLAGE</h2>
                    <div id='customiseInstructions'>
                        <div>
                            Click any book to... 
                        </div>
                        <div>
                            <img className='instructionalIcons' src={lefticon}/>
                            move it 
                            <img className='instructionalIcons' src={righticon}/>
                        </div>
                        <div>
                            remove it
                            <img className='instructionalIcons' src={removeicon}/>
                        </div>
                        <div>
                            add a star rating<br/>
                            <img className='instructionalIcons' src={star} />                  
                            <img className='instructionalIcons' src={star} />                  
                            <img className='instructionalIcons' src={star} />                  
                            <img className='instructionalIcons' src={star} />                  
                        </div>
                        <div>
                            or add a 
                            <img id='exampleCaption' src={caption} /> 
                            !
                        </div>
                    </div>
                    <div id='customiseOptions'>
                    <Customise displayChange={this.displayChange} alignmentChange={this.alignmentChange} bgColorChange={this.bgColorChange} titleChange={this.titleChange} fontSizeChange={this.fontSizeChange} fontFaceChange={this.fontFaceChange} fontColorChange={this.fontColorChange} backgroundTypeChange={this.backgroundTypeChange} captionFontFaceChange={this.captionFontFaceChange} captionFontSizeChange={this.captionFontSizeChange} />
                    </div>
                </div>

                <div id='Collage'>
                    <p id='collageTitle'></p>
                    <div id='PhotoBox'>
                        {
                        this.props.photoBoxArray.map(item => {
                        return <PhotoBoxItem imgUrl={item} togglePopUp={this.togglePopUp} stars={this.state.stars} captions={this.state.captions} updateImgToggleArray={this.props.updateImgToggleArray} />
                        })
                        }
                    </div>
                </div>

                {/* <button onClick={this.generateImg}>Save Image</button> */}

                <div id='popUpDialog' style={this.state.dialogStyle}>
                   <div id='showBook'>
                       <img src={this.state.imgUrlTemp}/>
                   </div>
                   
                   <div id='showOptions'>
                        <button className="optionButton" onClick={this.handleRemove}>
                            <img className='optionIcon' src={removeicon} />
                            &nbsp; Remove Book
                        </button>
                        
                        <div id='moveBook'>
                            <button className="optionButton" onClick={this.handleLeft} disabled={this.state.leftButtonDisabled}>
                                <img className='optionIcon' src={lefticon}/>
                                &nbsp; Move Left
                            </button>
                            <button className="optionButton" onClick={this.handleRight} disabled={this.state.rightButtonDisabled}>
                                Move Right &nbsp;
                                <img className='optionIcon' src={righticon}/>
                            </button>
                        </div>
                   
                        <div id='setCaption'>
                            <input id='captionInput' class='optionSelectors' type='text' placeholder='Add a caption (optional)' onChange={this.setCaption} onKeyUp={this.handleKeyUp}></input>
                        </div>

                        <p id='starRatingPara'>Set a star rating for this book</p>
                       <div id='starRating'>
                       <label>
                            <input className='radioButton' type="radio" name='starRatingInput' value='1' onClick={this.handleStarRate}/>
                            <img id='starRating1' className='starRatingIcon' src={star}  />
                        </label>
                   
                        <label>
                            <input className='radioButton' type="radio" name='starRatingInput' value='2' onClick={this.handleStarRate} />
                            <img id='starRating2' className='starRatingIcon' src={star} />
                        </label>
                   
                        <label>
                            <input className='radioButton' type="radio" name='starRatingInput' value='3' onClick={this.handleStarRate} />
                            <img id='starRating3' className='starRatingIcon' src={star} />
                        </label>
                        
                        <label>
                            <input className='radioButton' type="radio" name='starRatingInput' value='4' onClick={this.handleStarRate} />
                            <img id='starRating4' className='starRatingIcon' src={star} />
                        </label>
                    
                        <label>
                            <input className='radioButton' type="radio" name='starRatingInput' value='5' onClick={this.handleStarRate} />
                            <img id='starRating5' className='starRatingIcon' src={star} />
                        </label>
                   
                        <p className='starRatingP'>1</p>
                        <p className='starRatingP'>2</p>
                        <p className='starRatingP'>3</p>
                        <p className='starRatingP'>4</p>
                        <p className='starRatingP'>5</p>
                        </div> 
                        <button id='clearRating' onClick={this.clearRating}>Clear star rating</button>

                        <span id='iconHolder'>
                            <img src={closeicon} id='closeIcon' onClick={this.togglePopUpOff}/>
                        </span>
                   </div>
                   </div>
            </div>      
        )
    }
}
