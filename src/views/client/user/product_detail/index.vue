<template>
  <div class="container app__container">
    <a-spin :spinning="loading" style="width: 100%; height: 300px;">
      <div class="row product">
        <div class="col col-lg-5 col-md-5 col-sm-12">
          <!-- depicted product -->
          <depicted-product
            :images="depicted"
            :product-detail="productDetail">
          </depicted-product>
        </div>

        <div class="col col-lg-7 col-md-7 col-sm-12">
          <!-- sale product -->
          <sale-product :product="productDetail"></sale-product>
          <!-- guarantee product -->
          <a class="guarantee-product" href="#">
            <div>
              <img
                src="@/assets/img/GuaranteeProduct.png"
                alt="guarantee product"
                class="guarantee-product-img">
              <span class="guarantee-product-title">Shopee Đảm Bảo</span>
            </div>
            <span class="guarantee-product-desc">3 Ngày Trả Hàng / Hoàn Tiền</span>
          </a>
        </div>
      </div>
    </a-spin>
    <div class="row product mt-5 p-5">
      <!-- detail product -->
      <detail-product :product-detail="productDetail"></detail-product>
    </div>
  </div>
</template>

<script>
import DepictedProduct from '@/views/client/user/product_detail/depicted_product'
import SaleProduct from '@/views/client/user/product_detail/sale_product'
import DetailProduct from '@/views/client/user/product_detail/detail_product'
import Pagination from '@/components/user/pagination'
import '@/assets/css/productDetail.scss'
import { getProductDetail, addProductVisit } from '@/api/product/index'
export default {
  name: 'ProductDetail',
  components: {
    DepictedProduct,
    SaleProduct,
    DetailProduct,
    Pagination
  },
  data () {
    return {
      loading: false,
      comment: [],
      depicted: [],
      productDetail: {},
      pagination: {
        pageNum: 1,
        pageSize: 5
      },
      loadingComment: true,
      comments: [],
      totalComment: 0
    }
  },
  created () {
    const { slugWithId } = this.$route.params
    const productId = this.getIdProductFromSlug(slugWithId)
    if (!productId) {
      this.$message.error({ content: 'Không tìm thấy sản phẩm!' })
      this.$router.push({ name: 'home' })
    }
    this.getProductDetail(productId)
    addProductVisit({ productId: productId }).then(rs => {})
  },
  methods: {
    getIdProductFromSlug (slugWithId) {
      const arrayTruncate = slugWithId.split('.')
      return arrayTruncate[arrayTruncate.length - 1]
    },
    getProductDetail (productId) {
      this.loading = true
      const params = {
        currentUserId: this.$store.getters.isLogin ? this.$store.getters.userId : undefined,
        productId: productId
      }
      getProductDetail(params).then(rs => {
        if (rs) {
          this.productDetail = rs.productDetail ? rs.productDetail : {}
          this.depicted = [{
            id: 0,
            productId: rs.productDetail.id,
            path: rs.productDetail.image
          }, ...rs.depicted]
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$message.error({ content: mes })
        this.$router.push({ name: 'home' })
      }).finally(() => {
        this.loading = false
      })
    }
    // onSubmitCreateComment (commentText, listFileImage, star) {
    //   const formData = new FormData()
    //
    //   const commentObj = {
    //     id_product: this.product.productDetail.id,
    //     comment: commentText,
    //     star
    //   }
    //
    //   listFileImage.forEach(file => formData.append('files', file.fileImage))
    //   formData.append(
    //     'comment',
    //     new Blob([JSON.stringify(commentObj)], { type: 'application/json' })
    //   )
    // }
  }
}
</script>

<style>
.product{
    padding: 15px 0;
    background-color: #fff;
    border-radius: 2px;
}

.guarantee-product {
    display: flex;
    align-items: center;
    padding: 25px 20px;
    font-size: 1.4rem;
    text-decoration: none;
    font-weight: 500;
    flex-wrap:wrap;
}

.guarantee-product:hover {
    text-decoration: none;
}

.guarantee-product-desc {
    color: rgba(0, 0, 0, 0.54);
}

.guarantee-product-img {
    width: 20px;
    height: 20px;
}

.guarantee-product-title {
    margin: 0 20px 0 5px;
    color: #222;
}

.title__name {
    font-size: 2rem;
    line-height: 2.4rem;
}

@media (max-width: 768px) {
    .product-option__select, .guarantee-product, .quantity-product {
        justify-content: space-around;
        margin-bottom: 8px;
    }
    .depicted-product__social {
        flex-wrap: wrap;
        justify-content:space-around;
    }
    .product-option__select-btn-color {
        margin-bottom: 8px;
    }
}
</style>
