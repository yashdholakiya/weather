// Import the Vue library
import Vue from 'vue';
// Import the root component of your application
import App from 'app.vue';

// Disable the "productionTip" console message
Vue.config.productionTip = false;

// Create a new Vue instance
new Vue({
  // Render the root component
  render: h => h(App),
}).$mount('#app'); // Mount the Vue instance to the '#app' element in the DOM
