import Snap from 'snapsvg'
import circlePathPlugin from './circlePath-plugin'
import detectIE from './detectIE'
import EventEmitter from './EventEmitter'

Snap.plugin(circlePathPlugin)

class SvgProductIngredients extends EventEmitter {
  constructor (svgElement, imageSrc, svgViewBoxSize) {
    super()

    if (!svgElement) throw `Svg element doesn't exists.`
    this.svgViewBoxSize = svgViewBoxSize || { width: 850, heigth: 500 }

    this.ingredients = []
    this.currentIngredientNr = 0

    this.svgElement = svgElement
    this.svgElementWrapper = this.svgElement.parentElement
    this.imageSrc = imageSrc

    this.snapSvg = Snap(this.svgElement)
    // this.snapSvg.attr({ viewBox: `0 0 ${this.svgElementWrapper.offsetWidth} ${this.svgElementWrapper.offsetHeight}` })
    this.snapSvg.attr({ viewBox: `0 0 ${this.svgViewBoxSize.width} ${this.svgViewBoxSize.height}` })
    // this.snapSvg.attr({ viewBox: `0 0 850 500` })
    this.emit('init')
  }
  addIngredient (ingredient) {
    const fullText = `${ingredient.name} (${ingredient.qty})`
    const textPadding = ingredient.circle.radius + 7
    const circlePath = this.snapSvg.circlePath(ingredient.circle.x, ingredient.circle.y, textPadding).attr({
      fill: 'none'
    })

    const textStart = ingredient.circle.start + Math.round(Math.PI * ingredient.circle.radius) / 4 // start from top of circle
    const svgCircle = this.snapSvg.circle(ingredient.circle.x, ingredient.circle.y, ingredient.circle.radius)
    const svgText = this.snapSvg.text(textStart, 0, fullText).attr('textpath', circlePath)
    const offset = detectIE() === false ? textStart / (Math.PI * 2 * ingredient.circle.radius) * 100 : 0

    svgText.textPath.attr({ startOffset: offset + '%' })
    const nextIngredientNr = document.querySelectorAll(`[data-name="ingredient"]`).length + 1
    const addedIngredient = this.snapSvg.g(svgCircle, svgText).attr({
      'data-nr': nextIngredientNr,
      'data-name': 'ingredient'
    })

    addedIngredient.click(el => {
      const ingredientNr = Number(el.target.parentElement.attributes['data-nr'].value)
      this.selectIngredient(ingredientNr)
    })
  }
  addIngredients (ingredients) {
    ingredients.forEach(ingredient => this.addIngredient(ingredient))
    this.emit('ingredients.add', ingredients)
    this.setProductImage(.6)
    this.selectIngredient(1)
  }
  setProductImage (scale) {
    scale = scale || 1
    if (this.image) this.image.remove()

    let tempImgElement = detectIE() ? new Image() : document.createElement('img')
    tempImgElement.src = this.imageSrc
  
    tempImgElement.onload = () => {
      // const scale = tempImgElement.width / this.svgElementWrapper.offsetWidth
      const imgWidth = tempImgElement.width * scale
      const imgHeight = tempImgElement.height * scale
      const imgXOffset = this.svgViewBoxSize.width / 2 - imgWidth / 2
      const bottomPadding = 10
      const imgYOffset = this.svgViewBoxSize.height - imgHeight - bottomPadding

      this.image = this.snapSvg.image(this.imageSrc, imgXOffset, imgYOffset, imgWidth, imgHeight)

      this.emit('image.add', this.image)
    }
  }
  selectIngredient (nr) {
    if (nr === this.currentIngredientNr) return
    document.querySelectorAll(`[data-name="ingredient"]`).forEach(el => el.classList.remove('active'))
    document.querySelector(`[data-name="ingredient"][data-nr="${nr}"]`).classList.add('active')
    this.currentIngredientNr = nr
    this.emit('ingredients.select', nr)
  }
}

export default SvgProductIngredients
