import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Form,
  FormItem,
  Input,
  Table,
  TableColumn,
  Cascader,
  Transfer,
  Dialog,
} from 'element-ui'


Vue.use(ElementUI)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Cascader)
Vue.use(Transfer)
Vue.use(Dialog)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
