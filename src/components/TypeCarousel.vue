<template lang="pug">
.type
  .header-box(
    @click='isOpen = !isOpen'
  )
    p {{ dummyCategory.category }}
    font-awesome-icon(:icon='isOpen ? ["fas", "angle-down"] : ["fas", "angle-right"]')
  .box(
    v-if='isOpen'
  )
    .category(
      v-for='(value, index) in dummyCategory.lists'
      :key='index'
    )
      .checkbox
        input(type='checkbox')
        p {{ value.category }}
      .information
        p ({{value.stock}})
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: ['dummyCategory'],
  setup () {
    const isOpen = ref(true)

    return {
      isOpen
    }
  }
}
</script>

<style scoped>
  .type .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(245, 245, 245, 0.75);
    color: #696969;
    font-size: 18px;
    font-weight: 400;
    border-bottom: 3px solid rgba(217, 217, 217, 0.75);
    height: 41px;
    padding: 15px;
    cursor: pointer;
  }

  .type .box .category{
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .type .box .category .checkbox {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }

  .type .box .category .checkbox p {
    margin-left: 10px;
  }

</style>
