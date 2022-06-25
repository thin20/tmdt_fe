<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="24" :xl="24" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" :title="'Tổng doanh số theo ngày'" :total="`${formatPriceToVND(revenueToday)}`">
          <div>
            <trend :flag="revenueChangePercent > 0 ? 'up' : 'down'" style="margin-right: 16px;">
              <span slot="term">So với ngày hôm qua: {{ revenueChangePercent > 0 ? 'tăng ' : 'giảm ' }} </span>{{ Math.abs(revenueChangePercent) }}% </trend>
          </div>
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
                <div class="dashboard-sales--title">Đồ thị doanh số</div>
                <div ref="salesDashboard" style="height: 300px;"></div>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="dashboard-sales--title">Xếp hạng doanh số</div>
                <a-table
                  :data-source="dataSales.salesRanking"
                  :columns="columnsSalesRanking"
                  :rowKey=" (rowKey, index ) => index"
                  :pagination="false"
                >
                  <template slot="rowIndex" slot-scope="text, record, index">
                    <span>{{ getTableRowIndex(paginationSalesRanking.pageSize, paginationSalesRanking.current, index) }} </span>
                  </template>
                  <template slot="revenue" slot-scope="text, record">
                    <span>{{ formatPriceToVND(record.revenue) }} </span>
                  </template>
                </a-table>
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
                <div class="dashboard-sales--title">Đồ thị số lượng</div>
                <div ref="sellNumberDashboard" style="height: 300px;"></div>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24"><div class="dashboard-sales--title">Xếp hạng số lượng</div>
                <a-table
                  :data-source="dataSellNumber.sellNumberRanking"
                  :columns="columnsSellNumberRanking"
                  :rowKey=" (rowKey, index ) => index"
                  :pagination="false"
                >
                  <template slot="rowIndex" slot-scope="text, record, index">
                    <span>{{ getTableRowIndex(paginationSellNumberRanking.pageSize, paginationSellNumberRanking.current, index) }} </span>
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" :title="'Đồ thị doanh số biểu đồ tròn'" :style="{ height: '100%' }">
            <div ref="pieChartSale" style="height: 300px;"></div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" :title="'Biểu đồ lượng theo dõi sản phẩm'" :style="{ height: '100%' }">
            <div ref="topVisitDashboard" style="height: 300px;"></div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getRevenueByDate, getDataSalesDashboard, getDataSellNumbersDashboard, getListTopVisitProduct } from '@/api/dashboard/index'
