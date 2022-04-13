<template>
  <div class="purchase-list-page__empty-page-wrapper p-5 flex-1  h-full">
    <div>
      <h2>Hồ Sơ Của Tôi</h2>
      <p class="text-muted">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
    </div>
    <hr />
    <div class="d-flex p-3">
      <a-form-model :model="form" ref="ruleForm">
        <div class="d-flex flex-column flex-70">
          <a-form-model-item
            prop="oldPassword"
            :rules="[
              {
                min: 6,
                message: 'Mật khẩu ngắn nhất 6 ký tự!',
                trigger: 'change'
              },
              {
                max: 20,
                message: 'Mật khẩu dài nhất 20 ký tự!'
              }
            ]"
          >
            <div class="form-group d-flex" style="align-items: center;">
              <p class="control-label" style="text-align: end; margin: 0 10px 0 0; width: 150px;">Mật khẩu cũ</p>
              <a-input
                v-model="form.oldPassword"
                @blur="DeepTrimValue(form)"
                placeholder="Mật khẩu cũ"
                class="form-control col-md-8 input-md"
                type="password"
                style="flex-shrink: 1; font-size: 14px"/>
            </div>
          </a-form-model-item>
          <a-form-model-item
            prop="newPassword"
            :rules="[
              {
                min: 6,
                message: 'Mật khẩu ngắn nhất 6 ký tự!',
                trigger: 'change'
              },
              {
                max: 20,
                message: 'Mật khẩu dài nhất 20 ký tự!'
              },
              {
                validator: checkPassword,
              }
            ]">
            <div class="form-group d-flex" style="align-items: center;">
              <p class="control-label" style="text-align: end; margin: 0 10px 0 0; width: 150px;">Mật khẩu mới</p>
              <a-input
                v-model="form.newPassword"
                @blur="DeepTrimValue(form)"
                placeholder="Mật khẩu mới"
                class="form-control col-md-8 input-md"
                type="password"
                style="flex-shrink: 1;font-size: 14px;"/>
            </div>
          </a-form-model-item>
          <div class="d-flex justify-content-center">
            <a-spin :spinning="loading">
              <button @click="handleSubmit" type="button" class="h-button__red p-3 h-color__white cursor-pointer">Xác nhận</button>
            </a-spin>
          </div>
        </div>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPass',
  data () {
    return {
      form: {
        oldPassword: '',
        newPassword: ''
      },
      loading: false
    }
  },
  methods: {
    handleSubmit () {
      const _this = this
      this.$confirm({
        content: 'Bạn có chắc muốn đổi mật khẩu?',
        onOk: () => {
          const params = {
            oldPassword: this.form.oldPassword,
            newPassword: this.form.newPassword
          }
          _this.loading = true
          _this.$store.dispatch('changePassword', params).then(rs => {
            if (rs) {
              _this.$message.success({ content: 'Đổi mật khẩu thành công!' })
              _this.$router.push({ name: 'login' })
            }
          }).catch(err => {
            const mes = _this.handleApiError(err)
            _this.$error({ content: mes })
            _this.form.oldPassword = ''
          }).finally(() => {
            _this.loading = false
          })
        }
      })
    },
    checkPassword (rule, value, callback) {
      if (this.form.oldPassword) {
        if (value === this.form.oldPassword) {
          callback(new Error('Mật khẩu mới không trùng với mật khẩu cũ!'))
        }
        callback()
      }
      callback()
    }
  }
}
</script>

<style>

</style>
