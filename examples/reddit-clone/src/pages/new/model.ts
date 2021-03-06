import api from '../../api'
import form from '../../model/form'

export default function model () {
  return {
    state: {},
    reducers: {
      reset () {
        return {}
      },
    },
    effects: {
      submit (state, actions, title, content) {
        return api.newPost(title, content)
          .then(post => {
            actions.location.set(`/posts/${post.uuid}`)
            actions.alert.showSuccess('Post saved')
          }, err => actions.alert.showError(err))
      },
    },
    models: {
      form: form({
        title: '',
        body: '',
      }),
    },
  }
}
