<template>
  <div>
    <!--    <breadcrumb/>-->
    <a-card title="Tìm kiếm">
      <a-form-model v-model="filters">
        <a-row :gutter="16">
          <a-col :xs="24" :md="12" :lg="6">
            <label>Tên sản phẩm</label>
            <a-form-model-item prop="productName">
              <a-input v-model="filters.productName" @blur="DeepTrimValue(filters)" placeholder="Tên sản phẩm"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12" :lg="6">
            <label>Loại sản phẩm</label>
            <a-form-model-item prop="categoryId">
              <a-select
                v-model="filters.categoryId"
              >
                <a-select-option :key="''" :value="''">--- Tất cả ---</a-select-option>
                <a-select-option
                  v-for="item in dataFilter"
                  :key="item.id"
                  :value="item.id">
                  {{ item.original_category_name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :md="12" :lg="6">
            <a-button
              class="ant-btn ant-btn-primary"
              @click="search"
              style="margin-top: 29px"
            >
              Tìm kiếm
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card title="Danh sách sản phẩm" style="margin-top: 8px">
      <div slot="extra">
        <a-button
          class="ant-btn ant-btn-primary"
          @click="addNew"
        >
          Thêm mới
        </a-button>
      </div>
      <a-row :gutter="16" type="flex">
        <a-col :span="24">
          <a-table
            :columns="columns"
            :data-source="data"
            :rowKey=" (rowKey, index ) => index"
            :pagination="data.length === 0 ? false : pagination"
            :loading="loading"
            @change="handleTableChange"
            class="ant-table-wrapper"
            :scroll="{x:'max-content'}"
          >
            <template slot="actionTitle">
              <a-icon type="control" :style="{fontSize: '14px'}"/>
            </template>
            <template slot="rowIndex" slot-scope="text, record, index">
              <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
            </template>
            <template slot="updatedAt" slot-scope="text, record">
              <span>{{ record && record.updatedAt ? moment(record.updatedAt).format('DD/MM/YYYY') : '' }}</span>
            </template>
            <template slot="productTypeName" slot-scope="text, record">
              <span>{{ getNameCatById(record.categoryId) }}</span>
            </template>
            <template slot="price" slot-scope="text, record">
              <span>{{ formatPrice(record.price) }}</span>
            </template>
            <template slot="createdAt" slot-scope="text, record">
              <span>{{ record && record.createdAt ? moment(record.createdAt).format('DD/MM/YYYY') : '' }}</span>
            </template>
            <template slot="isSell" slot-scope="text, record">
              <a-switch
                :checked="!!record.isSell"
                @change="switchStatus(record)"
              />
            </template>
            <template slot="image" slot-scope="text, record">
              <img
                class="image"
                :src="record.image"
                width="50"
                height="50"
              />
            </template>
            <template slot="operation" slot-scope="text, record">
              <div>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ `Xem chi tiết ${record.name}` }}</span>
                  </template>
                  <span style="padding-right:12px;cursor: pointer">
                    <a-icon
                      @click="onViewRow(record)"
                      theme="twoTone"
                      type="eye"
                    />
                  </span>
                </a-tooltip>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ `Cập nhật ${record.name}` }}</span>
                  </template>
                  <span @click="onEditRow(record)" class="vnpost-link">
                    <a-icon
                      theme="twoTone"
                      type="edit"
                    />
                  </span>
                </a-tooltip>
              </div>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
    <DrawForm
      v-if="drawSync"
      :drawSync="drawSync"
      :drawTitle="drawTitle"
      :is-editable="drawIsEdit"
      :is-view="drawIsView"
      :is-create="drawIsCreate"
      @closeDraw="handleCancelDraw"
      :objectEdit="objectEdit"
      :list-product-type="treeData"
      :listStatus="listStatus"
    >
    </DrawForm>
  </div>
</template>

<script>
import columns from './columns'
import DrawForm from './Form'
import { searchListProductBySeller } from '@/api/product/index'
import { getListCategory } from '@/api/category/index'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'Index',
  components: {
    DrawForm
  },
  data () {
    return {
      columns,
      activeSearchKey: 1,
      data: [],
      treeData: [],
      dataFilter: [],
      listStatus: [],
      listBusinessDomain: [],
      listProductGroup: [],
      drawTitle: 'Thêm mới hàng hóa',
      drawSync: false,
      drawIsEdit: false,
      drawIsCreate: false,
      drawIsView: false,
      objectEdit: {},
      pagination: {
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
      loading: false,
      filters: {
        categoryId: '',
        productName: ''
      }
    }
  },
  created () {
    this.getCategory()
    this.getData()
  },
  methods: {
    getNameCatById (id) {
      const nameCat = this.dataFilter.find(item => item.id === id)
      return nameCat.original_category_name
    },
    moment,
    list_to_tree (list) {
      var map = {}; var node; var roots = []; var i
      for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i // initialize the map
        list[i].children = [] // initialize the children
        list[i].title = list[i].original_category_name
        list[i].key = list[i].id
        list[i].value = list[i].id
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i]
        if (node.parent_category_id !== 0) {
            list[map[node.parent_category_id]].children.push(node)
        } else {
          roots.push(node)
        }
      }
      console.log('roots: ', roots)
      return roots
    },
    getCategory () {
      getListCategory().then(rs => {
        if (rs) {
          this.dataFilter = rs
          this.treeData = this.list_to_tree(this.dataFilter)
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      })
    },
    switchStatus (record) {
      const that = this
      if (record) {
        this.$confirm({
          title: `Bạn muốn thay đổi trạng thái của ${record.name}?`,
          okType: 'primary',
          onOk () {
            that.changeStatusProduct(record)
          }
        })
      } else {
        this.$notification.warning({
          message: 'Không tìm thấy bản ghi',
          duration: 5
        })
      }
    },
    changeStatusProduct (record) {
      // TODO: call api change status product
      console.log(record.id)
    },
    getData () {
      const params = {
        categoryId: this.filters.categoryId,
        keyword: this.filters.productName,
        page: this.pagination.current > 1 ? this.pagination - 1 : 0,
        size: this.pagination.pageSize
      }
      this.loading = true
      searchListProductBySeller(params).then(rs => {
        if (rs) {
          this.data = rs.data
          this.pagination = _.merge(this.pagination, this.handlePaginationData(rs))
        }
      }).catch(err => {
        const mes = this.handleApiError(err)
        this.$error({ content: mes })
      }).finally(() => {
        this.loading = false
      })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    addNew (e) {
      e.stopPropagation()
      this.drawTitle = 'Thêm mới sản phẩm'
      this.drawIsCreate = true
      this.drawIsEdit = false
      this.drawIsView = false
      this.drawSync = true
    },
    search () {
      this.pagination.current = 1
      this.getData()
    },
    onEditRow (record) {
      // TODO: call api get detail product
      this.objectEdit = _.cloneDeep(record)
      this.drawTitle = 'Cập nhật sản phẩm'
      this.drawIsCreate = false
      this.drawIsEdit = true
      this.drawIsView = false
      this.drawSync = true
    },
    onViewRow (record) {
      // TODO: call api get detail product
      this.objectEdit = _.cloneDeep(record)
      this.drawTitle = 'Chi tiết sản phẩm'
      this.drawIsCreate = false
      this.drawIsEdit = false
      this.drawIsView = true
      this.drawSync = true
    },
    handleCancelDraw (reload = false) {
      this.drawSync = false
      if (reload) {
        this.getData()
      }
    }
  }
}
</script>

<style scoped>
.image{
  object-fit: cover;
}
</style>
