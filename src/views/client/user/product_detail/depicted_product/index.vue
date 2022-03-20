<template>
  <div class="depicted-product">
    <div class="row">
      <div class="col col-12 slider-for">
        <img :src="product.image" alt="product" class="depicted-product__img-item depicted-product__img" style="width: 100%" @click="showLightBox(0)">
      </div>
    </div>

    <div class="row">
      <div class="col col-12 depicted-product__img-list slider-nav">
        <img
          v-for="(image, index) in images"
          :key="image.id"
          :src="image.path"
          alt="product"
          class="depicted-product__img-item"
          width="115"
          height="115"
          style="object-fit:cover"
          @click="showLightBox(index)">
      </div>

      <vue-easy-lightbox
        escDisabled
        moveDisabled
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </div>
    <div class="row">
      <div class="col col-12 depicted-product__social">
        <div class="depicted-product__social-share">
          <span>Chia sẻ:</span>
          <a href="#">
            <i class="fab fa-facebook-messenger social-share--messenger"></i>
          </a>
          <a href="#">
            <i class="fab fa-facebook social-share--facebook"></i>
          </a>
          <a href="#">
            <i class="fab fa-google-plus social-share--google-plus"></i>
          </a>
          <a href="#">
            <i class="fab fa-pinterest social-share--pinterest"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter-square social-share--twitter"></i>
          </a>
        </div>
        <div class="depicted-product__social-like" @click="handleLikeProduct">
          <i class="fas fa-heart social-like--heart" v-if="product.isLiked"></i>
          <i class="far fa-heart social-like--heart" v-else></i>
          <span class="depicted-product__social-like__number">Đã thích ({{ product.totalLiked }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
import { likeProduct } from '@/api/product/index'
import _ from 'lodash'

export default {
  name: 'DepictedProduct',
  components: { VueEasyLightbox },
  props: {
    images: {
      type: Array,
      required: true
    },
    productDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      imgs: [],
      product: {},
      visible: false,
      index: 0 // default: 0
    }
  },
  created () {
    this.product = _.cloneDeep(this.productDetail)
  },
  watch: {
    images (newValue) {
      this.imgs = _.cloneDeep(newValue)
    },
    productDetail (newValue) {
      this.product = _.cloneDeep(newValue)
    }
  },
  methods: {
    showLightBox (index) {
      this.imgs = this.images.map(image => ({
        src: image.path,
        title: this.productName
      }))
      this.index = index
      this.show()
    },
    show () {
      this.visible = true
    },
    handleHide () {
      this.visible = false
    },
    handleLikeProduct () {
      if (!this.$store.getters.isLogin) {
        this.$message.error({ content: 'Bạn chưa login!' })
      } else {
        const params = {
          currentUserId: this.$store.getters.userId,
          productId: this.product.id
        }
        likeProduct(params).then(rs => {
          if (rs) {
            const mes = this.product.isLiked ? 'Hủy yêu thích sản phẩm thành công!' : 'Yêu thích sản phẩm thành công!'
            this.$message.success({ content: mes })
            this.product.totalLiked = this.product.isLiked ? this.product.totalLiked - 1 : this.product.totalLiked + 1
            this.product.isLiked = !this.product.isLiked
          } else {
            const mes = this.product.isLiked ? 'Hủy yêu thích sản phẩm thất bại!' : 'Yêu thích sản phẩm thất bại!'
            this.$message.error({ content: mes })
          }
        }).catch(err => {
          const mes = this.handleApiError(err)
          this.$message.error({ content: mes })
        })
      }
    }
  }
}
</script>

<style>
.depicted-product__img {
    width: 100%;
}

.depicted-product__img-list {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  overflow-x: auto;
}

.depicted-product__img-item {

  max-width: 100%;
  min-width: 24%;
  padding: 5px;
}

.depicted-product__social {
    margin: 12px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.depicted-product__social span {
    font-size: 1.6rem;
    font-weight: 400;
}
.depicted-product__social-share i {
    font-size:2.2rem;
    margin-left: 6px;
}

.social-share--messenger {
    color: #0384ff;
}
.social-share--facebook {
    color: #3b5999;
}
.social-share--google-plus {
    color: #d44e43;
}
.social-share--pinterest {
    color: #de0419;
}
.social-share--twitter {
    color: #10c2ff;
}

.social-like--heart {
    font-size: 2.2rem;
    color: var(--primary-color);
    margin-right: 6px;
}

.depicted-product__social-share {
    display: flex;
    align-items: center;
}

.depicted-product__social-like {
    display: flex;
    align-items: center;
    margin-left: 6px;
    cursor: pointer;
}

</style>
