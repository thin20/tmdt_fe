<template>
  <a-spin :spinning="loadingDrawer" class="app-spinning">
    <a-drawer
      :title="drawTitle"
      :visible="drawSync"
      :maskClosable="false"
      width="35%"
      @close="handleCancel"
    >
      <a-spin :spinning="loadingDrawer">
        <a-form-model
          ref="ruleForm"
          :model="modelForm"
          @submit="handleSubmit"
          layout="vertical">
          <a-card style="width: 100%;border: none;padding: 0 0 60px 0" class="search-container">
            <a-row :gutter="16" type="flex">
              <a-col :xs="24" :md="24" :lg="12" class="filter-item-container">
                <a-form-model-item
                  prop="categoryId"
                  label="Loại sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Loại sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]">
                  <a-tree-select
                    :allowClear="true"
                    :filterTreeNode="filterTreeSelectOption"
                    show-search
                    :disabled="isEditable||isView"
                    style="width: 100%"
                    v-model="modelForm.categoryId"
                    :tree-data="listProductType"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="12" class="filter-item-container">
                <a-form-model-item
                  prop="name"
                  label="Tên sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Tên sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]">
                  <a-input
                    v-model="modelForm.name"
                    :disabled="isView"
                    style="color: black"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="price"
                  label="Giá sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Giá sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.price"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="quantity"
                  label="Số lượng sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Số lượng sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.quantity"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="discount"
                  label="Giảm giá"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.discount"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="24">
                <a-form-model-item
                  label="Ảnh mô tả sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Giá sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]"
                >
                  <div class="clearfix">
                    <a-upload
                      :disabled="isView"
                      accept="image/*"
                      name="file"
                      :multiple="true"
                      :before-upload="handleBeforeUpload"
                      list-type="picture-card"
                      :file-list="fileList"
                      :remove="onRemoveFile"
                      @preview="handlePreview"
                      @change="handleChangeFileUpload"
                    >
                      <a-icon type="plus" />
                      <div class="ant-upload-text">
                        Tải lên
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPreview">
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="24" class="filter-item-container">
                <a-form-model-item
                  prop="description"
                  label="Mô tả"
                >
                  <a-textarea
                    v-html="modelForm.description"
                    :disabled="isView"
                    style="color: black"
                    v-model="modelForm.description"
                    :maxLength="500"
                    :auto-size="{ minRows: 10}"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form-model>
      </a-spin>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <div v-if="isEditable || isCreate">
          <a-button
            @click="handleCancel"
            style=" min-width:120px">Bỏ qua
          </a-button>
          <a-button
            type="primary"
            style="margin-left: 1rem;"
            @click="handleSubmit"
            :loading="loadingDrawer">Lưu
          </a-button>
        </div>
        <div align="right" v-else>
          <a-button
            @click="handleCancel"
            style="min-width:120px">Bỏ qua
          </a-button>
        </div>
      </div>
    </a-drawer>
  </a-spin>
</template>
<script>
import { getProductDetail, createProduct, updateProduct } from '@/api/product/index'
import { amazonUploadFiles } from '@/api/amazonUploadFiles'
import { getBase64 } from '@/utils/util'

