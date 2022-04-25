<template>
  <li class="header__navbar-item header__navbar-user" @mousemove="visible = true" @mouseleave="visible = false">
    <img :src="image" alt="user" class="header__navbar-user-img" />
    <span class="header__navbar-item-name"> {{ username }} </span>
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
      image: '',
      visible: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo.info
    }
  },
  watch: {
    userInfo (newValue) {
      this.username = newValue.firstName + ' ' + newValue.lastName
      this.image = newValue.image
    }
  },
  created () {
    this.username = this.$store.getters.username
    this.image = this.$store.getters.image
  },
  methods: {
    gotoAccount () {
      if (this.$route.name !== 'userInfo') {
        this.$router.push({ name: 'userInfo' })
      }
    },
    gotoAddress () {
      if (this.$route.name !== 'userAddress') {
        this.$router.push({ name: 'userAddress' })
      }
    },
    gotoPurchase () {
      if (this.$route.name !== 'purchase') {
        this.$router.push({ name: 'purchase' })
      }
    },
    handleLogout () {
      this.visible = false
      this.$confirm({ content: 'Bạn có chắn chắn muốn đăng xuất?',
        onOk: () => {
          this.$router.push({ name: 'login' })
          this.$store.dispatch('logout')
        }
      })
    }
  }
}
</script>

<style></style>
