import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/product/children/ProductList.vue'
import ProductDetail from '../views/product/children/ProductDetail.vue'
import Login from '../views/auth/LoginView.vue'
import Register from '../views/auth/RegisterView.vue'
import Product from '../views/product/ProductView.vue'

const routes = [
  {
    path: '/',
    name: 'product',
    component: Product,
    children: [
      {
        path: '',
        name: 'productList',
        component: ProductList
      },
      {
        path: ':id',
        name: 'productDetail',
        component: ProductDetail
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPage = ['/login', '/register']
  const authRequired = !publicPage.includes(to.path)
  const user = localStorage.getItem('token')

  if (authRequired && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router
