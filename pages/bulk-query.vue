<template>
  <main class='content-box'>
    <h1>Run a Bulk Query</h1>
    <p class='identity-explanation'>
      Upload several .faa or .fasta files to run them all in sequence and generate a report of the results.<br>
      Once the query is started, you can do other things and you will be emailed the results when they are ready.
    </p>

    <form @submit.prevent>
      <b-input type='text'
               placeholder='Query Name (MUST BE UNIQUE)'
               v-model='form.name'
               required
      />

      <b-field>
        <b-tag v-for='file of uniqueFiles'
               :key='file.name'
               type='is-danger'
               closable
               @close='removeFile(file.name)'>
          {{ file.name }}
        </b-tag>
      </b-field>

      <b-field :type='error.type' :message='error.message'>
        <b-upload v-model='files'
                  accept='.faa,.fasta'
                  multiple
                  rounded
                  expanded
                  drag-drop
                  required
        >
          <div class='upload-fill file-pending'>
            <b-icon icon='upload' size='is-large' />
            <p>Please upload your genome files.</p>
          </div>
        </b-upload>
      </b-field>
      <div class='button-container'>
        <b-button type='is-success' size='is-medium' label='Start Query' icon-left='play'
                  @click='() => submit()' />
      </div>
    </form>
  <!-- Potentially add <section> with past bulk queries here. -->
  </main>
</template>

<script>
import { computed, reactive, ref } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'

export default {
  name: 'BulkQueryPage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios()

    const files = ref([])
    const form = reactive({
      name: ''
    })

    const uniqueFiles = computed(() => {
      const unique = []
      files.value.forEach(file => {
        if (!unique.find(f => f.name === file.name)) {
          unique.push(file)
        }
      })
      return unique
    })

    const error = reactive({ type: '', message: '' })
    const removeFile = (name) => {
      files.value = files.value.filter(f => f.name !== name)
    }

    const submit = async function () {
      if (files.value.length < 1) {
        error.type = 'is-danger'
        error.message = 'You must upload at least 1 file.'
        return
      }

      const formData = new FormData()
      uniqueFiles.value.forEach((file) => {
        formData.append('files', file)
      })
      formData.append('name', form.name)

      const result = await axios.$post('/bulk-query', formData);
      if (result) this.openSuccessToast(result.message);
    }

    return {
      submit,
      files,
      form,
      error,
      removeFile,
      uniqueFiles
    }
  },
  methods: {
    openSuccessToast(message = 'Success') {
      this.$buefy.toast.open({
        type: 'is-success',
        message
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
