<template>
  <div class="header">
    <div class="grid wide">
      <nav class="header__navbar hide-on-mobile-tablet">
        <ul class="header__navbar-list">
          <li class="header__navbar-item">
            <a class="header__navbar-title--no-pointer btn-linkto-producer" @click="goToAdmin">Vào trang người bán</a>
          </li>
          <li class="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
            Vào cửa hàng ứng dụng
            <div class="header__qr">
              <img src="@/assets/img/QR.png" alt="QR code" class="header__qr-img" />
              <div class="header__qr-apps">
                <a href="#" class="header__qr-link">
                  <img src="@/assets/img/GooglePlay.png" alt="Google play" class="header__qr-download-img" />
                </a>
                <a href="#" class="header__qr-link">
                  <img src="@/assets/img/AppStore.png" alt="App store" class="header__qr-download-img" />
                </a>
              </div>
            </div>
          </li>
          <li class="header__navbar-item">
            <span class="header__navbar-title--no-pointer">Kết nối</span>
            <div class="header_navbar-icon-link">
              <i class="header__navbar-icon fab fa-facebook"></i>
              <i class="header__navbar-icon fab fa-instagram"></i>
            </div>
          </li>
        </ul>

        <ul class="header__navbar-list">
          <li class="header__navbar-item header__navbar-item--strong header__navbar-item--has-notify">
            <a href="#" class="header__navbar-item-link">
              <i class="header__navbar-icon far fa-bell"></i>
              Thông báo
            </a>
            <!-- header notify -->
            <header-notify></header-notify>
          </li>
          <li class="header__navbar-item header__navbar-item--strong">
            <a href="#" class="header__navbar-item-link">
              <i class="header__navbar-icon far fa-question-circle"></i>
              Trợ giúp
            </a>
          </li>
          <!-- login on pc -->
          <template v-if="!$store.getters.isLogin">
            <li class="header__navbar-item header__navbar-item--strong header__navbar-item--separate">
              <router-link :to="{ name: 'register' }" class="header__navbar-item-link">Đăng ký</router-link>
            </li>
            <li class="header__navbar-item header__navbar-item--strong">
              <router-link :to="{ name: 'login' }" class="header__navbar-item-link">Đăng nhập</router-link>
            </li>
          </template>

          <LoginPC v-else></LoginPC>
        </ul>
      </nav>

      <!-- Header with search -->
      <div class="header-with-search">
        <label for="mobile-search-checkbox" class="header__mobile-search">
          <i class="fas fa-search header__mobile-search-icon"></i>
        </label>

        <div class="header__logo hide-on-tablet">
          <div class="header__logo-link" @click="gotoHome">
            <img src="@/assets/img/logo.svg" class="header__logo-img" />
          </div>
        </div>

        <input type="checkbox" hidden id="mobile-search-checkbox" class="header__search-checkbox" />

        <div class="header__search">
          <div class="header__search-input-wrap">
            <input
              @focus="() => { visibleHistory = true }"
              @blur="handleBlurSearchInput"
              @input="handleTypeSearch"
              v-model="keyword"
              type="text"
              class="header__search-input"
              ref="searchInput"
              placeholder="Nhập để tìm kiếm sản phẩm" />
            <div class="header__search-history" v-if="visibleHistory">
              <h3 class="header__search-history-heading">Lịch sử tìm kiếm</h3>
              <ul class="header__search-history-list">
                <li
                  class="header__search-history-item"
                  @click="handleChooseSearchHistoryItem"
                  v-for="(item, index) in listSearchHistory"
                  :key="index"
                  :data-text="item">
                  <span>{{ item }}</span>
                  <a-tooltip placement="top">
                    <template slot="title">
                      Xóa
                    </template>
                    <a-icon @click="(e) => handleDeleteSearchHistoryItem(e, item)" size="small" type="close" style="cursor: pointer; color: #666;"/>
                  </a-tooltip>
                </li>
              </ul>
            </div>
          </div>
          <div class="header__search-select">
            <span class="header__search-select-label">Trong shop</span>
            <i class="fas fa-angle-down header__search-select-icon"></i>

            <ul class="header__search-option">
              <li class="header__search-option-item">
                <span>Trong shop</span>
                <i class="fas fa-check"></i>
              </li>

              <li class="header__search-option-item">
                <span>Ngoài shop</span>
                <i class="fas fa-check"></i>
              </li>
            </ul>
          </div>
          <button class="header__search-btn" @click="handleSearchProduct">
            <i class="header__search-btn-icon fas fa-search"></i>
          </button>
        </div>

        <div class="wrap-cart-login">
          <!-- Cart -->
          <cart-header></cart-header>

          <!-- Login on mobile and tablet -->
          <login-mobile-tablet v-if="$store.getters.isLogin"></login-mobile-tablet>
        </div>
        <sort-mobile></sort-mobile>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNotify from '@/components/user/header/header_notify'
