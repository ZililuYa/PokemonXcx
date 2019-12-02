<template>
  <div class="team detail">
    <div class="ol">
      <div class="li center">
        队伍推荐
        <!-- <span class="fr em">#{{data.index}}</span> -->
      </div>
      <div class="li" v-for="(i,k) in data" :key="k" @click="toPath(i.id)">
        <div class="name">
          #{{i.id}}
          <span class="fr">{{i.name}}</span>
        </div>
        <div class="pm">
          <span v-for="(a,b) in i.team" :key="b" class="sprite-icon" :class="'sprite-icon-'+a"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ajax } from "../../utils";
export default {
  data() {
    return { data: [] };
  },
  methods: {
    init() {
      const that = this;
      const success = function(res) {
        mpvue.hideLoading();
        that.data = res;
      };
      ajax(
        "/lukangdaye/PokemonTeamData/raw/master/data.json",
        { baseUrl: "https://gitee.com" },
        "GET",
        success
      );
    },
    toPath(id) {
      mpvue.navigateTo({
        url: "/pages/teamDetail/main?id=" + id
      });
    }
  },

  onLoad: function(option) {
    mpvue.showShareMenu();
    mpvue.showLoading({
      title: "加载中..."
    });
    // const opt = mpvue.getLaunchOptionsSync(); // 获取参数，目前不能用
    // console.log(opt);
    this.init();
  }
};
</script>

<style lang="less">
.team {
  .li {
    height: auto !important;
    .pm {
      text-align: right;
    }
  }
  .center {
    text-align: center !important;
  }
}
</style>
