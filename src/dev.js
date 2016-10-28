import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './dev/App.vue'

window.Vue = Vue

Vue.use(VueResource)

new Vue({
    el: '#app',
    ...App
})