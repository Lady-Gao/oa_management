import Vue from 'vue'
import App from './App.vue'
import './utils'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.use(iView);

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
