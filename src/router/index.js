import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import GStore from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { // <----
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventList,
      props: route => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      beforeEnter: to => {
        return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event = response.data
        })
        .catch(error => {
          
          if (error.response && error.response.statue == 404 ) {
              return {
              name: '404Resource',
              params: { resource: 'event' }
              }
          } else {
              return { name: 'NetworkError'}
          }
        })
      },
      children: [
        {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
          meta: { requireAuth: true}
        }
      ]
    },
    {
      // 2.
      path: '/event/:afterEvent(.*)',
      redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    }
      // 1.
      // path: '/event/:id',
      // redirect: () => {
      //   return { name: 'EventDetails' }
      // },
      // children: [
      //   { path: 'register', redirect: () => ({ name: 'EventRegister'})},
      //   { path: 'edit', redirect: () => ({ name: 'EventEdit'})}
      // ]
    },
    {
      path: '/about-us',
      name: 'About',
      component: AboutView,
      alias: '/about'
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError
    },
  ]
})

router.beforeEach((to, from) => {
  NProgress.start()
  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)
    
    if (from.href) {
      return false
    } else {
      return { path: '/'}
    }
    
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
