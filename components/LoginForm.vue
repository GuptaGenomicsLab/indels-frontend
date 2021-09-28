<template>
  <div id='login-box'>
    <form @submit.prevent='submit'>
      <header>
        <DnaIcon size='lg' animated />
        <h2 class='black'>Sign In</h2>
      </header>
      <b-field>
        <b-input placeholder='Username'
                 v-model='formData.username'
                 icon='account'
        />
      </b-field>
      <b-field>
        <b-input placeholder='Password'
                 type='password'
                 v-model='formData.password'
                 icon='lock'
                 password-reveal
        />
      </b-field>
      <footer>
        <b-checkbox v-model='formData.rememberMe' type='is-info'>Remember Me</b-checkbox>
        <NuxtLink to='/forgot-password'>Forgot Password?</NuxtLink>
      </footer>
      <button class='primary-button space-hz-sm' type='submit'>Login</button>
<!--    <button class='secondary-button extended'>Sign Up</button>-->
    </form>
  </div>
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
import DnaIcon from '@/components/DnaIcon'

export default {
  name: 'LoginForm',
  components: { DnaIcon },
  setup() {
    const formData = reactive({
      username: '',
      password: '',
      rememberMe: true
    });

    return {
      formData
    }
  },
  methods: {
    submit() {
      this.$auth.loginWith('cookie', {data: this.formData});
    }
  }
}
</script>

<style scoped lang='scss'>
@import '~assets/scss/globals.scss';

#login-box {
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
