import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './dev/App.vue'
import router from './dev/router.js'

window.Vue = Vue

Vue.use(VueResource)

const app = new Vue({
    template: '<app />',
    router: router,
    components: {
        App: App
    }
}).$mount('#app')