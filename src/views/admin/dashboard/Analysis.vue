<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" :title="'Tổng doanh số theo ngày'" :total="`${revenueToday} ₫`">
          <div>
            <trend :flag="revenueChangePercent > 0 ? 'up' : 'down'" style="margin-right: 16px;">
              <span slot="term">So với ngày hôm qua: {{ revenueChangePercent > 0 ? 'tăng ' : 'giảm ' }} </span>{{ Math.abs(revenueChangePercent) }}% </trend>
          </div>
          <!--          <template slot="footer">Doanh số hằng ngày<span> 234.56 ₫</span></template>-->
        </chart-card>
      </a-col>
    </a-row>

    <a-card :loading="loadingSales" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <a-select v-model="filterSales.year" @change="getDataSales" style="width: 130px">
              <a-select-option v-for="item in listYearSeller" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
            </a-select>
          </div>
          <a-tab-pane loading="true" :tab="'Bán hàng'" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="dataSales.salesDashboard" :title="'Đồ thị doanh số'" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list :title="'Xếp hạng doanh số'" :list="dataSales.salesRanking"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-card :loading="loadingSellNumber" :bordered="false" :body-style="{padding: '0'}" :style="{ marginTop: '24px' }">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <a-select v-model="filterSellNumber.year" @change="getDataSellNumber" style="width: 130px">
              <a-select-option v-for="item in listYearSeller" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
            </a-select>
          </div>
          <a-tab-pane loading="true" :tab="'Bán hàng'" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="dataSellNumber.sellNumberDashboard" :title="'Đồ thị số lượng'"/>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list :title="'Xếp hạng số lượng'" :list="dataSellNumber.sellNumberRanking"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" :title="$t('dashboard.analysis.the-proportion-of-sales')" :style="{ height: '100%' }">
            <div>
              <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                <v-tooltip :showTitle="false" dataKey="item*percent" />
                <v-axis />
                <!-- position="right" :offsetX="-140" -->
                <v-legend dataKey="item"/>
                <v-pie position="percent" color="item" :vStyle="pieStyle" />
                <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
              </v-chart>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" :title="$t('dashboard.analysis.the-proportion-of-sales')" :style="{ height: '100%' }">
            <bar :data="barData2" :title="$t('dashboard.analysis.sales-trend')" />
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getRevenueByDate } from '@/api/dashboard/index'
import moment from 'moment'
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea
} from '@/components'
import { baseMixin } from '@/store/app-mixin'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `Tháng ${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `Tháng ${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = [{ index: 'STT', name: 'Tên', total: 'Tổng' }]
for (let i = 0; i < 7; i++) {
  rankList.push({
    index: i + 1,
    name: 'Đảo Egret ' + (i + 1),
    total: 1234.56 - i * 100
  })
}

const DataSet = require('@antv/data-set')

const sourceData = [
  { item: 'Thiết bị gia dụng', count: 32.2 },
  { item: 'Rượu ăn được', count: 21 },
  { item: 'Sức khỏe cá nhân', count: 17 },
  { item: 'Hành lý quần áo', count: 13 },
  { item: 'Sản phẩm cá nhân', count: 9 },
  { item: 'khác', count: 7.8 }
]

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieData = dv.rows

export default {
  name: 'Analysis',
  mixins: [baseMixin],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data () {
    return {
      moment,
      loading: false,
      listYearSeller: [],
      revenueToday: '',
      revenueYesterday: '',
      revenueChangePercent: '',
      filterSales: {
        year: moment().year()
      },
      loadingSales: false,
      dataSales: {
        salesDashboard: [],
        salesRanking: []
      },
      loadingSellNumber: false,
      dataSellNumber: {
        sellNumberDashboard: [],
        sellNumberRanking: []
      },
      filterSellNumber: {
        year: moment().year()
      },
      rankList,
      barData,
      barData2,
      pieScale,
      pieData,
      sourceData,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
  computed: {
  },
  async created () {
    this.getListYearSeller()
    this.getDataSales()
    this.getDataSellNumber()
    this.revenueToday = await this.getRevenueByDate(moment().format('YYYY/MM/DD'))
    this.revenueYesterday = await this.getRevenueByDate(moment().subtract(1, 'days').format('YYYY/MM/DD'))
    this.calcRevenueChangePercent()
  },
  methods: {
    getRevenueByDate (dateTime) {
      let revenue = 0
      getRevenueByDate({ dateTime: dateTime }).then(rs => {
        if (rs) {
          revenue = rs
        }
      })
      return revenue
    },
    calcRevenueChangePercent () {
      if (!this.revenueToday) {
        this.revenueChangePercent = -100
      } else if (!this.revenueYesterday) {
        this.revenueChangePercent = 100
      } else {
        this.revenueChangePercent = (this.revenueToday - this.revenueYesterday) / 100
      }
    },
    getListYearSeller () {
      for (let i = 2021; i <= moment().year(); i++) {
        this.listYearSeller.push({
          value: i,
          name: 'Năm ' + i
        })
      }
    },
    getDataSales () {
      this.dataSales = {
        salesDashboard: [
          { x: 'Tháng 1', y: 150 },
          { x: 'Tháng 2', y: 120 },
          { x: 'Tháng 3', y: 180 },
          { x: 'Tháng 4', y: 80 },
          { x: 'Tháng 5', y: 130 },
          { x: 'Tháng 6', y: 160 },
          { x: 'Tháng 7', y: 180 },
          { x: 'Tháng 8', y: 150 },
          { x: 'Tháng 9', y: 140 },
          { x: 'Tháng 10', y: 150 },
          { x: 'Tháng 11', y: 150 },
          { x: 'Tháng 12', y: 190 }
        ],
        salesRanking: [
          { index: 'STT', name: 'Tên', total: 'Tổng' },
          { index: 1, name: 'Tên 1', total: 1234.56 },
          { index: 2, name: 'Tên 2', total: 1134.56 },
          { index: 3, name: 'Tên 3', total: 1034.56 },
          { index: 4, name: 'Tên 4', total: 934.56 },
          { index: 5, name: 'Tên 5', total: 834.56 }
        ]
      }
    },
    getDataSellNumber () {
      this.dataSellNumber = {
        sellNumberDashboard: [
          { x: 'Tháng 1', y: 150 },
          { x: 'Tháng 2', y: 120 },
          { x: 'Tháng 3', y: 180 },
          { x: 'Tháng 4', y: 80 },
          { x: 'Tháng 5', y: 130 },
          { x: 'Tháng 6', y: 160 },
          { x: 'Tháng 7', y: 180 },
          { x: 'Tháng 8', y: 150 },
          { x: 'Tháng 9', y: 140 },
          { x: 'Tháng 10', y: 150 },
          { x: 'Tháng 11', y: 150 },
          { x: 'Tháng 12', y: 190 }
        ],
        sellNumberRanking: [
          { index: 'STT', name: 'Tên', sold: 'Đã bán', inventory: 'Tồn kho' },
          { index: 1, name: 'kadfjalkdsjflakdsjfl adklfj adkfj asdlfkja dslfkja;sd fafjd ', sold: 50000, inventory: 6000000 }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
