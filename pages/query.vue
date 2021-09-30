<template>
  <main class='content-box'>
    <h1>Identify a Genome</h1>
    <p id='identity-explanation'>
      Start a new query.
      Simply upload a genome, and press start.
      <!--      For more complex needs, customization options are available below.-->
    </p>

    <form @submit.prevent='submit()'>
      <b-field :type='error.type' :message='error.message'>
        <b-upload v-model='file'
                  accept='.faa,.fasta'
                  rounded
                  expanded
                  drag-drop
                  required
        >
          <div v-if='file === null' class='upload-fill file-pending'>
            <b-icon icon='upload' size='is-large' />
            <p>Please upload a genome sequence.<br>Drag and drop your files or click here to upload.</p>
          </div>
          <div v-else-if='!isValid' class='upload-fill file-error' type='is-danger'>
            <b-icon icon='alert-circle' size='is-large' />
            <p>
              There's something wrong with this file!<br>
              Check the file type (.faa/.fasta),<br>
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
      <b-button type='is-success' native-type='submit' size='is-medium' label='Start Query' icon-left='play' expanded />
      <section v-if='showDetails' class='extra-options'>
        <hr />
        <h2>Additional Options</h2>
        <b-field label='Description'>
          <b-input v-model='form.description' name='description' type='textarea' maxlength='256' />
        </b-field>
        <b-field label='Genome Type' horizontal>
          <b-select v-model='form.type'>
            <option value='Auto' selected>Auto</option>
            <option value='Protein'>Protein</option>
            <option value='Nucleotide'>Nucleotide</option>
          </b-select>
        </b-field>
        <b-field label='Clinical' horizontal>
          <b-checkbox v-model='form.clinicalOnly' type='is-info' disabled>
            Restrict Query to Clinically Important CSIs Only
          </b-checkbox>
        </b-field>
      </section>
    </form>
  </main>
</template>

<script>
import { computed, reactive, ref, useRouter } from '@nuxtjs/composition-api'
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
    const router = useRouter();
    const axios = useAxios();

    const file = ref(null)
    const form = reactive({
      description: '',
      type: 'Auto',
      clinicalOnly: false
    })
    const isValid = computed(() => file.value.name.endsWith('.faa') || file.value.name.endsWith('.fasta'))
    const error = reactive({ type: '', message: '' })

    const submit = async () => {
      if (file.value === null) {
        error.type = 'is-danger'
        error.message = 'You must upload a valid file.'
        return
      }

      const formData = new FormData()
      formData.append('description', form.description)
      formData.append('sequenceType', form.type)
      // formData.append('clinicalOnly', form.clinicalOnly);
      formData.append('file', file.value)

      const queryID = await axios.$post('/blast/start-query', formData);
      await router.push({path: `/results/${queryID}`});
    }

    return {
      submit,
      isValid,
      file,
      form,
      error
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

#identity-explanation {
  margin-bottom: 10px;
}
</style>
