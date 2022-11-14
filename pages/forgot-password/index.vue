<template>
  <div id='login-box' class='content-box'>
    <form @submit.prevent='submit'>
      <header>
        <DnaIcon size='lg' animated />
        <h2 class='black'>Request a Password Reset</h2>
        <p>
          Please enter the email associated with your account.
          We will email you a link to reset your password.
        </p>
      </header>
      <b-field>
        <b-input v-model='formData.email'
                 placeholder='Email'
                 icon='at'
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
import { successToast } from '@/scripts/ui'

export default {
  name: 'ForgotPasswordPage',
  components: { DnaIcon },
  setup() {
    const axios = useAxios()

    const formData = reactive({
      email: ''
    })

    const submit = async () => {
      const res = await axios.$post(`/user/request-reset/${formData.email}`);
      if (res) successToast('Reset Requested. Please close this page and check your email.')
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
