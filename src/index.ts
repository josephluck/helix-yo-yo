import helix, {log as helixLog} from 'helix-js'

import * as yoyo from 'yo-yo'
export const html = yoyo
export const log = helixLog

function renderer (dom) {
  let _dom = dom
  return function (node, state, prev, actions) {
    if (node) {
      _dom = html.update(_dom, node(state, prev, actions))
    }
  }
}

export default function (opts) {
  const config = Object.assign({}, opts, {
    render: renderer(opts.mount),
  })
  return helix(config)
}
