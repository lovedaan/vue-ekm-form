import Vue from 'vue'
import Router from 'vue-router'
import customFieldForm from '@/views/custom-field-form.vue'
import testGenerator from '@/views/test-generator.vue'
// import inlineForm from '@/views/inline-form.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'customFieldForm',
      component: customFieldForm
    },
    {
      path: '/test',
      name: 'inlineForm',
      component: testGenerator
    }
  ]
})