export default {
  name: 'DrawForm',
  components: {},
  props: {
    isCreate: {
      type: Boolean,
      required: true
    },
    isEditable: {
      type: Boolean,
      required: true
    },
    isView: {
      type: Boolean,
      required: true
    },
    objectEdit: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    },
    listProductType: {
      type: Array,
      required: true
    },
    listStatus: {
      type: Array,
      required: true
    },
    drawTitle: {
      type: String,
      required: true
    },
    drawSync: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      previewVisible: false,
      loadingDrawer: false,
      modelForm: {
        address: '',
        createdAt: '',
        description: '',
        discount: '',
        id: '',
        categoryId: '',
        userId: '',
        image: '',
        images: [],
        isSell: '',
        name: '',
        numberOfStar: '',
        price: '',
        quantity: '',
        sold: '',
        title: '',
        updatedAt: ''
      },
      previewImage: '',
      fileList: [],
      filePreUpload: [],
      fileIdRemove: []
    }
  },
  async created () {
    if ((this.isEditable && this.objectEdit && this.objectEdit.id) || (this.isView && this.objectEdit && this.objectEdit.id)) {
      const params = {
        userId: this.$store.getters.userId,
        productId: this.objectEdit.id
      }
      const body = await getProductDetail(params)
      if (body) {
        const { depicted, productDetail } = body
        this.modelForm = productDetail
        this.modelForm.images = depicted
        const len = this.modelForm.images && Array.isArray(this.modelForm.images) && this.modelForm.images.length || 0
        if (!len) {
          this.fileList = []
        }
        for (let i = 0; i < len; i++) {
          this.fileList.push({
            uid: this.modelForm.images[i].id,
            name: 'image.png',
            status: 'done',
            url: this.modelForm.images[i].path
          })
        }
      }
    }
  },
  methods: {
    handleBeforeUpload (file) {
      this.filePreUpload.push(file)
      return false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChangeFileUpload (info) {
      const fileList = [...info.fileList]
      this.fileList = fileList
    },
    onRemoveFile (file) {
      this.filePreUpload = this.filePreUpload.filter(item => {
        return item.uid !== file.uid
      })
      if (this.isEditable) {
        this.fileIdRemove.push(file.uid)
      }
    },
    handleCancelPreview () {
      this.previewVisible = false
    },
    gotoList (reload = false) {
      this.$emit('closeDraw', reload)
    },
    handleCancel () {
      this.$emit('closeDraw', false)
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.fileList) {
            const $this = this
            $this.$confirm({
              title: 'Bạn chắc chắn muốn ' + (this.objectEdit.id && this.isEditable ? 'cập nhật' : 'thêm mới') + ' sản phẩm?',
              onOk () {
                $this.doUpdate()
              },
              onCancel () {
              }
            })
          } else {
            this.$notification.error({
              message: 'Thêm mới sản phẩm',
              description: 'Ảnh mô tả sản phẩm không được để trống',
              duration: 5
            })
          }
        }
      })
    },
    doUpdate () {
      if (this.objectEdit.id && this.isEditable) {
        if (this.fileList.length === 0) return
        this.loadingDrawer = true
        const formData = new FormData()
        const len = this.filePreUpload.length
        for (let i = 0; i < len; i++) {
          formData.append('files', this.filePreUpload[i])
        }
        amazonUploadFiles(formData).then(rs => {
          const imagesPath = []
          rs.filePath && Array.isArray(rs.filePath) && rs.filePath.forEach(item => {
            imagesPath.push(item.filePath)
          })

          const params = {
            productId: this.modelForm.id,
            productName: this.modelForm.name,
            categoryId: this.modelForm.categoryId,
            quantity: Number(this.modelForm.quantity),
            price: Number(this.modelForm.price),
            discount: Number(this.modelForm.discount),
            imagePath: this.fileList[0].url,
            description: this.modelForm.description,
            fileIdRemove: this.fileIdRemove,
            imagesPath: imagesPath
          }
          console.log(params)
          updateProduct(params).then(rs => {
            if (rs) {
              this.$message.success({ content: 'Cập nhật sản phẩm thành công!' })
              this.gotoList(true)
            }
          }).catch(err => {
            const mes = this.handleApiError(err)
            this.$error({ content: mes })
          }).finally(() => {
            this.loadingDrawer = false
          })
        }).finally(() => {
          this.loadingDrawer = false
        })
      } else {
        this.loadingDrawer = true
        const formData = new FormData()
        const len = this.filePreUpload.length
        for (let i = 0; i < len; i++) {
          formData.append('files', this.filePreUpload[i])
        }
        amazonUploadFiles(formData).then(rs => {
          if (rs) {
            const imagesPath = []
            rs.filePath && Array.isArray(rs.filePath) && rs.filePath.forEach(item => {
              imagesPath.push(item.filePath)
            })
            const params = {
              productName: this.modelForm.name,
              categoryId: this.modelForm.categoryId,
              quantity: Number(this.modelForm.quantity),
              price: Number(this.modelForm.price),
              discount: Number(this.modelForm.discount),
              description: this.modelForm.description,
              imagesPath: imagesPath
            }
            createProduct(params).then(rs => {
              if (rs) {
                this.$message.success({ content: 'Thêm mới sản phẩm thành công!' })
                this.gotoList(true)
              }
            }).catch(err => {
              const mes = this.handleApiError(err)
              this.$error({ content: mes })
            }).finally(() => {
              this.loadingDrawer = false
            })
          } else {
            this.$error({ content: 'Bạn phải chọn ảnh cho sản phẩm!' })
          }
        }).catch(err => {
          const mes = this.handleApiError(err)
          this.$error({ content: mes })
        }).finally(() => {
          this.loadingDrawer = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
