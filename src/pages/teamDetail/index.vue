<template>
  <div class="team detail">
    <div class="ol">
      <div class="li">
        队伍名称
        <span class="fr em">{{data.name}}</span>
      </div>
      <div class="li" v-for="(i,k) in data.pm" :key="k">
        <div class v-if="i.id">
          <div class="teamDiv">
            <img
              class="colorImg"
              mode="aspectFit"
              :src="'https://s.pokeuniv.com/pokemon/sprite/front/'+i.id+'.'+(i.ls?i.ls:i.id>=810?'png':'gif')"
              alt
            />
          </div>
          <div class="teamDiv">
            <div class="na bold">{{i.name}}</div>
            <div class="na">{{i.character}}</div>
            <div class="na">{{i.speciality}}</div>
            <div class="na">{{i.prop}}</div>
          </div>
          <div class="teamDiv right">
            <div class="na">Lv.50</div>
            <div class="na" v-for="(a,b) in i.jd" :key="b">{{a}}</div>
          </div>
          <div class="teamZsDiv">
            <div class="teamDiv">
              <div class="type" :class="'property'+i.g1">{{i.type1}}</div>
              <div class="type" :class="'property'+i.g2" v-if="i.type2">{{i.type2}}</div>
            </div>
            <div class="teamDiv six">
              <div class="type" v-for="(a,b) in i.zs" :key="b" :class="'property'+a.g">{{a.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="title">描述</div>
    <div class="desc">{{data.cont}}</div>
  </div>
</template>

<script>
import { ajax, isProperty } from "../../utils";
export default {
  data() {
    return { data: {} };
  },
  methods: {
    init(id) {
      const that = this;
      const success = function(res) {
        mpvue.hideLoading();
        if (res.pm)
          res.pm = res.pm.map(pm => {
            if (pm.index) pm.id = pm.id + "" + pm.index;
            pm.g1 = isProperty(pm.type1);
            pm.g2 = isProperty(pm.type2);
            if (pm.zs)
              pm.zs = pm.zs.map(zs => {
                zs.g = isProperty(zs.sx);
                return zs;
              });
            return pm;
          });
        that.data = res;
        console.log(res);
      };
      ajax(
        "/lukangdaye/PokemonTeamData/raw/master/data/" + id + ".json",
        { baseUrl: "https://gitee.com" },
        "GET",
        success
      );
    }
  },

  onLoad: function(option) {
    mpvue.showShareMenu();
    mpvue.showLoading({
      title: "加载中..."
    });
    // const opt = mpvue.getLaunchOptionsSync(); // 获取参数，目前不能用
    // console.log(opt);
    const id = option.id ? option.id : 1;
    this.init(id);
  }
};
</script>

<style lang="less">
.team {
  .li {
    height: auto !important;
    overflow: hidden;
  }
  .teamZsDiv {
    width: 100%;
    float: left;
    overflow: hidden;
  }
  .teamDiv {
    width: 33.3333%;
    height: auto;
    float: left;
    &.six {
      width: 66.6666%;
      padding-left: 10px;
      overflow: hidden;
      .type {
        width: 50%;
        float: left;
      }
    }
    .type {
      color: #fff;
      margin-bottom: 5px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-style: 12px;
      font-weight: 400;
    }
    .colorImg {
      width: 100%;
      height: 120px;
    }
    .na {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
      font-weight: 300;
      &.bold {
        font-weight: bold;
      }
    }
    &.right {
      text-align: right;
    }
  }
}
</style>
