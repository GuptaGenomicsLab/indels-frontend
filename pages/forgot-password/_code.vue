<template>
  <div id='login-box' class='content-box'>
    <form @submit.prevent='submit'>
      <header>
        <DnaIcon size='lg' animated />
        <h2 class='black'>Password Reset Form</h2>
        <p>
          Please enter your new password.
        </p>
      </header>
      <b-field>
        <b-input v-model='formData.password'
                 placeholder='Password'
                 type='password'
                 icon='lock'
                 password-reveal
        />
      </b-field>
      <b-field>
        <b-input v-model='formData.passwordConfirm'
                 placeholder='Password Confirm'
                 type='password'
                 icon='lock'
                 password-reveal
        />
      </b-field>
      <button id='login-button' class='primary-button space-hz-sm' type='submit'>Request Reset</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import DnaIcon from '@/components/DnaIcon'
import { useAxios } from '@/scripts/useHooks'
import { rejectionToast, successToast } from '@/scripts/ui'

export default {
  name: 'ResetPasswordPage',
  components: { DnaIcon },
  setup() {
    const axios = useAxios()
    const route = useRoute()
    const router = useRouter()

    const formData = reactive({
      password: '',
      passwordConfirm: ''
    })

    const submit = async () => {
      if (formData.password !== formData.passwordConfirm)
        return rejectionToast('Password and confirm password fields must match.')

      const res = await axios.$post(`/user/reset/${route.value.params.code}`, {
        password: formData.password
      })
      if (res) {
        successToast('Password Reset. Please log in.')
        router.push({ path: '/' })
      }
    }


    return {
      submit,
      formData
    }
  }
}
</script>

<style scoped lang='scss'>
@import '~assets/scss/globals.scss';

form {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @include respond-below(sm) {
    width: 100%;
  }
  @include respond-between(sm, lg) {
    width: 90%;
  }
  @include respond-between(lg, xlg) {
    width: 80%;
  }
  @include respond-above(xlg) {
    width: 60%;
  }

  display: flex;
  margin: 10% auto;
  flex-direction: column;
  padding: 10px;
}

</style>
