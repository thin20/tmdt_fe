<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="" target="_blank">Copyright ©2021. All rights reserved.</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
