import helix from 'helix-js'
import html, { renderer } from '../../../src'
import model from './model'
import pages from './pages'

const mount = document.createElement('div')
document.body.appendChild(mount)

const app = helix({
  model: model(),
  routes: pages(),
  render: renderer(mount),
})
