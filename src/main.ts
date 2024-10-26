import { createApp } from 'vue';
import './app/styles/index.css';
import router from './app/app-router';
import App from './app/app.vue';

createApp(App).use(router).mount('#app');
