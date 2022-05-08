import Vue from 'vue'
import App from './App.vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import ApiService from '@/services/api.service'

import { CardPlugin } from 'bootstrap-vue'
import { ImagePlugin } from 'bootstrap-vue'
import { TablePlugin } from 'bootstrap-vue'
import { LayoutPlugin } from 'bootstrap-vue'
import { MediaPlugin } from 'bootstrap-vue'
import { SpinnerPlugin } from 'bootstrap-vue'

Vue.use(CardPlugin)
Vue.use(TablePlugin)
Vue.use(LayoutPlugin)
Vue.use(MediaPlugin)
Vue.use(ImagePlugin)
Vue.use(SpinnerPlugin)
// Set the base URL of the API
ApiService.init(process.env.VUE_APP_ROOT_API)

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
