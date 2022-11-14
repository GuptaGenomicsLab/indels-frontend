import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {computed, getCurrentInstance} from 'vue'

const wrapProperty = (property, makeComputed = true) => () => {
  const vm = getCurrentInstance()!.proxy
  return makeComputed ? computed(() => vm[property]) : vm[property]
}

export const useAuth = wrapProperty('$auth', false);
export const useAxios: (() => NuxtAxiosInstance) = wrapProperty('$axios', false);
