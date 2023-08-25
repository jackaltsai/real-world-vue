<script>
export default {
  props: ['event'],
  methods: {
    register() {
        // If registration API call is successful
        // Push back to the event details
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