import {html} from '../../../../../src'

import base from '../base'
import textfield from '../../components/textfield'
import textarea from '../../components/textarea'
import form from '../../components/form'

function page (state, prev, actions) {
  let pageState = state.pages.newPost
  let pageActions = actions.pages.newPost

  function updateFormField (key) {
    return function (e) {
      pageActions.form.setField(key, e.target.value)
    }
  }

  return html`
    <div>
      ${form({
        onsubmit () {
          pageActions.submit(pageState.form.title, pageState.form.body)
        },
        submitText: 'Save post',
        oncancel () {
          actions.location.set('/')
          pageActions.reset()
        },
        child: html`
          <div>
            ${textfield({
              label: 'Title',
              value: pageState.form.title,
              oninput: updateFormField('title'),
            })}
            ${textarea({
              label: 'Body',
              value: pageState.form.body,
              oninput: updateFormField('body'),
            })}
          </div>
        `,
      })}
    </div>
  `
}

export default function () {
  return {
    onEnter (state, prev, actions) {
      if (!state.user.user) {
        actions.location.set(`/login?redirect=${state.location.pathname}`)
        actions.alert.showError('You must be logged in')
      }
    },
    view: base(page),
  }
}
