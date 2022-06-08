<template lang='pug'>
.container
  .loading(
    v-if='!product.id'
  ) Loading
  div(
    v-else
  )
    .product
      .image
        img(
          :src='displayedImage ? displayedImage : product.images[0].image_url'
        )
        .slider-image
          button.left
            font-awesome-icon(:icon='["fas", "angle-left"]')
          img(
            v-for='image in product.images'
            :key='image.id'
            :src='image.image_url'
            @click='changeImage(image.image_url)'
          )
          button.right
            font-awesome-icon(:icon='["fas", "angle-right"]')
      .description
        p.name {{ product.name }}
        p.product-by {{ product.product_type.name }}
        .rating start
        p.price {{ convertToIDR(product.price) }}
        .cart-system
          .qty
            .minus
              font-awesome-icon(:icon="['fas', 'minus']")
            p.count 1
            .plus
              font-awesome-icon(:icon="['fas', 'plus']")
          button Tambah Ke Keranjang
          .icon
            font-awesome-icon(:icon="['far', 'heart']")
        .about-product
          p {{ product.description }}
    .more-information
      .navigation
        .nav-box.active
          p DESKRIPSI
        .nav-box
          p INFORMASI
      .nav-content
        .content-description
          p {{ product.description }}
    .more-for-you
      .header
        .title
          p REKOMENDASI UNTUK ANDA
          .line
      .product
        productCard(
          v-for='value in 3'
          :key='value'
          :product='recommendation.list[value]'
        )
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const product = computed(() => store.getters.detailProduct)
    const displayedImage = ref('')
    const recommendation = computed(() => store.getters.allProduct)

    onMounted(() => {
      store.dispatch('GetDetailProduct', { id: route.params.id })
      console.log(recommendation)
    })

    const convertToIDR = (val) => {
      const format = val.toString().split('').reverse().join('')
      const convert = format.match(/\d{1,3}/g)

      return 'Rp ' + convert.join('.').split('').reverse().join('')
    }

    const changeImage = (val) => {
      displayedImage.value = val
    }

    return {
      product,
      convertToIDR,
      displayedImage,
      changeImage,
      recommendation
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px 40px;
}

.product {
  display: flex;
  padding: 20px 60px;
}

.product .image {
  width: 40%;
}

.product .image .slider-image {
  display: flex;
  margin-top: 20px;
  gap: 5%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.product .image .slider-image img {
  width: 30%;
  height: 50%;
  cursor: pointer;
}

.product .image .slider-image button.left {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50px;
  background: #E2E2E2;
  cursor: pointer;
}

.product .image .slider-image button.right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50px;
  background: #E2E2E2;
  cursor: pointer;
}

.product .image img {
  width: 100%;
  height: 470px;
  border: 1px solid #D8D8D8;
}

.product .description {
  width: 60%;
  padding: 0 40px;
}

.product .description .name {
  font-weight: 700;
  font-size: 24px;
  line-height: 23px;
  color: #696969;
}

.product .description .product-by {
  font-weight: 500;
  font-size: 22px;
  line-height: 21px;
  color: #696969;
  margin-top: 20px;
}

.product .description .rating {
  font-weight: 400;
  font-size: 14px;
  line-height: 13px;
  color: #868686;
}

.product .description .price {
  font-weight: 500;
  font-size: 22px;
  line-height: 21px;
  color: #EB3F36;
  margin-top: 10px;
}

.product .description .cart-system {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.product .description .cart-system .qty {
  width: 30%;
  display: flex;
  justify-content: space-around;
}

.product .description .cart-system .qty .plus {
  width: 30%;
  height: 53px;
  border: 1px solid #F1F1F1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.product .description .cart-system .qty .count {
  width: 32%;
  height: 53px;
  border: 1px solid #F1F1F1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product .description .cart-system .qty .minus {
  width: 30%;
  height: 53px;
  border: 1px solid #F1F1F1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.product .description .cart-system button {
  width: 55%;
  background: #EB3F36;
  border: none;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
}
.product .description .cart-system .icon {
  width: 10%;
  background: #F5F5F5;
  color: #EB3F36;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  cursor: pointer;
}

.product .description .about-product {
  margin-top: 20px;
  font-weight: 400;
  font-size: 18px;
  line-height: 17px;
  line-height: 2em;
  color: #696969;
  height: 450px;
  overflow: auto;
}

.more-information .navigation {
  display: flex;
  justify-content: space-evenly;
}

.more-information .navigation .nav-box{
  width: 30%;
  text-align: center;
  padding: 10px;
  font-weight: 700;
  font-size: 22px;
  color: #BEBEBE;
}

.more-information .navigation .nav-box.active {
  font-weight: 700;
  font-size: 22px;
  color: #EB3F36;
  border-bottom: 3px solid #EB3F36;
}

.more-information .nav-content {
  margin-top: 20px;
  font-weight: 400;
  font-size: 18px;
  padding: 0 40px;
  color: #696969;
}

.more-for-you {
  padding: 40px;
}

.more-for-you .header {
  display: flex;
  justify-content: center;
  color: #696969;
}

.more-for-you .header .title {
  width: 40%;
  text-align: center;
  padding: 10px;
  font-weight: 700;
  font-size: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.more-for-you .header .title .line {
  border: 2px solid #EB3F36;
  border-radius: 15px;
  width: 30%;
}

.more-for-you .product {
  display: flex;
  gap: 1em;
}
</style>
