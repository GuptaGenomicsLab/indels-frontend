<template>
  <div id='login-box'>
    <form @submit.prevent='submit'>
      <header>
        <DnaIcon size='lg' animated />
        <h2 class='black'>Create An Account</h2>
      </header>
      <b-field>
        <b-input v-model='formData.username'
                 placeholder='Username'
                 icon='account'
        />
      </b-field>
      <b-field>
        <b-input v-model='formData.email'
                 placeholder='Email'
                 icon='at'
        />
      </b-field>
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
                 placeholder='Confirm Your Password'
                 type='password'
                 icon='lock-check'
                 password-reveal
        />
      </b-field>
      <b-field>
        <b-input v-model='formData.institution'
                 placeholder='Institution'
                 icon='school'
        />
      </b-field>
      <button id='login-button' class='primary-button space-hz-sm' type='submit'>Register</button>
      <button id='register-button' class='secondary-button extended space-hz-sm' @click='$emit("switch")'>Already Have
        An Account? Log In!
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, toRaw } from '@nuxtjs/composition-api'
import DnaIcon from '@/components/DnaIcon'
import { rejectionToast, successToast } from '@/scripts/ui'
import { useAxios } from '@/scripts/useHooks'

export default {
  name: 'RegisterForm',
  components: { DnaIcon },
  setup(_, {emit}) {
    const axios = useAxios()

    const formData = reactive({
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      institution: ''
    })

    const submit = async () => {
      if (formData.password !== formData.passwordConfirm) {
        return rejectionToast('Password must match password confirmation field.')
      }
      const res = await axios.$post('/user/register', {
        ...toRaw(formData),
        passwordConfirm: undefined
      })
      if (res) {
        successToast('Successfully registered. Please confirm your email prior to logging in.')
        emit('switch')
      }
    }

    return {
      submit,
      formData
    }
  }
} // 9Ac5V1!v6f6f
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
  margin: 30% auto;
  flex-direction: column;
  padding: 10px;
}

</style>
