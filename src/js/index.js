import '../scss/main.scss'
import SvgProductIngredients from './SvgProductIngredients'

const appleIngredients = [
  {
    name: 'Błonnik pokarmowy',
    qty: '2,4 g',
    circle: { x: 620, y: 270, radius: 200, start: 0 }
  },
  {
    name: 'Witamina A',
    qty: '54 I.U.',
    circle: { x: 600, y: 300, radius: 160, start: 30 }
  },
  {
    name: 'Witamina E',
    qty: '0,18 mg',
    circle: { x: 250, y: 280, radius: 200, start: -90 }
  },
  {
    name: 'Witamina K1',
    qty: '2,2 µg',
    circle: { x: 250, y: 310, radius: 150, start: -70 }
  },
  {
    name: 'Witamina C',
    qty: '4,6 mg',
    circle: { x: 270, y: 330, radius: 120, start: -50 }
  },
  // {
  //   name: 'Witamina B1',
  //   qty: '0,017 mg',
  //   circle: { x: 290, y: 440, radius: 90, start: -10, fliptext: true }
  // }
]

const svgElement = document.querySelector('.product__svg')
const productViewer = new SvgProductIngredients(svgElement, 'assets/apple.png')
productViewer.on('ingredients.add', ingredients => console.log('ingredients add', ingredients))
productViewer.addIngredients(appleIngredients)