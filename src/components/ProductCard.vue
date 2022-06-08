<template lang="pug">
.product-box(
  @click='seeDetail(product.id)'
)
  .image
    img(
      :src='product.images[0].image_url'
    )
    .img-action
      .box
        font-awesome-icon.icon(:icon="['far', 'heart']")
      .box
        font-awesome-icon.icon(:icon="['fas', 'bag-shopping']")
  .description
    p.name {{ titleConverter(product.name) }}
    p.product-by {{ product.product_type.name }}
    .rating start
    p.price {{ convertToIDR(product.price) }}
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: ['product'],
  setup () {
    const router = useRouter()

    const convertToIDR = (val) => {
      const format = val.toString().split('').reverse().join('')
      const convert = format.match(/\d{1,3}/g)

      return 'Rp ' + convert.join('.').split('').reverse().join('')
    }

    const titleConverter = (val) => {
      return val.replace(/(.{20})..+/, '$1…')
    }

    const seeDetail = (val) => {
      router.push(`/${val}`)
    }

    return {
      convertToIDR,
      titleConverter,
      seeDetail
    }
  }
}
</script>

<style scoped>
.product-box {
  cursor: pointer;
  position: relative;
  margin-top: 25px;
  width: 32%;
  height:347px;
  border: 1px solid #ECECEC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.product-box:hover {
  border: 1px solid #EB3F36;
}

.product-box:hover .image .img-action {
  opacity: 1;
}

.product-box .image {
  position: relative;
}

.product-box .image img {
  width: 100%;
  height: 225px;
}

.product-box .image .img-action {
  position: absolute;
  background-color: #F4F4F4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  overflow: hidden;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.product-box .image .img-action .box:first-child {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50px;
  border: 1px solid #8e8e8e;
}

.product-box .image .img-action .box:last-child {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50px;
  border: 1px solid #8e8e8e;
}

.product-box .description {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 10px;
}

.product-box .description .name {
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: #696969;
}

.product-box .description .product-by {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #696969;
}

.product-box .description .rating{
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  color: #696969;
}

.product-box .description .price{
  margin-top: 10px;
  font-weight: 500;
  font-size: 18px;
  line-height: 17px;
  text-align: center;
  color: #EB3F36;
}

</style>
