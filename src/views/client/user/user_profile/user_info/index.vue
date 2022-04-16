<template>
  <div class="purchase-list-page__empty-page-wrapper p-5 flex-1  h-full">
    <div>
      <h2>Hồ Sơ Của Tôi</h2>
      <p class="text-muted">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
    </div>
    <hr />
    <div class="d-flex p-3">
      <a-form-model ref="ruleForm" :model="form" class="d-flex flex-column flex-70" style="flex: 1;padding: 0 40px;">
        <div class="form-group d-flex form-field-item" style="align-items: center;">
          <p
            class="control-label text-field"
            style="margin: 0 10px 0 0;">Số điện thoại</p>
          <div
            class="control-label"
            style="margin: 0 10px 0 0;"> <span>{{ form.phoneNumber }}</span>
          </div>
        </div>
        <a-form-model-item
          prop="firstName"
          :rules="[
            {
              required: true,
              message: 'Tên đệm không được để trống',
              trigger: 'change'
            },
            {
              max: 15,
              message: 'Không vượt quá 15 ký tự',
              trigger: 'change'
            }
          ]">
          <div class="form-group d-flex form-field-item" style="align-items: center;">
            <p class="control-label text-field" style="margin: 0 10px 0 0;">Tên đệm</p>
            <a-input
              placeholder="Tên đệm"
              class="form-control col-md-8 input-md"
              v-model="form.firstName"
              @blur="DeepTrimValue(form)"
              style="flex-shrink: 1;font-size: 14px;"></a-input>
          </div>
        </a-form-model-item>
        <a-form-model-item
          prop="lastName"
          :rules="[
            {
              required: true,
              message: 'Tên không được để trống',
              trigger: 'change'
            },
            {
              max: 15,
              message: 'Không vượt quá 15 ký tự',
              trigger: 'change'
            }
          ]">
          <div class="form-group d-flex form-field-item" style="align-items: center;">
            <p
              class="control-label text-field"
              style="margin: 0 10px 0 0;">Tên</p>
            <a-input
              placeholder="Tên"
              class="form-control col-md-8 input-md"
              v-model="form.lastName"
              @blur="DeepTrimValue(form)"
              style="flex-shrink: 1;font-size: 14px;"></a-input>
          </div>
        </a-form-model-item>
        <a-form-model-item
          prop="email">
          <div class="form-group d-flex form-field-item" style="align-items: center;">
            <p class="control-label text-field" style="margin: 0 10px 0 0;">Email</p>
            <div
              class="control-label"
              v-if="form.email && !visibleEmail"
              style="margin: 0 10px 0 0;"> <span>{{ form.email }}</span>
              <span
                class="control-label button__change-value"
                @click="() => { visibleEmail = true }"> Thay đổi </span>
            </div>
            <div v-if="!form.email">
              <p
                class="control-label button__change-value"
                style="margin: 0 10px 0 0;"
                v-if="!visibleEmail"
                @click="() => { visibleEmail = true }"> Thêm</p>
            </div>
            <a-input
              placeholder="Email"
              v-if="visibleEmail"
              v-model="form.email"
              class="form-control col-md-8 input-md"
              @blur="DeepTrimValue"></a-input>
          </div>
        </a-form-model-item>
        <a-form-model-item
          prop="shobbeName"
        >
          <div class="form-group d-flex form-field-item" style="align-items: center;">
            <p
              class="control-label text-field"
              style="margin: 0 10px 0 0;">Tên Shop
            </p>
            <a-input
              placeholder="Tên Shop"
              class="form-control col-md-8 input-md"
              style="flex-shrink: 1;font-size: 14px;"
              @blur="DeepTrimValue(form)"
              v-model="form.shobbeName"></a-input>
          </div>
        </a-form-model-item>
        <div class="d-flex" style="padding-left: calc(20% + 1.25rem);" @click="onUpdateInfoUser">
          <a-spin :spinning="loading">
            <button @click="handleUpdateUserInfo" type="button" class="h-button__red h-color__white cursor-pointer btn-save">Lưu</button>
          </a-spin>
        </div>
      </a-form-model>
      <div style="width: 26.5rem; border-left: 1px solid #efefef;">
        <div class="d-flex flex-column justify-content-center align-center align-items-center " style="margin: 0px 46px;">
          <div
            class="d-flex justify-content-end avatar-uploader__avatar-image comment__image rounded-circle"
            id="user-image"
            style="
                    width: 100px;
                    height: 100px;
                    margin-right: 0;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;"
            :style="{ backgroundImage: `url(${ form.image})`}"
          ></div>
          <div class=" p-2 btn-light cursor-pointer mt-4">
            <span class="mx-2 " id="btn-choose-image-user" @click="openFolderChoosePicture">
              Chọn ảnh
            </span>
            <input ref="inputChoosePicture" class="avatar-uploader__file-input" type="file" accept=".jpg,.jpeg,.png" @change="userChoosePhotoFromLocal"/>
          </div>
          <p class="text-muted mt-3">
            Dụng lượng file tối đa 1 MB
            Định dạng:.JPEG, .PNG
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseMixin } from '@/store/app-mixin.js'
export default {
  name: 'UserInfo',
  mixins: [baseMixin],
  data () {
    return {
      form: {
        // url preview
        image: '',
        // file to upload server
        fileImage: null,
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        shobbeName: ''
      },
      visibleEmail: false,
      loading: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo.info
    }
  },
  watch: {
    userInfo (newValue, oldValue) {
      this.form = { ...this.form, ...newValue }
    }
  },
  created () {
    this.form = {
      ...this.form,
      image: this.$store.getters.image,
      email: this.$store.getters.email,
      phoneNumber: this.$store.getters.phoneNumber,
      firstName: this.$store.getters.firstName,
      lastName: this.$store.getters.lastName,
      shobbeName: this.$store.getters.shobbeName
    }
  },
  methods: {
    openFolderChoosePicture () {
      this.$refs.inputChoosePicture.click()
    },
    userChoosePhotoFromLocal (event) {
      this.form.image = URL.createObjectURL(event.target.files[0])
      this.form.fileImage = event.target.files[0]
    },
    onUpdateInfoUser () {
      const dataUpdateUser = {
        // image: this.image,
        email: this.form.email,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        shobbeName: this.form.shobbeName
      }

      if (this.form.fileImage) dataUpdateUser.fileImage = this.form.fileImage
    },
    handleUpdateUserInfo () {
      const _this = this
      this.$confirm({
        content: 'Bạn có chắc muốn cập nhật thông tin?',
        onOk: () => {
          _this.loading = true
          _this.$refs.ruleForm.validate(valid => {
            if (valid) {
              const params = {
                firstName: _this.form.firstName,
                lastName: _this.form.lastName,
                email: _this.form.email,
                shobbeName: _this.form.shobbeName
              }
              _this.$store.dispatch('updateUserInfo', params).then(rs => {
                _this.$message.success({ content: 'Cập nhật thông tin thành công!' })
              }).catch(err => {
                const mes = _this.handleApiError(err)
                _this.$error({ content: mes })
              }).finally(() => {
                _this.loading = false
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.text-field{
  flex-basis: 20%;
  text-align: right;
}

.form-field-item{
  margin-bottom: 10px;
}

.button__change-value{
  text-decoration: underline;
  color: #0055aa;
  font-size: 12px;
}

.btn-save{
  height: 40px;
  padding: 0 20px;
  min-width: 70px;
  max-width: 220px;
  border-radius: 5px;
}

.purchase-list-page__empty-page-wrapper .ant-form-explain {
  margin-left: 125px;
}

</style>
