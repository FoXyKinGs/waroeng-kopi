<template lang="pug">
.wrapper
  navbar
  .navigation
    .nav-box
      p Belanja
      font-awesome-icon.icon(:icon="['fas', 'caret-down']")
  .chumb
    .product-detail(
      v-if='$route.name === "productDetail"'
    )
      p.back(
        @click='backToList()'
      ) Home
      p  >>
      span  {{ product.name }}
    p(
      v-else
    ) Home >> Product >>
      span  Roasted Bean
  router-view
</template>

<script>
import Navbar from '@/components/NavbarView.vue'
import { useStore } from 'vuex'
import { onMounted, computed } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    Navbar
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const product = computed(() => store.getters.detailProduct)

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

    const backToList = () => {
      router.push({ path: '/', query: route.query })
    }

    return {
      product,
      backToList
    }
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
  display: flex;
}

.chumb .product-detail {
  display: flex;
}

.chumb .product-detail .back {
  cursor: pointer;
}

.chumb span {
  color: #EB3F36;
}
</style>
