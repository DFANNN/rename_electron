import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/layout/replaceText'
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@renderer/layout/index.vue'),
      children: [
        {
          path: 'replaceText',
          name: 'replaceText',
          component: () => import('@renderer/views/replaceText/index.vue'),
          meta: {
            title: '替换文本',
            icon: 'Grape'
          }
        },
        {
          path: 'insertText',
          name: 'insertText',
          component: () => import('@renderer/views/insertText/index.vue'),
          meta: {
            title: '插入文本',
            icon: 'Cherry'
          }
        },
        {
          path: 'indexText',
          name: 'indexText',
          component: () => import('@renderer/views/indexText/index.vue'),
          meta: {
            title: '索引文本',
            icon: 'Orange'
          }
        },
        {
          path: 'theMovieDB',
          name: 'theMovieDB',
          component: () => import('@renderer/views/theMovieDB/index.vue'),
          meta: {
            title: 'theMovieDB',
            icon: 'Burger'
          }
        }
      ]
    }
  ]
})

export default router
