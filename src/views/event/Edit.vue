<script>
import EventService from '@/services/EventService.js'

export default {
    name: 'EventEdit',
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  created() {
    EventService.getEvents(this.id)
    .then(response => {
      this.event = response.data
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <div id="nav">
          <router-link :to="{ name: 'EventDetails', params: { id } }">Details</router-link>
          |
          <router-link :to="{ name: 'EventRegister', params: { id } }">Register</router-link>
          |
          <router-link :to="{ name: 'EventEdit', params: { id } }">Edit</router-link>
        </div>
        <p>Edit for the event here</p>
    </div>
</template>