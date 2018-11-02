import '../scss/main.scss'
import { tns } from 'tiny-slider/src/tiny-slider'
import SvgProductIngredients from './SvgProductIngredients'

const appleIngredients = [
  {
    enName: 'Dietary fiber',
    link: 'https://en.wikipedia.org/wiki/Dietary_fiber',
    desc: 'Dietary fiber or roughage is the portion of plant-derived food that cannot be completely broken down by digestive enzymes. Dietary fiber consists of non-starch polysaccharides and other plant components such as cellulose, resistant starch, resistant dextrins, inulin, lignins, chitins, pectins, beta-glucans, and oligosaccharides.',
    qty: '2,4 g',
    circle: { x: 620, y: 270, radius: 200, start: 0 }
  },
  {
    enName: 'Vitamin A',
    link: 'https://en.wikipedia.org/wiki/Retinol',
    desc: 'Retinol, also known as Vitamin A1, is a vitamin found in food and used as a dietary supplement. As a supplement it is used to treat and prevent vitamin A deficiency, especially that which results in xerophthalmia. In areas where deficiency is common, a single large dose is recommended to those at high risk a couple of times a year.',
    qty: '54 I.U.',
    circle: { x: 600, y: 300, radius: 160, start: 30 }
  },
  {
    enName: 'Vitamin E',
    link: 'https://en.wikipedia.org/wiki/Vitamin_E',
    desc: 'Vitamin E is a group of eight fat soluble compounds that include four tocopherols and four tocotrienols. Vitamin E deficiency, which is rare and usually due to an underlying problem with digesting dietary fat rather than from a diet low in vitamin E, can cause nerve problems. The crucial function played by Vitamin E that makes it a vitamin is poorly understood, but may involve antioxidant functions in cell membranes.',
    qty: '0,18 mg',
    circle: { x: 250, y: 280, radius: 200, start: -90 }
  },
  {
    enName: 'Vitamin K1',
    link: 'https://en.wikipedia.org/wiki/Phytomenadione',
    desc: 'Phytomenadione, also known as vitamin K1 or phylloquinone, is a vitamin found in food and used as a dietary supplement. As a supplement it is used to treat certain bleeding disorders. This includes in warfarin overdose, vitamin K deficiency, and obstructive jaundice. It is also recommended to prevent and treat hemorrhagic disease of the newborn. Use is typically recommended by mouth or injection under the skin.',
    qty: '2,2 µg',
    circle: { x: 250, y: 310, radius: 150, start: -70 }
  },
  {
    enName: 'Vitamin C',
    link: 'https://en.wikipedia.org/wiki/Vitamin_C',
    desc: 'Vitamin C, also known as ascorbic acid and L-ascorbic acid, is a vitamin found in food and used as a dietary supplement. The disease scurvy is prevented and treated with vitamin C-containing foods or dietary supplements. Evidence does not support use in the general population for the prevention of the common cold. There is, however, some evidence that regular use may shorten the length of colds.',
    qty: '4,6 mg',
    circle: { x: 270, y: 330, radius: 120, start: -50 }
  },
  // {
  //   name: 'Vitamin B1',
  //   qty: '0,017 mg',
  //   circle: { x: 290, y: 440, radius: 90, start: -10, fliptext: true }
  // }
]

const svgElement = document.querySelector('.product__svg')
const productViewer = new SvgProductIngredients(svgElement, 'assets/apple.png', {width: 850, height: 500})
const sliderContainer = document.querySelector('.ingredients__items')
let slider = null

const initSlider = container => {
  return tns({
    container,
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    mouseDrag: true,
    controlsText: ['⭠ Prev', 'Next ⭢']
  })
}

const addSlides = ingredients => {
  ingredients.forEach(ingredient => {
    const slide = document.createElement('div')
    const enTitle = document.createElement('h3')
    const link = document.createElement('a')
    const desc = document.createElement('p')

    enTitle.innerText = `${ingredient.enName} (${ingredient.qty})`
    link.href = ingredient.link
    link.innerText = 'more on wikipedia'
    link.setAttribute('target', '_blank')
    desc.innerText = ingredient.desc
    
    slide.append(enTitle, link, desc)
    slide.classList.add('ingredients__item')
    sliderContainer.append(slide)
  })
}

productViewer.on('ingredients.add', ingredients => {
  addSlides(ingredients)
  slider = initSlider(sliderContainer)
})
productViewer.on('ingredients.select', ingredientNr => slider.goTo(ingredientNr - 1))
productViewer.addIngredients(appleIngredients)

document.querySelector('[data-controls="prev"').classList.add('button')
document.querySelector('[data-controls="next"').classList.add('button')

slider.events.on('indexChanged', slider => {
  if (slider.index === 0 || slider.index > slider.slideCount) return
  productViewer.selectIngredient(slider.index)
})