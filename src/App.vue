<template>
  <div id="app">
    <a href="#!/clan">clan</a> -
    <a href="#!/bar">bar</a>
    <router-view
      keep-alive>
    </router-view>
    <!-- <clan-view></clan-view> -->
  </div>
</template>

<script>
import ClanView from './components/ClanView'

export default {
  components: {
    ClanView
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
