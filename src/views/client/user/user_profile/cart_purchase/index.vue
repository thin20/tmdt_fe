<template>
  <div class="cart__content">
    <div class="cart-list">
      <div v-for="(bill, index) in listBills" :key="index">
        <cart-purchase-item
          v-for="(bill, idx) in bill.bills"
          :key="idx"
          :bill="bill"
          @purchaseAction="purchaseAction"
        ></cart-purchase-item>
      </div>
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
    purchaseAction (bill, callback) {
      this.$emit('purchaseAction', bill, callback)
    }
  }
}
</script>

<style>
  .cart__content{
      height : 100%;
  }
</style>
