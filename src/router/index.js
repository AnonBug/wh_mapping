/*
 * @Author: your name
 * @Date: 2020-03-28 20:40:55
 * @LastEditTime: 2020-03-28 22:37:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wh_mapping\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mapping from '@/components/Mapping'
import TheLogin from '@/components/TheLogin'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/mapping',
      name: 'Mapping',
      component: Mapping
    },
    {
      path: '/login',
      name: 'TheLogin',
      component: TheLogin
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
let flag = true
router.beforeEach((to, from, next) => {
  // 导航守卫中，组件尚未渲染，不能获取 this 
  if (window.sessionStorage.getItem('isLogin') === 'true') { // 判断是否已经登录
    next();
  } else if (to.path === '/login') {
    next(); // 允许跳转到to的路由位置
  } else {
    // alert('还没有登录，请先登录或者注册！');
    next('/login');
  }
});

export default router;
