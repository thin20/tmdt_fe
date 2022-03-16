<template>
  <div class="form__container">
    <div class="form-header">
      <div class="form-header__title">
        <h2 class="form-header__text">Đăng ký</h2>
      </div>
    </div>
    <div class="form-content">
      <a-form-model :model="form" ref="ruleForm">
        <a-form-model-item
          prop="firstName"
          :rules="[
            {
              required: true,
              message: 'Tên đệm là bắt buộc!',
              trigger: 'change'
            }
          ]"
        >
          <a-input
            v-model="form.firstName"
            placeholder="Tên đệm"
            size="large"
          />
        </a-form-model-item>
        <a-form-model-item
          prop="lastName"
          :rules="[
            {
              required: true,
              message: 'Tên là bắt buộc!',
              trigger: 'change'
            }
          ]"
        >
          <a-input
            v-model="form.lastName"
            placeholder="Tên"
            size="large"
          />
        </a-form-model-item>
        <a-form-model-item
          prop="phoneNumber"
          :rules="[
            {
              required: true,
              message: 'Số điện thoại là bắt buộc!',
              trigger: 'change'
            },
            {
              validator: isPhoneNumber,
              trigger: 'change'
            }
          ]"
        >
          <a-input
            v-model="form.phoneNumber"
            placeholder="Số điện thoại"
            size="large"
          >
          </a-input>
        </a-form-model-item>
        <a-form-model-item
          prop="password"
          :rules="[
            {
              required: true,
              message: 'Mật khẩu là bắt buộc!',
              trigger: 'change'
            }
          ]"
        >
          <a-input
            v-model="form.password"
            placeholder="Mật khẩu"
            size="large"
            type="password"
          />
        </a-form-model-item>
        <a-form-model-item
          prop="confirmPassword"
          :rules="[
            {
              required: true,
              message: 'Xác nhận mật khẩu là bắt buộc!',
              trigger: 'change'
            },
            {
              validator: compareToFirstPassword,
              trigger: 'blur'
            }
          ]"
        >
          <a-input
            v-model="form.confirmPassword"
            placeholder="Xác nhận mật khẩu"
            size="large"
            type="password"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button size="large" class="login-form-button" html-type="submit" :loading="this.loading" @click="handleSubmit">
            Đăng ký
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <div class="wrap-forgot-password">
        <a class="forgot-password" href="#">Quên mật khẩu</a>
        <a class="login-sms" href="#">Đăng nhập với SMS</a>
      </div>
    </div>
    <div class="form-footer">
      <div class="form-footer__content">
        <span class="form-footer__text">Bạn mới biết đến Shopee?</span>
        <router-link class="button-redirect" :to="{ name: 'login' }">Đăng nhập</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/user/index'
export default {
  name: 'Register',
  data () {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      loading: false,
      form: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            phoneNumber: this.form.phoneNumber,
            password: this.form.password
          }
          this.loading = true
          register(params).then(rs => {
            if (rs) {
              this.$message.success({ content: 'Đăng ký tài khoản thành công!' })
              this.$router.push({ name: 'login' })
            }
          }).catch(err => {
            const mes = this.handleApiError(err)
            this.$error({ content: mes })
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    isPhoneNumber (rule, value, callback) {
      const regex = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
      if (value && !regex.test(value)) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('Số điện thoại không hợp lệ!')
      }
      callback()
    },
    compareToFirstPassword (rule, value, callback) {
      if (value && value !== this.form.password) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('Hai mật khẩu bạn nhập không nhất quán!')
      } else {
        callback()
      }
    }
  }
}
</script>

<style>

</style>
