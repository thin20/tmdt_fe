<template>
  <div class="row-lbr sm-gutter list-product">
    <product-item v-for="(product, index) in listProduct" :key="index" :product="product"></product-item>
  </div>
</template>

<script>
import ProductItem from '@/components/user/product_item/index'
export default {
  name: 'ListProduct',
  components: {
    ProductItem
  },
  props: {
    listProduct: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>

</style>
