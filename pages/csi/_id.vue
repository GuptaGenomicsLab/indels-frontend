<template>
  <main class='content-box'>
    <h1>{{ header }}</h1>
    <form @submit.prevent='submit'>
      <b-field horizontal label='GI Number'>
        <b-input v-model='form.gi' />
      </b-field>
      <b-field horizontal label='Specificity'>
        <b-input v-model='form.specificity' />
      </b-field>
      <b-field horizontal label='Parent'>
        <b-input v-model='form.parent' />
      </b-field>
      <b-field horizontal label='Default Parent'>
        <b-input v-model='form.defaultParent' />
      </b-field>
      <b-field horizontal label='Sequence'>
        <b-input v-model='form.sequence' />
      </b-field>
      <b-field horizontal label='Protein Name'>
        <b-input v-model='form.proteinName' />
      </b-field>
      <b-field horizontal label='Type'>
        <b-input v-model='form.type' />
      </b-field>
      <b-field horizontal label='E-value'>
        <b-input v-model='form.eValue' />
      </b-field>
      <b-field horizontal label='Reference'>
        <b-input v-model='form.reference' />
      </b-field>
      <b-field horizontal label='Private'>
        <b-input v-model='form.private' />
      </b-field>
      <b-button type='is-success' native-type='submit' icon-left='pencil'>
        Submit
      </b-button>
      <b-button type='is-danger' icon-left='delete' @click='submitDelete'>
        Delete
      </b-button>
    </form>
  </main>
</template>

<script>
import { reactive, useFetch, useRoute, useRouter } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'

const formDefaults = {
  gi: '',
  specificity: '',
  parent: '',
  defaultParent: '',
  sequence: '',
  type: 'insertion',
  eValue: '',
  proteinName: '',
  reference: '',
  private: false
}

export default {
  name: 'CsiPage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios()
    const route = useRoute()
    const router = useRouter()
    const id = route.value.params.id ?? ''
    const isEditing = id.length > 8 && id !== 'create'
    const header = isEditing ? 'Edit Existing CSI' : 'Create a New CSI'

    const form = reactive({ ...formDefaults })

    const fetchData = async () => {
      const csi = await axios.$get(`/csi/${id}`)
      for (const key of Object.keys(form)) {
        form[key] = csi[key]
      }
    }

    const submit = async function() {
      const url = isEditing ? `/csi/${id}/edit` : '/csi'
      const method = isEditing ? 'POST' : 'PUT'
      await axios.$request({
        url,
        method,
        data: form
      })
      this.successToast(`${isEditing ? 'Edit' : 'Create'} successful.`)
    }

    const submitDelete = async function() {
      await this.openDeleteConfirm()
      await axios.$delete(`/csi/${id}`)
      this.successToast('Successfully deleted.')
      router.push({ path: '/csi' })
    }

    if (isEditing) {
      useFetch(fetchData)
    }

    return {
      header,
      form,
      submit,
      submitDelete
    }
  },
  methods: {
    openDeleteConfirm() {
      return new Promise((resolve) => {
        this.$buefy.dialog.confirm({
          title: 'Delete CSI',
          message: 'Are you sure you want to delete this CSI? This action cannot be undone.',
          confirmText: 'Delete CSI',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => resolve()
        })
      })
    },
    successToast(message) {
      this.$buefy.toast.open({
        message,
        type: 'is-success'
      })
    }
  }
}
</script>

<style scoped lang='scss'>
main {
  text-align: center;
}
</style>
