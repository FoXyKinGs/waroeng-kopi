import { createStore } from 'vuex'
import Axios from 'axios'

export default createStore({
  state: {
    allProduct: []
  },
  getters: {
    allProduct: state => state.allProduct
  },
  mutations: {
    SET_DATA_ALL_PRODUCT (state, payload) {
      state.allProduct = payload
    }
  },
  actions: {
    Login (ctx, payload) {
      Axios.post('login', payload)
        .then(response => localStorage.setItem('token', response.data.data.token))
        .catch(err => console.log(err))
    },
    Register (ctx, payload) {
      Axios.post('register', payload)
        .then(response => console.log(response.data.message))
        .catch(err => console.log(err))
    },
    GetAllProduct (ctx, { keyword, price, page, limit, order }) {
      Axios.get(`product?keyword=${keyword}&price=${price}&page=${page}&limit=${limit}&order=${order}`)
        .then(response => {
          ctx.commit('SET_DATA_ALL_PRODUCT', response.data.data)
          console.log(response.data.data)
        })
        .catch(err => console.log(err))
    }
  }
})
