import { ToastProgrammatic } from 'buefy'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function({ $axios }: { $axios: NuxtAxiosInstance }) {
  $axios.onError((error) => {
    if (error.request.responseURL.endsWith('/user') && error.response?.status === 403) return;
    ToastProgrammatic.open({
      message: error.response?.data.message ?? error.response?.statusText ?? 'Failed Request to the Server.',
      type: 'is-danger'
    })
    return Promise.resolve(false)
  })
}
