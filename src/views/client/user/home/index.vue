<template>
  <div class="app__container">
    <div class="grid wide">
      <div class="row sm-gutter app__content">
        <div class="col-lbr l-12 m-12 c-12">
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile :listCategory="listCategory"></category-mobile>
            <!-- home carousel -->
            <home-carousel style="margin-bottom: 18px"></home-carousel>
            <!-- category home pc -->
            <category-home :listCategory="listCategory"></category-home>
            <!-- list product -->
            <div class="row-lbr sm-gutter list-product" style="padding-bottom: 40px; margin-top: 20px; min-height: 50px">
              <product-item v-for="(product, index) in listProduct" :key="index" :product="product"></product-item>
              <a-spin size="large" :spinning="loadingListProduct" style="width: 100%; margin-top: 30px;"></a-spin>

              <div v-if="listProduct.length === 0 && !loadingListProduct" class="no-product">
                <img src="@/assets/img/no-cart.png" alt="no product" class="no-product-img"/>
                <span class="no-product-msg">Không tìm thấy sản phẩm nào</span>
              </div>
            </div>
            <button v-if="listProduct.length > 0" class="btn btn--primary btn-watch-more-product" @click="handleWatchMore">Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCarousel from '@/components/user/home_carousel'
import CategoryMobile from '@/components/user/category_mobile'
import CategoryHome from '@/components/user/category_home_pc'
import ProductItem from '@/components/user/product_item/index'
import { getListCategoryParent } from '@/api/category/index'
import { searchListProduct } from '@/api/product/index'
import { bus } from '@/main'
export default {
  name: 'Home',
  components: {
    HomeCarousel,
    CategoryMobile,
    CategoryHome,
    ProductItem
  },
  data: () => {
    return {
      listCategory: [],
      listProduct: [],
      currentPage: 0,
      keyword: '',
      loadingListProduct: false
    }
  },
  created () {
    this.getListCategory()
    this.getListProduct()
    bus.$on('searchProductsByKeyword', this.searchProductsByKeyword)
  },
  destroyed () {
    bus.$off('searchProductsByKeyword', this.searchProductsByKeyword)
  },
  methods: {
    getListCategory () {
      getListCategoryParent().then(rs => {
        if (rs) {
          this.listCategory = rs
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      })
    },
    getListProduct () {
      const params = {
        page: this.currentPage,
        size: 20,
        keyword: this.keyword
      }
      if (this.$store.getters.isLogin) {
        params.currentUserId = this.$store.getters.userId
      }
      this.loadingListProduct = true
      searchListProduct(params).then(rs => {
        if (rs) {
          if (this.currentPage <= rs.page_meta.total_page) this.currentPage += 1
          this.listProduct = this.listProduct.concat(rs.data)
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      }).finally(() => {
        this.loadingListProduct = false
      })
    },
    searchProductsByKeyword (keyword = this.keyword) {
      this.keyword = keyword
      this.currentPage = 0
      this.listProduct = []
      this.getListProduct()
    },
    handleWatchMore () {
      this.getListProduct()
    }
  }
}
</script>

<style scoped>
.home-produce {
  margin-bottom: 20px;
}
.btn-watch-more-product {
  display: block;
  margin: 0 auto !important;
}

.no-product {
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

.no-product-img {
  width: 40%;
  margin: 0 auto;
}

.no-product-msg {
  display: block;
  margin: 20px 0;
  font-size: 1.8rem;
}

</style>
