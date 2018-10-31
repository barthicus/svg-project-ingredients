import Snap from 'snapsvg'
import circlePathPlugin from './circlePath-plugin'
import detectIE from './detectIE'
import EventEmitter from './EventEmitter'

Snap.plugin(circlePathPlugin)

class SvgProductIngredients extends EventEmitter {
  constructor (svgElement, imageSrc) {
    super()

    if (!svgElement) throw `Svg element doesn't exists.`

    this.ingredients = []

    this.svgElement = svgElement
    this.svgElementWrapper = this.svgElement.parentElement
    this.imageSrc = imageSrc

    this.snapSvg = Snap(this.svgElement)
    this.snapSvg.attr({ viewBox: `0 0 ${this.svgElementWrapper.offsetWidth} ${this.svgElementWrapper.offsetHeight}` })
    this.emit('init')
  }
  addIngredient (ingredient) {
    const fullText = `${ingredient.name} (${ingredient.qty})`
    const textPadding = ingredient.circle.flipText ? ingredient.circle.radius + 19 : ingredient.circle.radius + 7
    const circlePath = this.snapSvg.circlePath(ingredient.circle.x, ingredient.circle.y, textPadding).attr({
      fill: 'none'
    })

    let textStart = ingredient.circle.start
    if (ingredient.circle.flipText) {
      circlePath.transform('s1,-1') // flip path to show text correctly
      textStart = -textStart
    }
    // textStart = 0
    textStart += Math.round(Math.PI * ingredient.circle.radius) / 4 // start from top of circle
    // textStart = detectIE() ? 0 : textStart

    const svgCircle = this.snapSvg.circle(ingredient.circle.x, ingredient.circle.y, ingredient.circle.radius)
    const svgText = this.snapSvg.text(textStart, 0, fullText).attr('textpath', circlePath)
    // const svgText2 = this.snapSvg.text(textStart, 0, ingredient.qty).attr('textpath2', circlePath)
    const offset = detectIE() === false ? textStart / (Math.PI * 2 * ingredient.circle.radius) * 100 : 0

    svgText.textPath.attr({ startOffset: offset + '%' })
    this.snapSvg.g(svgCircle, svgText).attr({
      // 'nr': nr,
      'data-aos': 'fade',
      'data-aos-duration': 1000,
      // 'data-aos-delay': nr * 100,
      // 'data-is-preselected': isPreselected
    })

    // set slide
    // ingredient.click(function(){
    //   var productName = $(this.snapSvg.node).closest('.product').data('name')
    //   var ingredientNr = this.attr('nr')
    //   /*svg.selectAll('g').forEach(function(el){
    //     el.node.classList.remove('active')
    //   })
    //   this.node.classList.add('active')*/
    //   sliders[productName].trigger('to.owl.carousel', ingredientNr - 1)
    // })
  }
  addIngredients (ingredients) {
    // this.ingredients = ingredients
    ingredients.forEach(ingredient => this.addIngredient(ingredient))
    this.setProductImage()
    this.emit('ingredients.add', ingredients)
  }
  setProductImage () {
    if (this.image) this.image.remove()

    let tempImgElement = detectIE() ? new Image() : document.createElement('img')
    tempImgElement.src = this.imageSrc
  
    tempImgElement.onload = () => {
      const scale = tempImgElement.width / this.svgElementWrapper.offsetWidth
      const imgWidth = tempImgElement.width * scale
      const imgHeight = tempImgElement.height * scale
      const imgXOffset = this.svgElementWrapper.offsetWidth / 2 - imgWidth / 2
      const bottomPadding = 10
      const imgYOffset = this.svgElementWrapper.offsetHeight - imgWidth - bottomPadding

      this.image = this.snapSvg.image(this.imageSrc, imgXOffset, imgYOffset, imgWidth, imgHeight)

      this.emit('image.add', this.image)
    }
  }
}

export default SvgProductIngredients
