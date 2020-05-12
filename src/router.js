import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  // '@' is aliased to src/components
  return () =>
    import (`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),

  routes: [{
      path: '/',
      component: load('index'),
      name: 'app',
      redirect: {
        name: 'index'
      },
      children: [{
        name: 'index',
        path: '/index',
        component: load('index/index')
      }, {
        name: 'customer',
        path: '/customer',
        component: load('customer')
      }, {
        name: 'exchange',
        path: '/exchange',
        component: load('exchange')
      }, {
        name: 'exdope',
        path: '/exdope',
        component: load('exdope')
      }, {
        name: 'add',
        path: '/add',
        component: load('add')
      }, {
        name: 'uinfo',
        path: '/uinfo',
        component: load('uinfo')
      }, {
        name: 'reward',
        path: '/reward',
        component: load('reward')
      }, {
        name: 'presenter',
        path: '/presenter',
        component: load('presenter')
      }]
    },

    // Always leave this last one
    {
      path: '*',
      component: load('Error404')
    } // Not found
  ]
})
