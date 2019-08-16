<template>
  <div>
    <swiper v-if="imgUrls.length > 0" indidator-dots="imgUrls.length > 1">
      <block v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" mode="scaleToFill"></image>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>

  export default {
    components: {},

    data() {
      return {
        logs: [],
      }
    },

    created() {
      // let logs
      // if (mpvuePlatform === 'my') {
      //   logs = mpvue.getStorageSync({key: 'logs'}).data || []
      // } else {
      //   logs = mpvue.getStorageSync('logs') || []
      // }
      // this.logs = logs.map(log => formatTime(new Date(log)))
    }
  }
</script>

<style>
</style>
