# Svg Project Ingredients

[![Build Status](https://travis-ci.org/barthicus/svg-project-ingredients.svg?branch=master)](https://travis-ci.org/barthicus/svg-project-ingredients)

**Svg Project Ingredients** is a js library that allows you to visualise product ingredients as SVG object. Library draws circles with some text on given coord (x, y) under the product image.   
User can interract with circles such as clicking on them and read additional info about give ingredient.

Demo online: [barthicus.github.io/svg-project-ingredients]

#### Table of Contents
- [Tools used](#tools-used)
- [Library details](#library-details)
- [Init](#init)
- [Methods](#methods)
- [Events](#events)
- [ToDo](#todo)
- [Development](#development)

## Tools used
- [Snap.svg] (JS SVG library)
- Bulma.css (css framework - optional, only for esthetics)
- tiny-slider (ingredients slider - optional, you can choose anything thanks to events emiited by lib)

## Library details
Source of library can be found in src/SvgProductIngredients/index.js
It extends event emitter to subscribe and emit [events](#events).  
This library creates an svg object with product image in a center and ingridients circles under them.  

## Init

```javascript
new SvgProductIngredients(svgElement, productImageSrc, viewBoxSize)
```
The `new SvgProductIngredients` constructor requires at least 2 parameters:
- svg html element
- product image url
- optional: svg viewbox size object, default is: `{width: 850, height: 500}`

## Methods

There are three available methods:
- addIngredient(ingredientObject)
- addIngredients(arrayOfIngredientObjects)
- selectIngredient(nr)

Example method: add ingridients.
```javascript
productViewer.addIngredients(appleIngredients)
```

Ingridients param has to be an array of JS objects containing given properties:
<dl>
  <dt><b>name</b></dt>
  <dd>ingridient name visible on circle</dd>
  <dt><b>qty</b></dt>
  <dd>ingridient qunatity visible near to name on circle</dd>
  <dt><b>circle</b></dt>
  <dd>Information about circle on svg (position, radius and start text position).<br>Circle start param set to 0 means that text will start on a top o the circle.</dd>
  <dt>link</dt>
  <dd>link to ingridient (optional)</dd>
  <dt>desc</dt>
  <dd>ingridient description (optional)</dd>
</dl>

Example ingridient should looks like this:
```javascript
const firstIngridient = {
  name: 'Dietary fiber',
  link: 'https://en.wikipedia.org/wiki/Dietary_fiber',
  desc: 'Some description.',
  qty: '2,4 g',
  circle: { x: 620, y: 270, radius: 200, start: 0 }
}
```

## Events

There are few events to subscribe:
- init()
- ingredients.add(ingredientsArray)
- ingredients.select(ingredientNr)
- image.add(snapSvgImage)

Example of subscribing to `ingridients.select` event (emitted when user clicks an circle):
```javascript
productViewer.on('ingredients.select', ingredientNr => doSomething())
```

## ToDo

There is a lot of things that can be changed or fixed:
- exclude library necessary styles from demo and inject into library
- protect some library provate functions and expose only public ones
- add removeIngredient() method
- add auto-positioning functionality for ingridients
- add more events

## Development

This demo project is build by webpack with eslint and few other helpers.

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

[barthicus.github.io/svg-project-ingredients]: <https://barthicus.github.io/svg-project-ingredients>
[Snap.svg]: <http://snapsvg.io>