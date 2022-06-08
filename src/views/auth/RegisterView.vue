<template lang="pug">
.container
  .content
    .handler-title
      p.title(
        v-if='regStep === 1'
      ) Daftar Sekarang
      p.back(
        v-else
        @click='changeStep(1)'
      )
        font-awesome-icon.icon(
          :icon="['fas', 'arrow-left-long']"
        )
        |  Kembali
    form(
      @submit.prevent="changeStep(2)"
      v-if='regStep === 1'
    )
      input(
        placeholder="Nama Depan"
        type='text'
        v-model='form.firstName'
        required
      )
      input(
        placeholder="Nama Belakang"
        type='text'
        v-model='form.lastName'
        required
      )
      input(
        placeholder="Email"
        type='email'
        v-model='form.email'
        required
      )
      button(
        type='submit'
      ) Selanjutnya
    form(
      @submit.prevent="register"
      v-else
    )
      input(
        placeholder="Nomor telepon"
        type='text'
        v-model='form.phone'
        required
      )
      input(
        placeholder="Password"
        type='password'
        v-model='form.password'
        required
      )
      input(
        placeholder="Konfirmasi Password"
        type='password'
        v-model='form.confirmPassword'
        required
      )
      button(
        type='submit'
      ) Selanjutnya
    hr
    p.information Sudah punya akun?
      router-link.link(
        to='/login'
      )  Masuk
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, ref } from '@vue/reactivity'
import Swal from 'sweetalert2'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const regStep = ref(1)
    const form = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })

    const changeStep = (val) => {
      regStep.value = val
    }

    const register = () => {
      if (form.confirmPassword !== form.password) {
        Swal.fire({
          title: 'password tidak cocok',
          toast: true,
          icon: 'error',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          position: 'top-end',
          didOpen: (toast) => {
            toast.addEventListener('mouseover', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
      } else {
        const data = {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          password: form.confirmPassword
        }

        store.dispatch('Register', data)
          .then(() => {
            Swal.fire({
              title: 'Berhasil membuat akun',
              toast: true,
              icon: 'success',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
              position: 'top-end',
              didOpen: (toast) => {
                toast.addEventListener('mouseover', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            router.push('/login')
          })
      }
    }

    return {
      regStep,
      changeStep,
      register,
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

.content p.back {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #730C07;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.content p.back .icon {
  height: 36px;
  width: 29px;
  margin-right: 10px;
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

.content form>button {
  margin-top: 20px;
  font-size: 18px;
  height: 60px;
  border: none;
  color: #fff;
  background-color: #EB3F36;
  box-shadow: 0px 7px 6px rgba(0, 0, 0, 0.17);
  border-radius: 7px;
  cursor: pointer;
}

.content hr {
  margin-top: 20px;
  width: 420px;
  margin-left: auto;
  margin-right: auto;
}

.content .information {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
