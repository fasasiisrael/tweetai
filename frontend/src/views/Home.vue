<template>
    <div class="home">
      <h1>Welcome to TweetAI</h1>
      <AutobotCount />
    </div>
  </template>
  
  <script>
  import AutobotCount from '../components/AutobotCount.vue';
  
  export default {
    name: 'Home',
    components: {
      AutobotCount
    }
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  </style>
  