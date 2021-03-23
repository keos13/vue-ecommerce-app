import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/Home")
  },
  {
    path: '/prijava',
    name: 'login',
    component: () => import("@/views/auth/Login")
  },
  {
    path: '/trgovina',
    name: 'shopHome',
    component: () => import("@/views/shop/ShopHome")
  },
  // pojedinačni proizvod
  {
    path: '/proizvod/:id/:slug',
    name: 'product',
    component: () => import("@/views/shop/Product"),
    props: true
  },
  // pojedinačna kategorija
  {
    path: '/kategorija/:id/:slug',
    name: 'category',
    component: () => import("@/views/shop/ShopCategory"),
    props: true
  },
  // kosarica
  {
    path: '/kosarica',
    name: 'shoppingCart',
    component: () => import("@/views/shop/ShoppingCart"),
  },

  /****************************/
  /****** moj račun ***********/
  /****************************/

  {
    path: '/moj-racun',
    name: 'my-account-home',
    component: () => import("@/views/userAccount/MyAccount"),
    meta: { requiresAuth: true },
    children: [

      {
        path: 'narudzbe',
        name: 'my-account-orders',
        component: () => import("@/views/userAccount/MyAccountOrders"),

      },
      {
        path: 'moji-podatci',
        name: 'my-account-details',
        component: () => import("@/views/userAccount/MyAccountDetails"),

      },
      {
        path: 'placanje',
        name: 'my-account-payment',
        component: () => import("@/views/userAccount/MyAccountPayment"),

      }
    ]
  },

  /*^^^^^^^^^^^^^^^^^^^^^^^^^*/
  /***************************/
  /**************************/

  /****************************/
  /****** admin panel *********/
  /****************************/
  {
    path: '/admin',
    name: 'admin-home',
    component: () => import("@/views/admin/AdminHome"),
    children: [

      {
        path: 'proizvodi',
        name: 'products-list',
        component: () => import("@/views/admin/products/ProductsList")
      },
      {
        path: 'proizvodi-dodaj-novi',
        name: 'products-add-new',
        component: () => import("@/views/admin/products/ProductsAddNew")
      },
    ]
  },
  /*^^^^^^^^^^^^^^^^^^^^^^^^^*/
  /***************************/
  /**************************/
  // about project page
  {
    path: '/projekt',
    name: 'project',
    component: () => import("@/views/Project")
  },
  // 404 redirect
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import("@/views/NotFound")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/****************** ROUTE GUARDS *****************/
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['auth/isLoggedIn']) {
      next({
        path: '/prijava',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
/*************************************************/

export default router
