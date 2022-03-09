<template>
  <div class="form__container">
    <div class="form-header">
      <div class="form-header__title">
        <h2 class="form-header__text">Đăng nhập</h2>
      </div>
    </div>
    <div>
      <a-form-model
        id="components-form-demo-normal-login"
        :model="form"
        ref="ruleForm"
      >
        <a-form-model-item
          prop="phoneNumber"
          :rules="[
            {
              required: true,
              message: 'số điện thoại là bắt buộc!',
              trigger: 'change'
            },
            {
              validator: isPhoneNumber,
              trigger: 'blur'
            }
          ]"
        >
          <a-input
            v-model="form.phoneNumber"
            placeholder="Số điện thoại"
            class="form-input"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
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
            class="form-input"
            size="large"
            type="password"
            placeholder="Mật khẩu"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            size="large"
            html-type="submit"
            class="login-form-button"
            :loading="this.loading"
            @click="handleSubmit"
          >
            Đăng nhập
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <div class="wrap-forgot-password">
        <a class="forgot-password" href="#">Quên mật khẩu</a>
        <a class="login-sms" href="#">Đăng nhập với SMS</a>
      </div>
      <!-- <div>
          <div class="IFLxoY">
          <div class="_3svg61"></div>
          <span class="_1ZEpVL">HOẶC</span>
          <div class="_3svg61"></div>
          </div>
          <div class="_1ix216">
          <button class="dJsOUU _1A307B _1hKScg _1A307B _2ph_NL">
              <div class="_1b1OLX">
              <div
                  class="_1JEYOo social-white-background social-white-fb-png"
              ></div>
              </div>
              <div class="_1iDCwS _28-Tq8">Facebook</div></button
          ><button class="dJsOUU _1A307B _1hKScg _1A307B _1SPkQc">
              <div class="_1b1OLX _35Loth">
              <div
                  class="_1o_kg_ social-white-background social-white-google-png"
              ></div>
              </div>
              <div class="_1iDCwS">Google</div></button
          ><button class="dJsOUU _1A307B _1hKScg _1A307B nvH7Oz">
              <div class="_1b1OLX">
              <div
                  class="_1JEYOo social-white-background social-white-apple-png"
              ></div>
              </div>
              <div class="_1iDCwS">Apple</div>
          </button>
          </div>
      </div> -->
    </div>
    <div class="form-footer">
      <div class="form-footer__content">
        <span class="form-footer__text">Bạn mới biết đến Shopee?</span>
        <router-link class="button-redirect" :to="{ name: 'register' }">Đăng ký</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      form: {
        phoneNumber: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // TODO: call api login
          this.$router.push({ name: 'home' })
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
    }
  }
}
</script>

<style>

</style>
