import helix from '../../../src'
import model from './model'
import pages from './pages'

const mount = document.createElement('div')
document.body.appendChild(mount)

helix({
  model: model(),
  routes: pages(),
  mount,
})
