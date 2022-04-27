import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
  } from 'vue-router'

  
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Welcome',
      // component: () => import('../views/Welcome/index.vue'),
      component: () => import('../view/Welcome/index.vue')
      
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../view/Login/Login.vue'),
    },
    /**
     * @description 拖拽组件页面
     */
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../view/Home/index.vue')
    },
    // /**
    //  * @description 简历制作模块
    //  */
    {
      path: '/Resume',
      name: 'Resume',
      component: () => import('../resume/index.vue')
    },
    {
      path: '/intrdation',
      name: 'Info',
      component: () => import('../view/Intrdation/index.vue') // 懒加载组件
    },
    {
      path: '/TemplateList',
      name: 'TemplateList',
      component: () => import('../resume/TemplateList/index.vue')
    }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router
  