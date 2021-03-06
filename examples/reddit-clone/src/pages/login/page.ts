import {html} from '../../../../../src'
import base from '../base'
import textfield from '../../components/textfield'
import form from '../../components/form'

function page (state, prev, actions) {
  let pageState = state.pages.login
  let pageActions = actions.pages.login

  function updateFormField (key) {
    return function (e) {
      pageActions.form.setField(key, e.target.value)
    }
  }

  return html`
    <div>
      ${form({
        onsubmit () {
          pageActions.submit(pageState.form.username, pageState.form.password)
        },
        submitText: 'Login',
        oncancel () {
          pageActions.reset()
          actions.location.set('/')
        },
        child: html`
          <div>
            ${textfield({
              label: 'Username',
              value: pageState.form.username,
              oninput: updateFormField('username'),
            })}
            ${textfield({
              label: 'Password',
              value: pageState.form.password,
              type: 'password',
              oninput: updateFormField('password'),
            })}
          </div>
        `,
      })}
    </div>
  `
}

export default function () {
  return {
    view: base(page),
  }
}
