import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import chartkick from 'vue-chartkick'
import chart from 'chart.js/dist/chart'


createApp(App).use(store).use(router).use(chartkick.use(chart)).mount('#app')

