<template>
  <div>
    <breadcrumb/>
    <div class="tab">
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.ALL ?' active':''" @click="changeIndexActive(PurchaseType.ALL)" id="allbill" data-purchase="PurchaseType.ALL">Tất cả</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.WAIT_CONFIRM ?' active':''" @click="changeIndexActive(PurchaseType.WAIT_CONFIRM)" id="billConfirmation" data-purchase="PurchaseType.WAIT_CONFIRM">Chờ xác nhận</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.WAIT_TAKE?' active':''" @click="changeIndexActive(PurchaseType.WAIT_TAKE)" id="billWaitTake" data-purchase="PurchaseType.WAIT_TAKE">Chờ lấy hàng</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.DELIVERING?' active':''" @click="changeIndexActive(PurchaseType.DELIVERING)" id="billDelivering" data-purchase="PurchaseType.DELIVERING">Đang giao</button>
      <button class="purchase-list-page__tab" :class="indexActive===PurchaseType.DELIVERED?' active':''" @click="changeIndexActive(PurchaseType.DELIVERED)" id="billDelivered" data-purchase="PurchaseType.DELIVERED">Đã giao</button>
    </div>
    <div class="spinner" v-if="loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div v-else-if="this.listBill.length === 0" class="purchase-empty-order__container purchase-list-page__empty-page-wrapper" >
      <div class="purchase-empty-order__icon"></div>
      <div class="purchase-empty-order__text">Chưa có đơn hàng</div>
    </div>
    <template v-else>
      <div class="purchase-order__container">
        <status-bill :listBillDetail="this.listBill" @acceptPurchase="acceptPurchase" @acceptDelivery="acceptDelivery"></status-bill>
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
import { PurchaseType } from '@/const/app.const'
import StatusBill from './status_bill/Index'
import { getListBillSellerByPurchaseType, updateBillStatus } from '@/api/bill/index'
import _ from 'lodash'
import Pagination from '@/components/user/pagination/index'

export default {
  name: 'Index',
  components: {
    StatusBill,
    Pagination
  },
  data () {
    return {
      PurchaseType,
      indexActive: 0,
      loading: false,
      purchaseType: PurchaseType.ALL,
      listBill: [],
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
  methods: {
    changeIndexActive (indexActive) {
      this.indexActive = indexActive
      this.getListBillDetail()
    },
    acceptPurchase (billId) {
      const params = {
        billId: billId,
        statusId: PurchaseType.WAIT_TAKE
      }
      updateBillStatus(params).then(rs => {
        if (rs) {
          this.$message.success({ content: 'Xác nhận đơn hàng thành công!' })
          this.getListBillDetail()
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      })
    },
    acceptDelivery (billId) {
      const params = {
        billId: billId,
        statusId: PurchaseType.DELIVERING
      }
      updateBillStatus(params).then(rs => {
        if (rs) {
          this.$message.success({ content: 'Xác nhận giao hàng thành công!' })
          this.getListBillDetail()
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      })
    },
    getListBillDetail () {
      const params = {
        purchaseType: this.indexActive
      }
      this.loading = true
      getListBillSellerByPurchaseType(params).then(rs => {
        if (rs) {
          this.listBill = rs.data
          this.pagination = _.merge(this.pagination, this.handlePaginationData(rs))
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      }).finally(() => {
        this.loading = false
      })
    },
    getByPagination ({ page, limit }) {
      this.pagination.current = page || 1
      this.pagination.pageSize = limit || this.params.pageSize
      this.getListBillDetail()
    }
  },
  mounted () {
    this.getListBillDetail()
  }
}
</script>

<style lang="scss">
.tab {
  overflow: hidden;
  display: flex;
  margin-bottom: 10px;
}

.tab button {
  width: 20%;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 15px;
  font-size: 16px;
  position: relative;
  background-color: rgb(255,255,255);
}

.tab button.active:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--primary-color);
}

.tab button:hover {
  color: var(--primary-color);
}

.tab button.active {
  color: var(--primary-color);
}
.purchase-list-page__empty-page-wrapper {
  background-color: rgb(255,255,255);
  /*    height: calc(100% - 59px);*/
  overflow: hidden;
  padding: 20px;
}

.purchase-order__container {
  display: block;
  padding: 5px 0 5px 0;
  position: relative;
  width: 100%;
}

.purchase-empty-order__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60rem;
}

.purchase-empty-order__icon {
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png);
  width: 10rem;
  height: 10rem;
  margin-bottom: 1.25rem;
}
.spinner {
  text-align: center;
  display: flex;
  justify-content: center;
  /* line-height: 60px; */
  height: 50px;
  align-items: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: var(--primary-color) !important;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0)
  }

  40% {
    -webkit-transform: scale(1.0)
  }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

/*end loadding */

#user-image img{
  width : 100px;
  height : 100px;
  border-radius : 50%;
  object-fit : cover;
}
</style>
