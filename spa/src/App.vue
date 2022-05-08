<template>
  <div id="app" class="container-fluid">
    <book-table></book-table>
  </div>
</template>

<script>

import BookTable from './components/BookTable'
export default {
  name: 'App',
  components: {
    BookTable,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: antiquewhite!important;
  overflow: hidden;
  height: 100%;
}
html, body {
  height:100%;
}
</style>
