<template>
  <main class='content-box'>
    <h1>Import a CSV File</h1>
    <p class='identity-explanation'>
      Upload a CSV of CSIs to supplement or replace the database.<br>
      Careful: this operation is potentially dangerous! Backing up the database (below) is strongly advised.
      <!--todo: add simple csv template-->
    </p>

    <form @submit.prevent>
      <b-field :type='error.type' :message='error.message'>
        <b-upload v-model='file'
                  accept='.csv'
                  rounded
                  expanded
                  drag-drop
                  required
        >
          <div v-if='file === null' class='upload-fill file-pending'>
            <b-icon icon='upload' size='is-large' />
            <p>Please upload a csv file.<br>Drag and drop your file or click here to upload.</p>
          </div>
          <div v-else-if='!isValid' class='upload-fill file-error' type='is-danger'>
            <b-icon icon='alert-circle' size='is-large' />
            <p>
              There's something wrong with this file!<br>
              Check the file type (.csv),<br>
              and click/drag to reupload.
            </p>
          </div>
          <div v-else class='upload-fill file-success'>
            <b-icon icon='checkbox-marked-circle' size='is-large' type='is-success' />
            <kbd>{{ file.name }}</kbd>
            <p>Success! File is ready for uploading.</p>
          </div>
        </b-upload>
      </b-field>
      <div class='button-container'>
        <b-button type='is-danger' size='is-medium' label='Replace Database' icon-left='table-refresh'
                  @click='() => submit("replace")' />
        <b-button type='is-success' size='is-medium' label='Append Additional' icon-left='table-row-plus-after'
                  @click='() => submit("append")' />
      </div>
    </form>
    <section v-if='showDetails' class='extra-options'>
      <hr />
      <h1>Export Database to CSV</h1>
      <p class='identity-explanation'>
        Click the button below to export all CSVs to a database.
        <br><br>
        This is useful for creating backups, and can be used as a template before importing CSIs.
      </p>
      <b-button type='is-success' icon-left='download' label='Download' expanded @click='download'/>
      <iframe id='download-frame' />
    </section>

  </main>
</template>

<script>
import { computed, reactive, ref, useRouter, watch } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'

export default {
  name: 'QueryPage',
  layout: 'authenticated',
  props: {
    showDetails: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const router = useRouter()
    const axios = useAxios()

    const file = ref(null)
    const form = reactive({
      mode: 'Auto',
      file: false
    })
    const isValid = computed(() => file?.value?.name.endsWith('.csv') ?? false)
    const error = reactive({ type: '', message: '' })

    watch(isValid, () => {
      if (isValid) {
        error.message = ''
      }
    })

    const submit = async function (type) {
      if (file.value === null) {
        error.type = 'is-danger'
        error.message = 'You must upload a valid file.'
        return
      }

      const formData = new FormData()
      formData.append('file', file.value)

      const validate = await axios.$post('/csis/validate', formData)
      const password = await this.openConfirmationPrompt(validate)
      formData.append('password', password)
      formData.append('mode', type)

      await axios.$post('/csis/import', formData);
      this.openSuccessToast()
      router.push({path: '/csi'})
    }

    const download = () => {
      document.getElementById('download-frame').src = `${axios.defaults.baseURL}/csis/export`
    }

    return {
      submit,
      isValid,
      file,
      form,
      error,
      download
    }
  },
  methods: {
    openConfirmationPrompt(validate) {
      return new Promise((resolve) => {
        const header = validate.length < 1 ? 'Successfully validated. Are you sure you wish to proceed?' : 'Careful: some validation errors have been found.'
        const validationErrors = `<ul>${
          validate.map(({ type, message }) => `<li>
            <b-icon icon='${type === 'skip' ? 'debug-step-over' : (type === 'panic' ? 'alert' : 'sim-alert')}'/>
            <span>${message}</span>
          </li>`)
        }</ul>`
        console.log(validationErrors) // to remove
        const message = validate.length < 1 ? header : header // + validationErrors
        this.$buefy.dialog.prompt({
          type: 'is-danger',
          message: message + '<br>Please retype your password to confirm.',
          hasIcon: true,
          icon: 'alert',
          inputAttrs: {
            type: 'password',
            placeholder: 'Password',
            icon: 'form-textbox-password'
          },
          trapFocus: true,
          onConfirm: resolve
        })
      })
    },
    openSuccessToast() {
      this.$buefy.toast({
        type: 'is-success',
        message: 'Import successful.'
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '~assets/scss/globals.scss';

.upload-fill {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10vh 0;
}

.identity-explanation {
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    margin: 0 1%;
  }
}

#download-frame {
  display: none;
}
</style>
