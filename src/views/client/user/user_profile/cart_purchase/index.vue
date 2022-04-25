<template>
  <div class="cart__content">
    <div class="cart-list">
      <cart-purchase-item
        v-for="(bill, idx) in listBills"
        :key="idx"
        :bill="bill"
        @purchaseAction="purchaseAction"
      ></cart-purchase-item>
    </div>
  </div>
</template>

<script>
import CartPurchaseItem from '../cart_purchase_item/index'
export default {
  name: 'CartPurchase',
  components: {
    CartPurchaseItem
  },
  props: {
    listBills: {
      type: Array,
      required: false
    }
  },
  methods: {
    purchaseAction (params, callback) {
      this.$emit('purchaseAction', params, callback)
    }
  }
}
</script>

<style>
  .cart__content{
      height : 100%;
  }
</style>
