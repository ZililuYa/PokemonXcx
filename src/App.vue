<script>
  export default {
    mounted() {
      // 调用API从本地缓存中获取数据
      /*
       * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
       * 微信：mpvue === wx, mpvuePlatform === 'wx'
       * 头条：mpvue === tt, mpvuePlatform === 'tt'
       * 百度：mpvue === swan, mpvuePlatform === 'swan'
       * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
       */

      // let logs
      // if (mpvuePlatform === 'my') {
      //   logs = mpvue.getStorageSync({key: 'logs'}).data || []
      //   logs.unshift(Date.now())
      //   mpvue.setStorageSync({
      //     key: 'logs',
      //     data: logs
      //   })
      // } else {
      //   logs = mpvue.getStorageSync('logs') || []
      //   logs.unshift(Date.now())
      //   mpvue.setStorageSync('logs', logs)
      // }
      const updateManager = mpvue.getUpdateManager();

      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        // console.log(res.hasUpdate)
      });

      updateManager.onUpdateReady(function () {
        mpvue.showToast({
          title: '新版本已经准备好，3秒后重启应用',
          icon: 'none',
          duration: 3000
        });
        setTimeout(function () {
          updateManager.applyUpdate()
        }, 3000);

      });

      updateManager.onUpdateFailed(function () {
        // 新版本下载失败
        mpvue.showModal({
          title: '提示',
          content: '检查到有新版本，但下载失败，请检查网络设置',
          showCancel: false,
        })
      })
    }
  }
</script>

<style>
  .weui-search-bar {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
</style>
