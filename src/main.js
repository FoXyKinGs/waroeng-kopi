import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(far, fas)

Axios.defaults.baseURL = 'https://techtest.folkatech.com/api/'
Axios.defaults.headers.Authorization = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
