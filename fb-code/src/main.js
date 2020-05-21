// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import formBuild, { register } from '../package/index.js'
// import formBuild from '../dist/form-build'
import discountCeil from './components/form-build/discount-ceil'
import products from './components/form-build/products'


Vue.config.productionTip = false

register(discountCeil, products)
Vue.use(formBuild)

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
