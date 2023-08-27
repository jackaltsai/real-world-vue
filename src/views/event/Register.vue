<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
        // If registration API call is successful
        // Push back to the event details
        this.GStore.flashMessage = 'You are successfully register for ' + this.event.title
        setTimeout(() => {  // After 3 seconds remove it
            this.GStore.flashMessage = ''
        }, 3000)

        this.$router.push({
            name: 'EventDetails'
        })
    }
  }
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>