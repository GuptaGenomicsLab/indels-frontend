<template>
  <!--DANGER: XSS-->
  <main class='content-box'>
    <h1>Settings</h1>
    <p>All fields use markdown syntax for more complex text features.</p>
    <span style='color: red;'>
      DANGER! Do not allow unauthorized access to this page and use extreme caution.
      Malicious content can be injected here and can compromise user security (XSS attack).
    </span>
    <section>
      <h2>Homescreen Text</h2>
      <rich-editor v-model='pageContents.homescreenText'/>
      <b-button label='Save' @click='setContentText(HOMESCREEN_TEXT_KEY, pageContents.homescreenText)'/>
    </section>
    <section>
      <h2>Login Text</h2>
      <rich-editor v-model='pageContents.loginText'/>
      <b-button label='Save' @click='setContentText(LOGIN_TEXT_KEY, pageContents.loginText)'/>
    </section>
    <section>
      <h2>About Text</h2>
      <rich-editor v-model='pageContents.aboutText'/>
      <b-button label='Save' @click='setContentText(ABOUT_TEXT_KEY, pageContents.aboutText)'/>
    </section>
    <section>
      <h2>Interpreting Your Results Text</h2>
      <rich-editor v-model='pageContents.interpretationText'/>
      <b-button label='Save' @click='setContentText(INTERPRETATION_TEXT_KEY, pageContents.interpretationText)'/>
    </section>
    <section>
      <h2>Submit CSI Info</h2>
      <rich-editor v-model='pageContents.submitCsiInfoText'/>
      <b-button label='Save' @click='setContentText(SUBMIT_TEXT_KEY, pageContents.submitCsiInfoText)'/>
    </section>
    <section>
      <h2>Copyright Text</h2>
      <rich-editor v-model='pageContents.copyrightText'/>
      <b-button label='Save' @click='setContentText(COPYRIGHT_TEXT_KEY, pageContents.copyrightText)'/>
    </section>
    <section>
      <h2>Disclaimer Text</h2>
      <rich-editor v-model='pageContents.disclaimerText'/>
      <b-button label='Save' @click='setContentText(DISCLAIMER_TEXT_KEY, pageContents.disclaimerText)'/>
    </section>
    <section>
      <h2>Privacy Text</h2>
      <rich-editor v-model='pageContents.privacyText'/>
      <b-button label='Save' @click='setContentText(PRIVACY_TEXT_KEY, pageContents.privacyText)'/>
    </section>
    <section>
      <h2>Support Text</h2>
      <rich-editor v-model='pageContents.supportText'/>
      <b-button label='Save' @click='setContentText(SUPPORT_TEXT_KEY, pageContents.supportText)'/>
    </section>
  </main>
</template>

<script>
import {reactive} from 'vue'
import {useAxios} from '@/scripts/useHooks'
import {
  ABOUT_TEXT_KEY,
  SUBMIT_TEXT_KEY,
  COPYRIGHT_TEXT_KEY,
  DISCLAIMER_TEXT_KEY,
  HOMESCREEN_TEXT_KEY,
  LOGIN_TEXT_KEY,
  PRIVACY_TEXT_KEY,
  SUPPORT_TEXT_KEY,
  INTERPRETATION_TEXT_KEY
} from '@/scripts/ui'
import RichEditor from "@/components/RichEditor";

export default {
  name: 'SiteSettingsPage',
  components: {
    RichEditor
  },
  layout: 'authenticated',
  setup() {
    const axios = useAxios();
    const pageContents = reactive({
      loginText: '',
      homescreenText: '',
      aboutText: '',
      submitCsiInfoText: '',
      copyrightText: '',
      disclaimerText: '',
      privacyText: '',
      supportText: '',
      interpretationText: ''
    });

    async function fetchContentText(pageContentsName, databaseKey) {
      const response = await axios.get(`/content/${databaseKey}`).catch(() => {})
      const data = response.data ?? ''
      pageContents[pageContentsName] = data.value;
      return data.value;
    }

    async function setContentText(name, value) {
      await axios.$post(`/content/${name}`, {value});
    }

    useLazyFetch(() => {
      fetchContentText('loginText', LOGIN_TEXT_KEY);
      fetchContentText('homescreenText', HOMESCREEN_TEXT_KEY);
      fetchContentText('aboutText', ABOUT_TEXT_KEY);
      fetchContentText('submitCsiInfoText', SUBMIT_TEXT_KEY);
      fetchContentText('copyrightText', COPYRIGHT_TEXT_KEY);
      fetchContentText('disclaimerText', DISCLAIMER_TEXT_KEY);
      fetchContentText('privacyText', PRIVACY_TEXT_KEY);
      fetchContentText('supportText', SUPPORT_TEXT_KEY);
      fetchContentText('interpretationText', INTERPRETATION_TEXT_KEY);
    })

    return {
      pageContents,
      setContentText,
      ABOUT_TEXT_KEY,
      SUBMIT_TEXT_KEY,
      COPYRIGHT_TEXT_KEY,
      DISCLAIMER_TEXT_KEY,
      HOMESCREEN_TEXT_KEY,
      LOGIN_TEXT_KEY,
      PRIVACY_TEXT_KEY,
      SUPPORT_TEXT_KEY,
      INTERPRETATION_TEXT_KEY
    }
  }
}
</script>
