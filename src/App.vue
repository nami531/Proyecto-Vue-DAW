<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <NavBar/>
    <router-view/>
    <main class="flex-grow-1"></main>
    <AppFooter></AppFooter>
    
  </div>
  
  
</template>

<script>
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components : {
    NavBar,
    AppFooter,
  }
}; 
</script>


<style>
#app {
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
</style>
