<template>
  <div class="header__cart">
    <div class="header__cart-wrap">
      <div @click="gotoCart"><i class="fas fa-shopping-cart header__cart-icon"></i></div>
      <span class="header__cart-notify">{{ listProductInCart.length }}</span>
      <!-- No cart: header__cart-list--no-cart -->
      <div class="header__cart-list" :class="listProductInCart.length === 0 ? 'header__cart-list--no-cart' : ''">
        <img src="@/assets/img/no-cart.png" alt="No cart" class="header__cart--no-cart-img"/>
        <span class="header__cart-list--no-cart-msg">Chưa có sản phẩm</span>
        <h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
        <ul class="header__cart-list-item">
          <li class="header__cart-item" v-for="(bill, index) in listProductInCart" :key="index">
            <img :src="bill.product.image" alt="img" class="header__cart-img" />
            <div class="header__cart-item-info">
              <div class="header__cart-item-head">
                <h5 class="header__cart-item-name">
                  {{ bill.product.name }}
                </h5>
                <div class="header__cart-item-price-wrap">
                  <span class="header__cart-item-price"> {{ formatPriceToVND(calcNewPrice(bill.product.price, bill.product.discount)) }}</span>
                  <span class="header__cart-item-multiply">x</span>
                  <span class="header__cart-item-qnt">{{ bill.quantity }}</span>
                </div>
              </div>

              <div class="header__cart-item-body">
                <span class="header__cart-item-description">
                  Phân loại: Bạc
                </span>
                <span class="header__cart-item-remove" @click="handleDeleteProductInCart(bill)">Xóa</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="header__cart-view-cart btn btn--primary" @click="gotoCart">Xem giỏ hàng</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'CartHeader',
  data: () => {
    return {
      listProductInCart: []
    }
  },
  computed: {
    listBillInCart () {
      return this.$store.getters.listProductInCart
    }
  },
  watch: {
    listBillInCart (newValue) {
      this.listProductInCart = _.cloneDeep(newValue)
    }
  },
  mounted () {
    this.listProductInCart = this.$store.dispatch('GetListBillBySeller')
  },
  created () {
    if (this.$store.getters.isLogin) {
      this.$store.dispatch('GetListBillBySeller').then(rs => {
        if (rs) {}
      }).catch(err => {
        this.listProductInCart = []
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      }).finally(() => {
        this.listProductInCart = _.cloneDeep(this.listBillInCart)
      })
    }
  },
  methods: {
    gotoCart () {
      if (this.$route.name !== 'cart') {
        this.$router.push({ name: 'cart' })
      }
    },
    handleDeleteProductInCart (bill) {
      const _this = this
      this.$confirm({
        content: `Bạn có chắc chắn muốn xóa sản phẩm ${bill.product.name} trong giỏ hàng?`,
        onOk: () => {
          _this.$store.dispatch('RemoveProductInCart', bill.billId).then(rs => {
            if (rs) {
              _this.$message.success({ content: 'Xóa sản phẩm khỏi giỏ hàng thành công!' })
            }
          }).catch(err => {
            const mes = _this.handleApiError(err)
            this.$message.error({ content: mes })
          })
        }
      })
    }
  }
}
</script>

<style></style>
