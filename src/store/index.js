import { createStore } from 'vuex'
import Axios from 'axios'

export default createStore({
  state: {
    allProduct: [],
    detailProduct: {}
  },
  getters: {
    allProduct: state => state.allProduct,
    detailProduct: state => state.detailProduct
  },
  mutations: {
    SET_DATA_ALL_PRODUCT (state, payload) {
      state.allProduct = payload
    },
    SET_DETAIL_PRODUCT (state, payload) {
      const allProduct = state.allProduct ? state.allProduct.list : false
      if (allProduct) {
        state.detailProduct = allProduct.find(item => item.id === Number(payload))
      }
    }
  },
  actions: {
    Login (ctx, payload) {
      return new Promise((resolve, reject) => {
        Axios.post('login', payload)
          .then(response => {
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data.message)
          })
          .catch(err => reject(err))
      })
    },
    Register (ctx, payload) {
      return new Promise((resolve, reject) => {
        Axios.post('register', payload)
          .then(response => resolve(response.data.message))
          .catch(err => reject(err))
      })
    },
    GetAllProduct (ctx, { keyword, price, page, limit, order }) {
      Axios.get(`product?keyword=${keyword}&price=${price}&page=${page}&limit=${limit}&order=${order}`)
        .then(response => {
          ctx.commit('SET_DATA_ALL_PRODUCT', response.data.data)
        })
        .catch(err => console.log(err))
    },
    GetDetailProduct (ctx, { id }) {
      ctx.commit('SET_DETAIL_PRODUCT', id)
    }
  }
})
