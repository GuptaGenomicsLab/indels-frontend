import { wrapProperty } from '@nuxtjs/composition-api'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export const useAuth = wrapProperty('$auth', false);
export const useAxios: (() => NuxtAxiosInstance) = wrapProperty('$axios', false);
