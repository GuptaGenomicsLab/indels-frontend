<template>
  <main class='content-box'>
    <h1>Manage User</h1>
    <p>
      Modify a user account. To "delete" a user, simply de-activate their account, and they will be unable to log in.
    </p>
    <form @submit.prevent='submit'>
      <b-field horizontal label='Active/Verified'>
        <div style='display: flex; flex-direction: row; justify-content: left'>
          <b-checkbox v-model='form.active' type='is-success'>Active</b-checkbox>
        </div>
      </b-field>
      <b-field horizontal label='Username'>
        <b-input v-model='form.username' />
      </b-field>
      <b-field horizontal label='Email'>
        <b-input v-model='form.email' />
      </b-field>
      <b-field horizontal label='Institution'>
        <b-input v-model='form.institution' />
      </b-field>
      <b-field horizontal label='Role'>
        <b-select v-model="form.role" placeholder='Select a Role' expanded icon='account-supervisor'>
          <option value='USER'>User</option>
          <option value='MANAGER'>Manager</option>
          <option value='ADMIN'>Admin</option>
        </b-select>
      </b-field>
      <b-button type='is-success' native-type='submit' icon-left='pencil'>
        Save Changes
      </b-button>
    </form>
  </main>
</template>

<script>
import { reactive, useFetch, useRoute } from '@nuxtjs/composition-api'
import { useAxios } from '@/scripts/useHooks'

const formDefaults = {
  active: false,
  username: '',
  email: '',
  institution: '',
  role: ''
}

export default {
  name: 'UserPage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios()
    const route = useRoute()

    const id = route.value.params.id ?? ''

    const form = reactive({ ...formDefaults })

    const fetchData = async () => {
      const csi = await axios.$get(`/user?id=${id}`)
      for (const key of Object.keys(form)) {
        form[key] = csi[key]
      }
    }

    const submit = async function() {
      await axios.$post(`/user/${id}/edit`, form);
      this.successToast(`Edit successful.`)
    }

    useFetch(fetchData)

    return {
      form,
      submit,
    }
  },
  methods: {
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

  p {
    margin-bottom: 2%;
  }
}
</style>
