import helix, {html, log} from '../../../src'

function links ({
  onRouteClick,
}) {
  return html`
    <div>
      <a style='margin-right: 10px;' href='/'>view one</a>
      <a style='margin-right: 10px;' href='/bar?a=123&b=345'>view two ?a=123&b=345</a>
      <a style='margin-right: 10px;' href='/bar/123'>view three (123)</a>
      <a style='margin-right: 10px;' href='/bar/456'>view three (456)</a>
      <a style='margin-right: 10px;' href='/bar/789'>view three (789)</a>
      <a style='margin-right: 10px;' onclick=${() => onRouteClick('/bar/abc')}>view three (abc)</a>
      <a style='margin-right: 10px;' onclick=${() => onRouteClick('/bar/def')}>view three (def)</a>
      <a style='margin-right: 10px;' onclick=${() => onRouteClick('/bar/def?a=123&b=345')}>view three (def) ?a=123&b=345</a>
    </div>
  `
}

function viewOne (state, prev, actions) {
  return html`
    <div>
      ${links({
        onRouteClick: path => actions.location.set(path),
      })}
      <h1>view one</h1>
      ${state.title}
      <div>
        <input value=${state.title} oninput=${(e: any) => actions.set(e.target.value)} />
      </div>
    </div>
  `
}
function viewTwo (state, prev, actions) {
  console.log(state.location.params)
  return html`
    <div>
      ${links({
        onRouteClick: path => actions.location.set(path),
      })}
      <h1>view two</h1>
      ${state.title}
      <div>
        <input value=${state.title} oninput=${(e: any) => actions.set(e.target.value)} />
      </div>
    </div>
  `
}
function viewThree (state, prev, actions) {
  console.log(state.location.params)
  return html`
    <div>
      ${links({
        onRouteClick: path => actions.location.set(path),
      })}
      <h1>view three ${state.location.params.baz}</h1>
      ${state.title}
      <div>
        <input value=${state.title} oninput=${(e: any) => actions.set(e.target.value)} />
      </div>
    </div>
  `
}

const mount = document.createElement('div')
document.body.appendChild(mount)

helix({
  model: {
    state: {
      title: 'not set',
    },
    reducers: {
      set (state, title) {
        return Object.assign({}, state, {
          title: title,
        })
      },
    },
    models: {
      counter: {
        scoped: true,
        state: {
          count: 1,
        },
        reducers: {
          increment (state, amount) {
            return {
              count: state.count + (amount || 1),
            }
          },
        },
        effects: {
          incrementAsync (state, actions) {
            setTimeout(() => {
              actions.increment(5)
            }, 1000)
          },
        },
        models: {
          secondTitle: {
            scoped: true,
            state: {
              title: 'hey',
            },
            reducers: {
              update (state, title) {
                return {
                  title: title,
                }
              },
            },
          },
        },
      },
      foo: {
        state: {
          bar: 'baz',
        },
      },
    },
  },
  routes: {
    '': viewOne,
    'bar': {
      onEnter (state, prev, actions) {
        // actions.set('You have entered bar')
        console.log('bar onEnter', state.location.pathname)
        console.log('---------')
      },
      onUpdate (state, prev, actions) {
        // actions.set('You have updated bar')
        console.log('bar onUpdate', state.location.pathname)
      },
      onLeave (state, prev, actions) {
        // actions.set('You have left bar')
        console.log('bar onLeave', state.location.pathname)
      },
      view: viewTwo,
    },
    'bar/:baz': {
      onEnter (state, prev, actions) {
        // actions.set(`You have entered bar:/baz ${state.location.params.baz}`)
        console.log('bar/:baz onEnter', state.location.pathname)
        console.log('---------')
      },
      onUpdate (state, prev, actions) {
        // actions.set(`You have updated bar:/baz ${state.location.params.baz}`)
        console.log('bar/:baz onUpdate', state.location.pathname)
      },
      onLeave (state, prev, actions) {
        // actions.set(`You have left bar:/baz ${state.location.params.baz}`)
        console.log('bar/:baz onLeave', state.location.pathname)
      },
      view: viewThree,
    },
  },
  mount,
  plugins: [log],
})
