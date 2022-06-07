<template lang="pug">
nav
  form(
    @submit.prevent='search'
  )
    input(
      placeholder="Cari Produk"
      v-model='keyword'
    )
    button(
      type='submit'
    )
      font-awesome-icon(
        :icon="['fas', 'magnifying-glass']"
      )
  .information
    font-awesome-icon.icon(:icon="['far', 'heart']")
    font-awesome-icon.icon(:icon="['fas', 'bag-shopping']")
    .person(
      @click='isOpen = !isOpen'
    )
      font-awesome-icon.icon(:icon="['far', 'user']")
      font-awesome-icon.caret(:icon="['fas', 'caret-down']")
    .logout(
      v-if='isOpen'
      @click='logout'
    )
      p Logout
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()

    const keyword = ref('')
    const isOpen = ref(false)

    const logout = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }

    const search = () => {
      router.push({ path: route.path, query: { ...route.query, keyword: keyword.value } })
    }

    return {
      keyword,
      isOpen,
      logout,
      search
    }
  }
}
</script>

<style scoped>
nav {
  position: relative;
  padding: 20px 50px;
  height: 112px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

nav form {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  overflow: hidden;
  margin-right: 20px;
  height: 57px;
}

nav form input{
  width: 521px;
  height: 57px;
  padding: 20px;
  border: none;
  outline: none;
}

nav form button{
  border: none;
  width: 85px;
  height: 57px;
  background-color: #EB3F36;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}

nav .information {
  width: 150px;
  display: flex;
  justify-content: space-around;
  font-size: 24px;
}

nav .information .icon {
  cursor: pointer;
}

nav .information .person {
  display: flex;
  align-items: center;
  cursor: pointer;
}

nav .information .caret {
  font-size: 12px;
}

nav .information .logout {
  width: 100px;
  height: 50px;
  background: #8d8d8d;
  border-radius: 15px;
  position: absolute;
  bottom: -10px;
  right: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
</style>
