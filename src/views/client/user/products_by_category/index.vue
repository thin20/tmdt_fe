<template>
  <div class="app__container" style="padding-bottom: 20px;">
    <div class="grid wide">
      <div class="row-lbr sm-gutter app__content">
        <div class="col-lbr l-2 m-0 c-0-lbr">
          <!-- list category pc -->
          <list-category :listCategory="listCategory" @getByCategoryId="getByCategoryId"></list-category>
        </div>

        <div class="col-lbr l-10 m-12 c-12-lbr">
          <!-- filter products -->
          <filter-products
            @sortProducts="sortProducts"
            @getByPagination="getByPagination"
            :totalPage="totalPage"
            :currentPage="params.pageNum"
            :sortType="sortType"
            :currentSortType="params.sortType"
            :orderType="orderType"
            :currentOrderType="params.orderType"></filter-products>
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile :listCategory="listCategory" @getByCategoryId="getByCategoryId"></category-mobile>
            <!-- list product -->
            <a-spin v-if="loadingListProduct" :spinning="loadingListProduct" size="large" style="width: 100%; height: 100px; padding: 30px 50px; margin: 20px 0;">
            </a-spin>
            <list-product :listProduct="listProduct"></list-product>

            <div v-if="listProduct.length === 0 && !loadingListProduct" class="no-product">
              <img src="@/assets/img/no-cart.png" alt="no product" class="no-product-img"/>
              <span class="no-product-msg">Không tìm thấy sản phẩm nào</span>
            </div>
          </div>

          <!-- pagination -->
          <pagination
            v-if="listProduct.length > 0"
            @getByPagination="getByPagination"
            :total="total"
            :currentPage="params.pageNum"
            :pageSizeProp="params.pageSize"
            style="margin: 30px 0px;"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListCategory from '@/views/client/user/products_by_category/list_category'
import FilterProducts from '@/views/client/user/products_by_category/filter_products'
import CategoryMobile from '@/components/user/category_mobile'
import ListProduct from '@/views/client/user/products_by_category/list_product'
import Pagination from '@/components/user/pagination'
import { searchListProduct } from '@/api/product/index'
import { getListCategory } from '@/api/category/index'
import { SortType, OrderType } from '@/const/app.const.js'
import { bus } from '@/main.js'
export default {
  name: 'ProductsByCategory',
  components: {
    ListCategory,
    FilterProducts,
    CategoryMobile,
    ListProduct,
    Pagination
  },
  data () {
    return {
      listCategory: [],
      listProduct: [],
      total: 0,
      totalPage: 0,
      sortType: { ...SortType },
      orderType: { ...OrderType },
      loadingListProduct: false,
      params: {
        idCategory: 1,
        keyword: '',
        pageNum: 1,
        pageSize: 20,
        sortType: SortType.NEWEST,
        orderType: OrderType.DESC
      }
    }
  },
  created () {
    this.params.idCategory = this.$route.params.categoryId
    this.getListCategory()
    this.getListProductByCategory()
    bus.$on('searchProductsByKeyword', this.searchProductsCategoryByKeyword)
  },
  destroyed () {
    bus.$off('searchProductsByKeyword', this.searchProductsCategoryByKeyword)
  },
  updated () {
    this.params.idCategory = this.$route.params.categoryId
  },
  methods: {
    getListCategory () {
      getListCategory().then(rs => {
        if (rs) {
          this.listCategory = rs
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      })
    },
    getListProductByCategory () {
      this.listProduct = []
      this.loadingListProduct = true
      const params = {
        categoryId: this.params.idCategory,
        keyword: this.params.keyword,
        page: this.params.pageNum > 0 ? this.params.pageNum - 1 : 0,
        size: this.params.pageSize,
        sortType: this.params.sortType,
        orderType: this.params.orderType
      }
      if (this.$store.getters.isLogin) {
        params.currentUserId = this.$store.getters.userId
      }
      searchListProduct(params).then(rs => {
        if (rs) {
          this.listProduct = rs.data
          this.total = rs['page_meta']['total_elements'] ? rs['page_meta']['total_elements'] : 0
          this.totalPage = rs['page_meta']['total_pages'] ? rs['page_meta']['total_pages'] : 1
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      }).finally(() => {
        this.loadingListProduct = false
      })
    },
    getByCategoryId (idCategory) {
      this.params.idCategory = idCategory
      this.params.pageNum = 1
      this.getListProductByCategory()
    },
    searchProductsCategoryByKeyword (keyword) {
      this.params.keyword = keyword
      this.params.pageNum = 1
      this.getListProductByCategory()
    },
    sortProducts ({ sortType, orderType = OrderType.DESC }) {
      this.params.sortType = sortType
      this.params.orderType = orderType
      this.getListProductByCategory()
    },
    getByPagination ({ page, limit }) {
      this.params.pageNum = page || 1
      this.params.pageSize = limit || this.params.pageSize
      this.getListProductByCategory()
    }
  }
}
</script>

<style scoped>

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
