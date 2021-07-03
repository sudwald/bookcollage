captionFontSizeChange(size) {
  if (this.state.captions.length > 0) {
      document.querySelectorAll("div.captionLabel").style.fontSize = `${size}px`
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