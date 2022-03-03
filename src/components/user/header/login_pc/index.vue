<template>
  <li class="header__navbar-item header__navbar-user" @mousemove="visible = true" @mouseleave="visible = false">
    <img src="@/assets/img/user.png" alt="user" class="header__navbar-user-img" />
    <span class="header__navbar-item-name"> nguyen thin </span>

    <ul class="header__navbar-user-menu" v-if="visible">
      <li class="header__navbar-user-item">
        <div @click="gotoAccount">Tài khoản của tôi</div>
      </li>
      <li class="header__navbar-user-item">
        <div @click="gotoAddress">Địa chỉ của tôi</div>
      </li>
      <li class="header__navbar-user-item">
        <div @click="gotoPurchase">Đơn mua</div>
      </li>
      <li class="header__navbar-user-item header__navbar-user-item--separate">
        <div @click="handleLogout">Đăng xuất</div>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'LoginPc',
  data () {
    return {
      username: '',
      image: '@/assets/img/user.png',
      visible: false
    }
  },
  methods: {
    gotoAccount () {
      console.log('go to account')
    },
    gotoAddress () {
      console.log('go to address')
    },
    gotoPurchase () {
      console.log('go to purchase')
    },
    handleLogout () {
        console.log('logout')
    }
  },
  mounted () {}
}
</script>

<style></style>
