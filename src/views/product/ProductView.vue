<template lang="pug">
.wrapper
  navbar
  .navigation
    .nav-box
      p Belanja
      font-awesome-icon.icon(:icon="['fas', 'caret-down']")
  .chumb
    p Home >> Product >> Roasted Bean
  router-view
</template>

<script>
import Navbar from '@/components/NavbarView.vue'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  components: {
    Navbar
  },
  setup () {
    const route = useRoute()
    const store = useStore()

    onMounted(() => {
      const payload = {
        keyword: route.query.keyword,
        price: route.query.price,
        page: route.query.page,
        limit: route.query.limit,
        order: route.query.order
      }

      store.dispatch('GetAllProduct', payload)
    })
  }
}
</script>

<style scoped>
.navigation {
  padding: 0 40px;
  height: 64px;
  background-color: #F5F5F5;
}

.navigation .nav-box {
  background: #EB3F36;
  height: 100%;
  width: 212px;
  color: #fff;
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navigation .nav-box p {
  font-weight: 400;
  font-size: 20px;
  line-height: 19px;
  margin-right: 5px;
}

.navigation .nav-box .icon {
  font-size: 12px;
}

.chumb {
  padding: 40px 40px 0 40px;
}
</style>
