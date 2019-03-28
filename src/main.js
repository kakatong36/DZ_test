// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import http from './common/http'
import bombox from './common/bombox'
import loading from './common/load'
import Distpicker from 'v-distpicker'
import 'common/scss/style.scss'
import filter from 'common/filters.js'

import config from './common/config.js'
Vue.use(config)

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import 'video.js/dist/video-js.css'
import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer)

import vVideoPlayer from './components/video/video'
Vue.component('v-videoPlayer', vVideoPlayer)

import promptBox from './components/promptBox/promptBox'//提示框
Vue.component('promptBox', promptBox)

import noInternet from './components/nodata/noInternet'
Vue.component('noInternet', noInternet)

import picViewer from './components/picViewer/picViewer'
Vue.component('v-picViewer', picViewer)

import menu from './components/menu/index'
Vue.component('shopMenu',menu)

Vue.component('v-distpicker', Distpicker)

import VueQriously from 'vue-qriously'
Vue.use(VueQriously)


Vue.config.productionTip = false
Vue.use(http);
Vue.use(bombox);
Vue.use(loading);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

