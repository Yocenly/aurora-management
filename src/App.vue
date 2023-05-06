<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { generateMenu } from '@/assets/js/menu'
export default {
  name: 'App',
  created () {
    if (sessionStorage.getItem('token')) {
      generateMenu();
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

