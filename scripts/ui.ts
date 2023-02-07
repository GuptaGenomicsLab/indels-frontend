import {ToastProgrammatic} from 'buefy'

export function successToast(reason = 'Success.') {
  ToastProgrammatic.open({
    message: reason,
    type: 'is-success'
  })
}

export function rejectionToast(reason = 'Unknown Failure.') {
  ToastProgrammatic.open({
    message: reason,
    type: 'is-danger'
  })
}

export function copiedToClipboard() {
  ToastProgrammatic.open({
    message: 'Copied to Clipboard',
    type: 'is-success'
  })
}

export const HOMESCREEN_TEXT_KEY = 'HOMESCREEN_TEXT';
export const LOGIN_TEXT_KEY = 'LOGIN_TEXT';
export const ABOUT_TEXT_KEY = 'ABOUT_TEXT';
export const COPYRIGHT_TEXT_KEY = 'COPYRIGHT_TEXT';
export const DISCLAIMER_TEXT_KEY = 'DISCLAIMER_TEXT';
export const PRIVACY_TEXT_KEY = 'PRIVACY_TEXT';
export const SUPPORT_TEXT_KEY = 'SUPPORT_TEXT';
export const SUBMIT_TEXT_KEY = 'SUBMIT_TEXT';
export const INTERPRETATION_TEXT_KEY = 'INTERPRETATION_TEXT';
export const INTERPRETATION_TEXT_KEY_NEGATIVE = 'INTERPRETATION_TEXT_NEGATIVE_RESULT';
