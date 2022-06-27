<template>
  <div class="app">
    <AppNavigation />
    <router-view />
  </div>
</template>

<script>
import AppNavigation from "./components/AppNavigation.vue";

export default {
  name: "App",
  components: { AppNavigation },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}
.app {
  min-height: 100vh;
  position: relative;
  background-color: #141414;
}
.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
</style>
