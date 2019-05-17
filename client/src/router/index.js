
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
import store from '../store';
// Routes
import paths from './paths'

function route(path, view, name) {
  return {
    name: name || view,
    path,
    component: (resovle) => {
      import(`@/views/${view}.vue`).then(resovle)
    },
    props: true
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name)).concat([
    { path: '*', redirect: '/dashboard' }
  ]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // หน้าที่ไม่ต้อง login ให้ค่าใน array  public page 
  const publicPages = ['/login','/signup'];
  const authRequired = !publicPages.includes(to.path);

  
  const user = store.state.auth.user;

  if (authRequired && !user) {
    return next('/login');
  }
  
  next();
})

Vue.use(Meta)

export default router
