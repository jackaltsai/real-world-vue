<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  inject: ['GStore'] // <---- 
}
</script>

<template>  
  <div id="layout">
    <header>
    <div class="wrapper">
      <div id="flashMessage" v-if="GStore.flashMessage">
        {{ GStore.flashMessage }}
      </div>
      <nav>
        <RouterLink :to="{ name: 'EventList' }">Events</RouterLink> |
        <RouterLink :to="{ name: 'About' }">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  </div>
</template>

<style scoped>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}
#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}

</style>
