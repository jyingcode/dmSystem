// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Vuex from 'vuex'
import Quasar from 'quasar'
import router from './router'
import * as filters from './filter'; // 全局vue filter
import store from './store'
import 'app.css'
import {mockXHR} from '../mock'
mockXHR()
Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'
let aa = false;
router.beforeEach((to, from, next) => {
  if (!store.state.app.userInfo.id && !aa) {
    aa = true;
    next({
      path: '/'
    });
  } else {
    let hash = to.name;
    switch (hash) {
      case 'customer':
        store.dispatch('ChangeHeaderTxt', '客服消息');
        store.dispatch('SetHashBack', false);
        break;
      case 'exchange':
        store.dispatch('ChangeHeaderTxt', '积分兑换马币');
        store.dispatch('SetHashBack', false);
        break;
      case 'exdope':
        store.dispatch('ChangeHeaderTxt', '积分兑换兴奋剂');
        store.dispatch('SetHashBack', false);
        break;
      case 'add':
        store.dispatch('ChangeHeaderTxt', '关注新用户');
        store.dispatch('SetHashBack', false);
        break;
      case 'uinfo':
        store.dispatch('ChangeHeaderTxt', '用户信息');
        store.dispatch('SetHashBack', false);
        break;
      case 'reward':
        store.dispatch('ChangeHeaderTxt', '打赏信息');
        store.dispatch('SetHashBack', false);
        break;
      case 'presenter':
        store.dispatch('ChangeHeaderTxt', '赠送记录');
        store.dispatch('SetHashBack', false);
        break;
      default:
        store.dispatch('ChangeHeaderTxt', '个人主页');
        store.dispatch('SetHashBack', true);
        break;
    }
    next();
  }

});


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
// console.log(filters);
// console.log(Object.keys(filters))
// debugger
Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App').default)
  })
})
