<template>
  <main class='content-box'>
    <div id='introduction' v-html='content' />
    You must complete this form once per CSI you wish to contribute.
    <br><br>
    <form @submit.prevent='() => submitForm()'>
      <b-field label='Specificity'>
        The taxa for which this CSI is specific.
        <b-input v-model='form.specificity' />
      </b-field>
      <b-field label='Parent'>
        The immediate parent/higher-order parent of this CSI.
        <b-input v-model='form.parent' />
      </b-field>
      <b-field label='Sequence' style='display: flex; flex-direction: column;'>
        <div>
          The exact sequence containing the indel. Ensure that the indel is contained within the middle of the sequence so that it is flanked on both sides by at least 5 residues.
          Mark an n length deletion by including n spaces in the deleted position (e.g. 1aa deletion: <code>GDLGPVYGKQWRAWDSANGV IDQLAQVIDSIKHNPDSRR</code>).
          Mark an insertion by flanking the inserted residues with <code>|</code> symbol (e.g. 6aa insertion <code>LPMEDPQMDLLEGSVFYRAAMTYDKI|KNELQK|LRFERGIDIEEEPRVHLEVNYRATNRDLLQIE</code>).
        </div>
      </b-field>
      <b-input v-model='form.sequence' />

      <b-field label='Reference'>
        Please provide an APA 7 citation to the paper in which this CSI is described.
        <b-input v-model='form.reference' />
      </b-field>

      <b-field horizontal label='GI Number / Accession Number (optional)'>
        <b-input v-model='form.gi' />
      </b-field>
      <b-field horizontal label='Protein Name'>
        <b-input v-model='form.proteinName' />
      </b-field>
      <b-field horizontal label='Type'>
        <b-select v-model='form.type'>
          <option value='deletion'>Deletion</option>
          <option value='insertion'>Insertion</option>
        </b-select>
      </b-field>
      <b-field label='Description'>
        Please provide a brief description or note regarding the CSI/paper, where in the paper the CSI is described, and any other relevant information.
        <b-input v-model='form.description' />
      </b-field>
      <b-field label='Confirmation'>
        <b-checkbox v-model='form.consent' required>
          I confirm that the above information is correct.
          I agree to make this CSI publicly available and understand that the AppIndels team may decline to publish this CSI at their discretion.
        </b-checkbox>
      </b-field>

      <b-button type='is-success' native-type='submit' icon-left='pencil' expanded>
        Submit
      </b-button>

    </form>
  </main>
</template>

<script>
import {ref, reactive} from 'vue';
import {useAxios} from "@/scripts/useHooks";
import {SUBMIT_TEXT_KEY} from "@/scripts/ui";

export default {
  name: 'SupportPage',
  layout: 'authenticated',
  setup() {
    const axios = useAxios();
    const content = ref('Loading...');

    useLazyFetch(async () => {
      const response = await axios.get(`/content/${SUBMIT_TEXT_KEY}`).catch(() => {})
      content.value = response.data.value ?? '<p>Not Found. Please contact the site administrator (kantered@mcmaster.ca) if this is an error.</p>';
    })

    const formDefaults = {
      gi: '',
      specificity: '',
      parent: '',
      sequence: '',
      type: 'insertion',
      proteinName: '',
      reference: '',
      description: '',
      consent: false
    }

    const form = reactive({ ...formDefaults })

    async function submitForm() {
      await axios.$put('/csi/submit', form).catch(() => {
        this.$buefy.toast.open({
          message: 'There was an error submitting your CSI. Please try again later.',
          type: 'is-danger'
        })
      });


      this.$buefy.toast.open({
          message: 'Your CSI has been submitted. Thank you for your contribution!',
          type: 'is-success'
      })
    }

    return {content, form, submitForm}
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
