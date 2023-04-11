/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './example/App.vue';
import VueComponentStore from 'vue-component-store';

Vue.use(ElementUI);
Vue.use(VueComponentStore);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
