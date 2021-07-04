<div className='options'>
                    
{/* <div id='alignment'> */}
{/* <label>Alignment: </label> */}
{/* <select id='alignment' onChange={this.handleAlignmentChange}> */}
    {/* <option value='Left'>Left</option> */}
    {/* <option value='Centre'>Centre</option> */}
{/* </select> */}
{/* </div> */}

<div id='titleFont' className='optionDivs'>
<label className='optionLabels'>TITLE FONT</label>
<select className='optionSelectors' id='titleFontFace' onChange={this.handleFontFaceChange} >
    {/* <option value="" disabled selected>Font</option> */}
    <option id='Londrina' value='Londrina Solid'>Londrina</option>
    <option id='OpenSans' value='Open Sans'>Open Sans</option>
    <option id='Staatliches' value='Staatliches'>Staatliches</option>
    <option id='Arvo' value='Arvo'>Arvo</option>
    <option id='Yellowtail' value='Yellowtail'>Yellowtail</option>
    <option id='Pacifico' value='Pacifico'>Pacifico</option>
    <option id='IndieFlower' value='Indie Flower'>Indie Flower</option>
    <option id='AmaticSC' value='Amatic SC'>Amatic SC</option>
    <option id='ArchitectsDaughter' value='Architects Daughter'>Architects Daughter</option>
    <option id='Satisfy' value='Satisfy'>Satisfy</option>
    <option id='SpecialElite' value='Special Elite'>Special Elite</option>
    <option id='PermanentMarker' value='Permanent Marker'>Permanent Marker</option>
    <option id='Parisienne' value='Parisienne'>Parisienne</option>
    <option id='SpecialElite' value='Special Elite'>Special Elite</option>
    <option id='LuckiestGuy' value='Luckiest Guy'>Luckiest Guy</option>
    <option id='Bangers' value='Bangers'>Bangers</option>
    <option id='RocknRollOne' value='RocknRoll One'>RocknRoll One</option>
</select>
</div>

<div id='titleFontSize' className='optionDivs'>
<label className='optionLabels'>TITLE FONT SIZE</label>
<select className='optionSelectors' id='titleFontSize' onChange={this.handleFontSizeChange} >
    {/* <option value='' disabled selected>Font Size</option> */}
    <option value='24'>Small</option>
    <option value='36'>Medium</option>
    <option value='48'>Large</option>
    <option value='72'>Extra-Large</option>
</select>
</div>

<div id='fontColour' className='optionDivs'>
<label className='optionSelectors'  className='optionLabels'>FONT COLOR: </label>
<input type='color' value='#000000' onChange={this.handleFontColorChange}/>
</div>

<div id='bgColour' className='optionDivs'>
    <label className='optionSelectors' className='optionLabels'>BACKGROUND COLOR: </label>
    <input id='bgColorSelector' type='color' value='#FFFFFF' onChange={this.handleBgColorChange}/>
</div>

<div id='bgType' className='optionDivs'>
<label className='optionLabels'>BACKGROUND PATTERN</label>
<select className='optionSelectors' id='backgroundType' onChange={this.handleBackgroundTypeChange} >
    {/* <option value="" disabled selected>Background Pattern</option> */}
    <option value='solid'>Solid</option>
    <option value='gradient'>Gradient</option>
    <option value='sparkle'>Sparkle</option>
    <option value='geoFlower'>Geometric Flowers</option>
    <option value='natFlower'>Natural Flowers</option>
    <option value='book'>Book</option>
    <option value='reading'>Reading</option>
    <option value='coffee'>Morning Coffee</option>
    <option value='geo1'>Geometric (1)</option>
    <option value='geo2'>Geometric (2)</option>
    <option value='geo3'>Geometric (3)</option>
    <option value='map'>World Map</option>
    <option value='beach'>Beach</option>
</select>
</div>

<div id='imagesPerRow' className='optionDivs'>
<label className='optionLabels'>IMAGES PER ROW</label>
<select className='optionSelectors' id='imgsPerRow' onChange={this.handleDisplayChange} >
    {/* <option value="" selected disabled>Images Per Row</option> */}
    <option value='10'>10</option>
    <option value='9'>9</option>
    <option value='8'>8</option>
    <option value='7'>7</option>
    <option value='6'>6</option>
    <option value='5'>5</option>
    <option value='4' selected>4</option>
    <option value='3'>3</option>
    <option value='2'>2</option>
    <option value='1'>1</option>
</select>
</div>

<div id='captionFont' className='optionDivs'>
<label className='optionLabels'>CAPTION FONT</label>
<select className='optionSelectors' id='captionFontFace' onChange={this.handleCaptionFontFaceChange} >
    {/* <option value="" disabled selected>Caption Font</option> */}
    <option id='Londrina' value='Londrina Solid'>Londrina</option>
    <option id='OpenSans' value='Open Sans'>Open Sans</option>
    <option id='Staatliches' value='Staatliches'>Staatliches</option>
    <option id='Arvo' value='Arvo'>Arvo</option>
    <option id='Yellowtail' value='Yellowtail'>Yellowtail</option>
    <option id='Pacifico' value='Pacifico'>Pacifico</option>
    <option id='IndieFlower' value='Indie Flower'>Indie Flower</option>
    <option id='AmaticSC' value='Amatic SC'>Amatic SC</option>
    <option id='ArchitectsDaughter' value='Architects Daughter'>Architects Daughter</option>
    <option id='Satisfy' value='Satisfy'>Satisfy</option>
    <option id='SpecialElite' value='Special Elite'>Special Elite</option>
    <option id='PermanentMarker' value='Permanent Marker'>Permanent Marker</option>
    <option id='Parisienne' value='Parisienne'>Parisienne</option>
    <option id='SpecialElite' value='Special Elite'>Special Elite</option>
    <option id='LuckiestGuy' value='Luckiest Guy'>Luckiest Guy</option>
    <option id='Bangers' value='Bangers'>Bangers</option>
    <option id='RocknRollOne' value='RocknRoll One'>RocknRoll One</option>
</select>
</div>

<div id='captionFontSize' className='optionDivs'>
<label className='optionLabels'>CAPTION FONT SIZE</label>
<select className='optionSelectors' id='captionFontSizeSelector' onChange={this.handleCaptionFontSizeChange} >
    {/* <option value='' disabled selected>Caption Font Size</option> */}
    <option value='12'>Small</option>
    <option value='14'>Medium</option>
    <option value='16'>Large</option>
    <option value='18'>Extra-Large</option>
</select>
</div>

</div>
</div>