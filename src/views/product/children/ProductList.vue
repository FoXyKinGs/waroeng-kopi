<template lang="pug">
.container
  .content
    .sidebar
      .title
        p.list-by URUTKAN BERDASARKAN
        font-awesome-icon(:icon='["fas", "angle-down"]')
      .price
        p Harga
        form(@submit.prevent='updatePrice')
          .slider
            .progress
          .range-input
            input(type="range" class="range-min" min="0" max="1000000" v-model="price.min" step="100")
            input(type="range" class="range-max" min="0" max="1000000" v-model="price.max" step="100")
          .price-input
            .field
              span Rp
              input(type='number' v-model="price.min")
            .separator -
            .field
              span Rp
              input(type='number' v-model="price.max")
          button(type='submit')
      .type
        type-carousel(
          v-for='(value, index) in dummyCategory'
          :key='index'
          :dummyCategory='value'
        )
    .list-product
      .shorting
        .show
          p Menampilkan
            select
              option(selected value='10') 10
              option(value='10') 100
            |  dari {{ products.total }}
        .short
          p Urutkan
            select(@change="sortingList" v-model='sorting')
              option(value='product_name,ASC') Nama Produk ASC
              option(value='product_name,DESC') Nama Produk DESC
              option(value='price,ASC') Harga ASC
              option(value='price,DESC') Harga DESC
              option(value='date,ASC') Tanggal ASC
              option(value='date,DESC') Tanggal DESC
      .product
          product-card(
            v-for='product in products.list'
            :key='product.id'
            :product='product'
          )
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import TypeCarousel from '@/components/TypeCarousel.vue'
import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    ProductCard,
    TypeCarousel
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const sorting = ref(route.query.order)
    const dummyCategory = ref([
      {
        category: 'Origin',
        lists: [
          { category: 'Aceh', stock: 9 },
          { category: 'Semarang', stock: 2 },
          { category: 'Bandung', stock: 7 },
          { category: 'Jawa', stock: 5 },
          { category: 'Amerika Selatan', stock: 6 },
          { category: 'Lain - lain', stock: 8 }
        ]
      },
      {
        category: 'Species',
        lists: [
          { category: 'Arabica', stock: 128 },
          { category: 'Robusta', stock: 23 },
          { category: 'Blend', stock: 9 }
        ]
      },
      {
        category: 'Roast Level',
        lists: [
          { category: 'Light Roast', stock: 8 },
          { category: 'Medium Roast', stock: 2 },
          { category: 'Dark Roast', stock: 7 },
          { category: 'Light to Medium Roast', stock: 5 }
        ]
      },
      {
        category: 'Tasted',
        lists: [
          { category: 'Sweet', stock: 18 },
          { category: 'Floral', stock: 21 },
          { category: 'Fruity', stock: 7 },
          { category: 'Nutty', stock: 5 },
          { category: 'Cocoa', stock: 21 },
          { category: 'Spices', stock: 18 }
        ]
      },
      {
        category: 'Processing',
        lists: [
          { category: 'Honey White', stock: 8 },
          { category: 'Natural', stock: 2 },
          { category: 'Honey Gold', stock: 7 },
          { category: 'Honey Yellow', stock: 5 }
        ]
      }
    ])
    const products = computed(() => store.getters.allProduct)
    const price = reactive({
      min: 0,
      max: 1000000
    })

    const updatePrice = () => {
      router.push({ path: route.path, query: { ...route.query, price: `${price.min},${price.max}` } })
    }

    const sortingList = () => {
      router.push({ path: route.path, query: { ...route.query, order: sorting.value } })
    }

    onMounted(() => {
      const rangeInput = document.querySelectorAll('.range-input input')
      const priceInput = document.querySelectorAll('.price-input input')
      const range = document.querySelector('.slider .progress')
      range.style.left = '0%'
      range.style.right = '0%'
      const priceGap = 1000
      priceInput.forEach(input => {
        input.addEventListener('input', e => {
          const minPrice = parseInt(priceInput[0].value)
          const maxPrice = parseInt(priceInput[1].value)

          if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
            if (e.target.className === 'input-min') {
              rangeInput[0].value = minPrice
              range.style.left = ((minPrice / rangeInput[0].max) * 100) + '%'
            } else {
              rangeInput[1].value = maxPrice
              range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + '%'
            }
          }
        })
      })
      rangeInput.forEach(input => {
        input.addEventListener('input', e => {
          const minVal = parseInt(rangeInput[0].value)
          const maxVal = parseInt(rangeInput[1].value)
          if ((maxVal - minVal) < priceGap) {
            if (e.target.className === 'range-min') {
              rangeInput[0].value = maxVal - priceGap
            } else {
              rangeInput[1].value = minVal + priceGap
            }
          } else {
            priceInput[0].value = minVal
            priceInput[1].value = maxVal
            range.style.left = ((minVal / rangeInput[0].max) * 100) + '%'
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%'
          }
        })
      })
    })
    return {
      updatePrice,
      products,
      price,
      dummyCategory,
      sorting,
      sortingList
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px 40px;
}

.content {
  display: flex;
}

.content .sidebar {
  width: 30%;
  padding: 20px;
  color: #696969;
}

.content .sidebar .title {
  display: flex;
  justify-content: space-between;
}

.content .sidebar .title .list-by {
  font-weight: 400;
  font-size: 18px;
  line-height: 17px;
}

.content .sidebar .price {
  margin-top: 20px;
}

.content .sidebar .price form {
  margin-top: 20px;
}

.content .sidebar .price form .price-input{
  width: 100%;
  display: flex;
  margin: 30px 0 0;
}
.content .sidebar .price form .price-input .field{
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
  font-size: 12px;
}
.content .sidebar .price form .field input{
  width: 100%;
  height: 30px;
  outline: none;
  background-color: #F2F2F2;
  font-size: 12px;
  margin-left: 12px;
  text-align: center;
  border: 1px solid #999;
  -moz-appearance: textfield;
}
.content .sidebar .price form input[type="number"]::-webkit-outer-spin-button,
.content .sidebar .price form input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.content .sidebar .price form .price-input .separator{
  width: 130px;
  display: flex;
  font-size: 19px;
  align-items: center;
  justify-content: center;
}

.content .sidebar .price form .slider{
  height: 5px;
  position: relative;
  background: #757575;
  border-radius: 5px;
}
.content .sidebar .price form .slider .progress{
  height: 100%;
  left: 25%;
  right: 25%;
  position: absolute;
  border-radius: 5px;
  background: #EB3F36;
}
.content .sidebar .price form .range-input{
  position: relative;
}
.content .sidebar .price form .range-input input{
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.content .sidebar .price form input[type="range"]::-webkit-slider-thumb{
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background: #EB3F36;
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
}
.content .sidebar .price form input[type="range"]::-moz-range-thumb{
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: #EB3F36;
  pointer-events: auto;
  -moz-appearance: none;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
}

.content .list-product {
  width: 70%;
  padding: 20px 0;
  color: #696969;
}

.content .list-product .shorting {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.content .list-product .shorting .show select {
  background-color: rgba(248, 248, 248, 0.75);
  border: none;
  padding: 5px;
  margin: 0 10px;
  border: 1px solid #8e8e8e;
  border-radius: 5px;
}

.content .list-product .shorting .short select {
  background-color: rgba(248, 248, 248, 1);
  border: none;
  padding: 5px 15px 5px 5px;
  margin: 0 10px;
  border: 1px solid #8e8e8e;
  border-radius: 5px;
}

.content .list-product .product {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
}
</style>
