import { ToastProgrammatic } from 'buefy'

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