import LoginPC from '@/components/user/header/login_pc'
import CartHeader from '@/components/user/header/cart_header'
import SortMobile from '@/components/user/header/sort_mobile'
import LoginMobileTablet from '@/components/user/header/login_mobile_tablet'
import { bus } from '@/main'
export default {
  name: 'HeaderUser',
  components: {
    HeaderNotify,
    LoginPC,
    CartHeader,
    SortMobile,
    LoginMobileTablet
  },
  data () {
    return {
      keyword: '',
      listSearchHistory: [],
      visibleHistory: false
    }
  },
  created () {
    if (!localStorage.getItem('listSearchHistory')) {
      this.listSearchHistory = []
      localStorage.setItem('listSearchHistory', JSON.stringify([]))
    } else {
      this.listSearchHistory = this.getListSearchHistory()
    }
  },
  methods: {
    gotoHome () {
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
      }
    },
    goToAdmin () {
      this.$router.push({ name: 'dashboard' })
    },
    handleSearchProduct () {
      bus.$emit('searchProductsByKeyword', this.keyword)
      this.setItemToSearchHistory(this.keyword)
      this.listSearchHistory = this.getListSearchHistory(this.keyword)
    },
    handleTypeSearch () {
      this.listSearchHistory = this.getListSearchHistory(this.keyword)
    },
    handleChooseSearchHistoryItem (e) {
      this.keyword = e.target.dataset.text
      this.listSearchHistory = this.getListSearchHistory(this.keyword)
      bus.$emit('searchProductsByKeyword', this.keyword)
    },
    handleDeleteSearchHistoryItem (e, keyword) {
      e.stopPropagation()
      if (!keyword) return
      const listSearchHistory = JSON.parse(localStorage.getItem('listSearchHistory'))
      const index = listSearchHistory.findIndex((item) => {
        return item.toLowerCase() === keyword.toLowerCase()
      })
      if (index >= 0) {
        listSearchHistory.splice(index, 1)
        localStorage.setItem('listSearchHistory', JSON.stringify(listSearchHistory))
        this.listSearchHistory = listSearchHistory
      }
    },
    getListSearchHistory (keyword) {
      keyword = keyword || ''
      let listSearchHistory = JSON.parse(localStorage.getItem('listSearchHistory'))
      listSearchHistory = listSearchHistory.filter(item => {
        return (item.toLowerCase()).includes(keyword.toLowerCase())
      })
      if (!listSearchHistory) {
        return []
      } else {
        const n = listSearchHistory.length <= 9 ? listSearchHistory.length : 9
        return listSearchHistory.slice(0, n)
      }
    },
    setItemToSearchHistory (item) {
      if (!item) return
      const listSearchHistory = JSON.parse(localStorage.getItem('listSearchHistory'))
      if (!listSearchHistory) {
        localStorage.setItem('listSearchHistory', JSON.stringify([item]))
      } else {
        const index = listSearchHistory.findIndex((item) => {
          return item.toLowerCase() === this.keyword.toLowerCase()
        })
        if (index >= 0) {
          listSearchHistory.splice(index, 1)
        }
        listSearchHistory.unshift(item)
        localStorage.setItem('listSearchHistory', JSON.stringify(listSearchHistory))
      }
    },
    handleBlurSearchInput () {
      setTimeout(() => {
        this.visibleHistory = false
      }, 100)
    }
  }
}
</script>

<style></style>
