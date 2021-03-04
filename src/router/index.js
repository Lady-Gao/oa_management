import Vue from "vue"
import Router from 'vue-router'
import Config from "../utils/config";
Vue.use(Router)
/**
 * ES中的import方法实现懒加载
 */
const constantRoutes = [
  {
    path: '/',
    redirect: Config.HomePage
  },
  { name: "login", path: "/login", component: () => import("../views/login/login.vue") },
  {
    name: "404",
    path: "/404",
    component: () => import("../views/404/404.vue")
  },


];
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
const router = createRouter()
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location)
}
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router;