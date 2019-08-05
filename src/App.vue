<template>
  <div class="mt-4" id="app">
    <NewsBlock/>
  </div>
</template>

<script>
  import NewsBlock from './components/NewsBlock'
  export default {
    name: 'app',
    components: {
      NewsBlock
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
