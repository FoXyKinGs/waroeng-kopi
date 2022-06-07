<template lang="pug">
.container
  .content
    p.title Masuk
    form(
      @submit.prevent='login'
    )
      input(
        placeholder="Email"
        required
        v-model='form.email'
        type='email'
      )
      input(
        placeholder="Password"
        required
        v-model='form.password'
        type='password'
      )
      p Lupa password?
      button(
        type='submit'
      ) Masuk
    hr
    p.information Belum punya akun?
      router-link.link(
        to='/register'
      )  Daftar Sekarang
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      email: '',
      password: ''
    })

    const login = () => {
      store.dispatch('Login', form)
        .then(() => {
          router.push('/?keyword=&price=0,750000&page=1&limit=10&order=product_name,ASC')
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return {
      login,
      form
    }
  }
}
</script>

<style scoped>
.container {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    position: relative;
    width: 568px;
    height: 509px;
    box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 42px 34px;
}

.content p.title {
    font-weight: 700;
    font-size: 26px;
    line-height: 25px;
    letter-spacing: 0.04em;
    color: #730C07;
}

.content form {
    display: flex;
    flex-direction: column;
    padding: 40px 0 20px 0;
}

.content form>input {
    height: 60px;
    font-size: 16px;
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    margin-top: 10px;
    padding: 0 20px;
}

.content form>p {
    margin-left: auto;
    margin-top: 10px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #730C07;
    cursor: pointer;
}

.content form>button {
    margin-top: 20px;
    font-size: 18px;
    height: 60px;
    border: none;
    color: #fff;
    background-color: #EB3F36;
    box-shadow: 0px 7px 6px rgba(0, 0, 0, 0.17);
    border-radius: 7px;
}

.content hr {
    margin-top: 40px;
    width: 420px;
    margin-left: auto;
    margin-right: auto;
}

.content .information {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    font-weight: 400;
    font-size: 16px;
    line-height: 15px;
    color: #7C7C7C;
}

.content .information .link {
    margin-left: 5px;
    font-weight: 700;
    color: #730C07;
    text-decoration: none;
}
</style>
