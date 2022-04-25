<template>
  <div>
    <div class="tab">
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.ALL?' active':''" @click="changeIndexActive(PurchaseType.ALL)" id="allbill" :data-purchase="PurchaseType.ALL">Tất cả</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.WAIT_CONFIRM?' active':''" @click="changeIndexActive(PurchaseType.WAIT_CONFIRM)" id="billConfirmation" :data-purchase="PurchaseType.WAIT_CONFIRM">Chờ xác nhận</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.WAIT_TAKE?' active':''" @click="changeIndexActive(PurchaseType.WAIT_TAKE)" id="billWaitTake" :data-purchase="PurchaseType.WAIT_TAKE">Chờ lấy hàng</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.DELIVERING?' active':''" @click="changeIndexActive(PurchaseType.DELIVERING)" id="billDelivering" :data-purchase="PurchaseType.DELIVERING">Đang giao</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.DELIVERED?' active':''" @click="changeIndexActive(PurchaseType.DELIVERED)" id="billDelivered" :data-purchase="PurchaseType.DELIVERED">Đã giao</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.CANCELED?' active':''" @click="changeIndexActive(PurchaseType.CANCELED)" id="billCanceled" :data-purchase="PurchaseType.CANCELED">Đã hủy</button>
    </div>

    <div class="spinner" v-if="loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div v-else-if="listBills.length === 0" class="purchase-empty-order__container purchase-list-page__empty-page-wrapper" >
      <div class="purchase-empty-order__icon"></div>
      <div class="purchase-empty-order__text">Chưa có đơn hàng</div>
    </div>
    <template v-else>
      <div class="purchase-order__container">
        <cart-purchase :listBills="listBills" @purchaseAction="purchaseAction"></cart-purchase>
        <pagination
          @getByPagination="getByPagination"
          :total="pagination.total"
          :currentPage="pagination.current"
          :pageSizeProp="pagination.pageSize"
          :pageSizeOptionsProp="pagination.pageSizeOptions"
          style="margin: 30px 0px;"></pagination>
      </div>
    </template>
  </div>
</template>

<script>
import CartPurchase from '../cart_purchase/index'
import { PurchaseType } from '@/const/app.const'
import { getListBillByPurchaseType, updateBillStatus } from '@/api/bill/index'
import Pagination from '@/components/user/pagination/index'
import _ from 'lodash'

export default {
  name: 'Purchase',
  components: {
    CartPurchase,
    Pagination
  },
  data () {
    return {
      PurchaseType,
      indexActive: PurchaseType.ALL,
      loading: false,
      purchaseType: PurchaseType.ALL,
      listBills: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '50'],
        showTotal: (total) => {
          return `Tổng số dòng ${total}`
        }
      }
    }
  },
  mounted () {
    this.getListPurchase()
  },
  methods: {
    changeIndexActive (purchaseType) {
      this.indexActive = purchaseType
      this.purchaseType = purchaseType
      this.getListPurchase()
    },
    purchaseAction ({ billId, purchaseType }, callback) {
      const params = {
        billId: billId,
        statusId: purchaseType
      }
      updateBillStatus(params).then(rs => {
        if (rs) {
          this.getListPurchase()
          callback()
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      })
    },
    getByPagination ({ page, limit }) {
      this.pagination.current = page || 1
      this.pagination.pageSize = limit || this.params.pageSize
      this.getListPurchase()
    },
    getListPurchase () {
      this.loading = true
      const params = {
        purchaseType: this.purchaseType,
        page: this.pagination.current > 0 ? (this.pagination.current - 1) : 0,
        size: this.pagination.pageSize
      }
      getListBillByPurchaseType(params).then(rs => {
        if (rs) {
          this.listBills = rs.data
          this.pagination = _.merge(this.pagination, this.handlePaginationData(rs))
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
