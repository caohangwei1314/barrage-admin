import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in animeion use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/index',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/animeManage',
    component: Layout,
    redirect: '/animeManage/index',
    meta: { title: '番剧管理', icon: 'case' },
    children: [
      {
        path: 'index',
        name: 'animes',
        component: () => import('@/views/animeManage/index'),
        meta: { title: '全部番剧', icon: 'case' }
      },
      {
        path: 'series',
        name: 'animesSeries',
        hidden: true,
        component: () => import('@/views/animeManage/animeSeries'),
        meta: { title: '番剧集数', icon: 'case' }
      },
      {
        path: 'create',
        name: 'CreateAnime',
        component: () => import('@/views/animeManage/create'),
        meta: { title: '添加番剧', icon: 'edit' }
      },
      {
        path: 'update',
        name: 'UpdateAnime',
        hidden: true,
        component: () => import('@/views/animeManage/update'),
        meta: { title: '修改番剧信息' }
      },
      {
        path: 'animeSeriesCreate',
        name: 'CreateAnimeSeries',
        component: () => import('@/views/animeManage/animeSeriesCreate'),
        hidden: true,
        meta: { title: '添加番剧集数', icon: 'edit' }
      },
      {
        path: 'animeSeriesUpdate',
        name: 'UpdateAnimeSeries',
        hidden: true,
        component: () => import('@/views/animeManage/animeSeriesUpdate'),
        meta: { title: '修改番剧集数信息' }
      },
      {
        path: 'video',
        name: 'animeVideo',
        hidden: true,
        component: () => import('@/views/animeManage/video'),
        meta: { title: '视频' }
      }
    ]
  },
  {
    path: '/danmakuManage',
    component: Layout,
    redirect: '/danmakuManage/index',
    meta: { title: '弹幕管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'Danmaku',
        component: () => import('@/views/danmakuManage/index'),
        meta: { title: '弹幕管理', icon: 'case' }
      }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/index',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'Danmaku',
        component: () => import('@/views/userManage/index'),
        meta: { title: '用户管理', icon: 'case' }
      }
    ]
  },
  {
    path: '/userUploadVideoManage',
    component: Layout,
    redirect: '/userManage/index',
    meta: { title: '内容审核', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'Users',
        component: () => import('@/views/userUploadVideoManage/index'),
        meta: { title: '用户上传视频审核', icon: 'case' }
      },
      // {
      //   path: 'create',
      //   name: 'CreateUser',
      //   component: () => import('@/views/userManage/create'),
      //   meta: { title: '添加用户', icon: 'edit' }
      // },
      {
        path: 'update',
        name: 'UpdateUser',
        hidden: true,
        component: () => import('@/views/userUploadVideoManage/update'),
        meta: { title: '修改用户信息' }
      }
    ]
  },
  // {
  //   path: '/userClassManage',
  //   component: Layout,
  //   redirect: '/userClassManage/index',
  //   meta: { title: '用户权限管理', icon: 'user' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'UserClasses',
  //       component: () => import('@/views/userClassManage/index'),
  //       meta: { title: '用户分类', icon: 'user' }
  //     },
  //     {
  //       path: 'create',
  //       name: 'CreateUserClass',
  //       component: () => import('@/views/userClassManage/create'),
  //       meta: { title: '添加用户分类', icon: 'edit' }
  //     },
  //     {
  //       path: 'update/:id',
  //       name: 'UpdateUserClass',
  //       hidden: true,
  //       component: () => import('@/views/userClassManage/update'),
  //       meta: { title: '修改用户分类' }
  //     }
  //   ]
  // },
  // {
  //   path: '/animeClassManage',
  //   component: Layout,
  //   redirect: '/animeClassManage/index',
  //   meta: { title: '商品类别管理', icon: 'case' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'animeClasses',
  //       component: () => import('@/views/animeClassManage/index'),
  //       meta: { title: '商品类别', icon: 'case' }
  //     },
  //     {
  //       path: 'create',
  //       name: 'CreateanimeClass',
  //       component: () => import('@/views/animeClassManage/create'),
  //       meta: { title: '添加商品类别', icon: 'edit' }
  //     },
  //     {
  //       path: 'update/:id',
  //       name: 'UpdateanimeClass',
  //       hidden: true,
  //       component: () => import('@/views/animeClassManage/update'),
  //       meta: { title: '修改商品类别' }
  //     }
  //   ]
  // },
  // {
  //   path: '/bookInfoManage',
  //   component: Layout,
  //   redirect: '/bookInfoManage/index',
  //   meta: { title: '图书信息管理', icon: 'case' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'BookInfos',
  //       component: () => import('@/views/bookInfoManage/index'),
  //       meta: { title: '图书信息', icon: 'case' }
  //     },
  //     {
  //       path: 'create',
  //       name: 'CreateBookInfo',
  //       component: () => import('@/views/bookInfoManage/create'),
  //       meta: { title: '添加图书信息', icon: 'edit' }
  //     },
  //     {
  //       path: 'update/:id',
  //       name: 'UpdateBookInfo',
  //       hidden: true,
  //       component: () => import('@/views/bookInfoManage/update'),
  //       meta: { title: '修改图书详情' }
  //     }
  //   ]
  // },

  {
    path: '/articlesManage',
    component: Layout,
    redirect: '/articlesManage/index',
    meta: { title: '内容审核审核', icon: 'case' },
    children: [
      {
        path: 'index',
        name: 'Orders',
        component: () => import('@/views/userArticlesManage/index'),
        meta: { title: '用户视频评论审核', icon: 'case' }
      },
      {
        path: 'detail',
        name: 'Detail',
        hidden: true,
        component: () => import('@/views/userArticlesManage/detail'),
        meta: { title: '用户视频评论详情', icon: 'case' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

