'use strict'

import {Engine, acorn, Renderer, MouseEventHandler} from 'way-of-life'

const canvasSelector = '#universe'
const desiredFPS = 30
const pixelsPerCell = 5
const strokeStyle = 'rgba(62,134,147,0.5)'
const fillStyle = 'rgba(104,167,179,0.5)'

window.onload = () => {
  const canvas = document.querySelector(canvasSelector)

  const width = ~~(canvas.clientWidth / pixelsPerCell)
  const height = ~~(canvas.clientHeight / pixelsPerCell)
  const engine = new Engine(width, height)

  const renderer = new Renderer(canvas, engine, {
    desiredFPS,
    pixelsPerCell,
    strokeStyle,
    fillStyle
  })

  // starting position at the center, hence divide by 2
  acorn(engine, ~~(height / 2), ~~(width / 4))
  acorn(engine, ~~(height / 2), ~~(width * 3 / 4))
  acorn(engine, 0, 0)

  // mouse events
  const playPauseToggle = event => {
    renderer.togglePlay()
    event.target.textContent = event.target.textContent === 'Pause' ? 'Play' : 'Pause'
  }
  const hideContentToggle = event => {
    var content = document.querySelector('.text-content')
    content.classList.toggle('hidden')
    event.target.textContent = event.target.textContent === 'Hide text' ? 'Show text' : 'Hide text'
  }
  const events = new MouseEventHandler(canvas, engine, renderer)


  // start
  renderer.start()
}
