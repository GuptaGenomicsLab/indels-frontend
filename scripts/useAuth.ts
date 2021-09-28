import { wrapProperty } from '@nuxtjs/composition-api'

export const useAuth = wrapProperty('$auth', false);
