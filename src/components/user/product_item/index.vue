<template>
  <div class="col-lbr l-2-4 m-4 c-6-lbr">
    <div class="home-produce-item" @click="gotoDetail">
      <div
        class="home-produce-item__img"
        :style="'background-image: url(' + productItem.image + ');'"></div>
      <h4 class="home-produce-item__name">{{ productItem.name }}</h4>
      <div class="home-produce-item__price">
        <span class="home-produce-item__price-old">{{ formatPriceToVND(productItem.price) }}</span>
        <span class="home-produce-item__price-new">{{ formatPriceToVND(calcNewPrice(productItem.price, productItem.discount)) }}</span>
      </div>
      <div class="home-produce-item__action">
        <span class="home-produce-item__like" @click="handleLikeProduct" :class="productItem.isLiked ? 'home-produce-item__liked' : ''">
          <a-tooltip placement="bottomLeft">
            <template slot="title">
              {{ productItem.isLiked ? 'Bỏ yêu thích' : 'Yêu thích' }}
            </template>
            <i class="home-produce-item__like-icon--empty far fa-heart"></i>
            <i class="home-produce-item__like-icon--fill fas fa-heart"></i>
          </a-tooltip>
        </span>

        <div class="home-produce-item__rating">
          <i class="home-produce-item__star-gold fas fa-star" v-for="index in Number.parseInt(productItem.numberOfStar)" :key="index"></i>
          <i class="fas fa-star" v-for="index in (5 - Number.parseInt(productItem.numberOfStar))" :key="productItem.numberOfStar + index"></i>
        </div>
        <span class="home-produce-item__sold">{{ productItem.sold }} đã bán</span>
      </div>
      <div class="home-produce-item__origin">
        <span class="home-produce-item__origin-brand">Whoo</span>
        <span class="home-produce-item__origin-name">Việt Nam</span>
      </div>
      <div class="home-produce-item__favourite" v-if="productItem.totalLiked >= FavouriteLevel">
        <i class="fas fa-check"></i>
        <span>Yêu thích</span>
      </div>
      <div class="home-produce-item__sale-off" v-if="productItem.discount > 0">
        <span class="home-produce-item__sale-off-percent">{{ productItem.discount }}%</span>
        <span class="home-produce-item__sale-off__sale-off-label">Giảm</span>
      </div>
    </div>
  </div>
</template>

<script>
import { likeProduct } from '@/api/product/index'
import { FavouriteLevel } from '@/const/app.const'
import _ from 'lodash'
export default {
  name: 'ProductItem',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      productItem: null,
      FavouriteLevel
    }
  },
  created () {
    this.productItem = _.cloneDeep(this.product)
  },
  methods: {
    gotoDetail () {
      this.$router.push({ path: `/product/${this.convertToSlugToProductDetail(this.product.name, this.product.id)}` })
    },
    handleLikeProduct (e) {
      e.stopPropagation()
      if (this.$store.getters.isLogin) {
        const params = {
          userId: this.$store.getters.userId,
          productId: this.product.id
        }
        likeProduct(params).then(rs => {
          if (rs) {
            this.productItem.isLiked = !this.productItem.isLiked
            const mes = (this.productItem.isLiked ? 'Yêu thích ' : 'Bỏ yêu thích ') + 'sản phẩm thành công!'
            this.$message.success({ content: mes })
          }
        }).catch(err => {
          const mes = this.handleApiError(err)
          this.$error({ content: mes })
        })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style>

</style>
