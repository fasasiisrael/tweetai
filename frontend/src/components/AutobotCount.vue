<template>
    <div class="autobot-count">
      <h2>Current Autobot Count: {{ count }}</h2>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AutobotCount',
    data() {
      return {
        count: 0
      };
    },
    created() {
      this.fetchAutobotCount();
      setInterval(this.fetchAutobotCount, 10000); // Fetch count every 10 seconds
    },
    methods: {
      async fetchAutobotCount() {
        try {
          const response = await axios.get('/api/autobots'); // API endpoint for fetching autobots
          this.count = response.data.count;
        } catch (error) {
          console.error('Error fetching Autobot count:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .autobot-count {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  