import { ChartCard, Trend } from '@/components'
import { columnsSalesRanking } from './columnsSalesRanking'
import { columnsSellNumberRanking } from './columnsSellNumberRanking'
import moment from 'moment'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)
export default {
  name: 'Analysis',
  components: {
    ChartCard,
    Trend
  },
  data () {
    return {
      moment,
      columnsSalesRanking,
      columnsSellNumberRanking,
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
      paginationSalesRanking: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      loadingSellNumber: false,
      dataSellNumber: {
        sellNumberDashboard: [],
        sellNumberRanking: []
      },
      paginationSellNumberRanking: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      dataTopVisit: '',
      filterSellNumber: {
        year: moment().year()
      }
    }
  },
  async created () {
    this.getListYearSeller()
    this.getDataSales()
    this.getDataSellNumber()
    this.getDataTopVisit()
    this.revenueToday = await this.getRevenueByDate(moment().format('YYYY/MM/DD'))
    this.revenueYesterday = await this.getRevenueByDate(moment().subtract(1, 'days').format('YYYY/MM/DD'))
    this.calcRevenueChangePercent()
  },
  methods: {
    async getRevenueByDate (dateTime) {
      let revenue = 0
      await getRevenueByDate({ dateTime: dateTime }).then(rs => {
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
        this.revenueChangePercent = ((this.revenueToday - this.revenueYesterday) / this.revenueYesterday).toFixed(2)
        if (this.revenueChangePercent > 100) {
          this.revenueChangePercent = 100
        }
        if (this.revenueChangePercent < -100) {
          this.revenueChangePercent = -100
        }
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
      const params = {
        yearTime: this.filterSales.year
      }
      getDataSalesDashboard(params).then(rs => {
        if (rs) {
          this.dataSales = rs
        }
      }).finally(() => {
        this.initSalesDashboard()
        this.initPieChartSale()
      })
    },
    getDataSellNumber () {
      const params = {
        yearTime: this.filterSellNumber.year
      }
      getDataSellNumbersDashboard(params).then(rs => {
        if (rs) {
          this.dataSellNumber = rs
        }
      }).finally(() => {
        this.initSellNumberDashboard()
      })
    },
    getDataTopVisit () {
      getListTopVisitProduct().then(rs => {
        this.dataTopVisit = rs
      }).finally(() => {
        this.initTopVisitDashboard()
      })
    },
    initSalesDashboard () {
      // dashboard sales chart
      var chart = am4core.create(this.$refs.salesDashboard, am4charts.XYChart)
      chart.data = this.dataSales.salesDashboard

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'name'
      categoryAxis.title.text = 'Tháng'

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.title.text = 'Doanh số (đvt: Đồng)'
      valueAxis.logarithmic = true
      valueAxis.renderer.minGridDistance = 10
      valueAxis.treatZeroAs = 1

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = 'revenue'
      series.dataFields.categoryX = 'name'
      series.name = ''
      series.tooltipText = '{name}: [bold]{valueY}[/] đ'
      series.columns.template.width = am4core.percent(30)
      series.columns.template.fill = '#29d3bd'

      // Add cursor
      chart.cursor = new am4charts.XYCursor()
    },
    initSellNumberDashboard () {
      // dashboard sell number chart
      var chart1 = am4core.create(this.$refs.sellNumberDashboard, am4charts.XYChart)
      chart1.data = this.dataSellNumber.sellNumberDashboard

      var categoryAxis1 = chart1.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis1.dataFields.category = 'name'
      categoryAxis1.title.text = ''

      var valueAxis1 = chart1.yAxes.push(new am4charts.ValueAxis())
      valueAxis1.title.text = ''
      // valueAxis1.logarithmic = true
      valueAxis1.treatZeroAs = 1

      // Create series
      var series1 = chart1.series.push(new am4charts.ColumnSeries())
      series1.dataFields.valueY = 'sold'
      series1.dataFields.categoryX = 'name'
      series1.name = ''
      series1.tooltipText = '{name}: [bold]{valueY}[/] sp'
      series1.columns.template.width = am4core.percent(30)
      series1.columns.template.fill = '#29d3bd'

      // Add cursor
      chart1.cursor = new am4charts.XYCursor()
    },
    initPieChartSale () {
      var chart = am4core.create(this.$refs.pieChartSale, am4charts.PieChart)

      // Add data
      chart.data = this.dataSales.salesRanking

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries())
      pieSeries.dataFields.value = 'revenue'
      pieSeries.dataFields.category = 'name'

      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(40)

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color('#4a2abb')
      pieSeries.slices.template.strokeWidth = 2
      pieSeries.slices.template.strokeOpacity = 1

      // Add a legend
      chart.legend = new am4charts.Legend()
      chart.legend.maxHeight = 150
      chart.legend.scrollable = true
      chart.legend.maxWidth = 300
    },
    initTopVisitDashboard () {
      // dashboard sales chart
      var chart2 = am4core.create(this.$refs.topVisitDashboard, am4charts.XYChart)
      chart2.data = this.dataTopVisit

      var categoryAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis2.dataFields.category = 'name'
      categoryAxis2.title.text = 'Tên sản phẩm'

      var valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis())
      valueAxis2.title.text = 'Số lượng theo dõi'
      // valueAxis2.renderer.minGridDistance = 10
      valueAxis2.treatZeroAs = 1

      // Create series
      var series2 = chart2.series.push(new am4charts.ColumnSeries())
      series2.dataFields.valueY = 'visit'
      series2.dataFields.categoryX = 'name'
      series2.name = ''
      series2.tooltipText = '{name}: [bold]{valueY}[/] lượt'
      series2.columns.template.width = am4core.percent(30)
      series2.columns.template.fill = '#29d3bd'

      // Add cursor
      chart2.cursor = new am4charts.XYCursor()
    }
  }
}
</script>

<style lang="less" scoped>
  .dashboard-sales--title {
    font-size: 16px;
    font-weight: 700;
    padding: 5px 20px 15px;
  }

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
