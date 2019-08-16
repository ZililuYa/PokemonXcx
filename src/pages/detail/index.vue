<template>
  <div class="detail">
    <div class="img">
      <img :src="data.detail.imgUrl" alt="" class="picture">
    </div>
    <div class="ol">
      <div class="li">
        图鉴编号
        <span class="fr em">#{{data.index}}</span>
      </div>
      <div class="li">
        宝可梦名称
        <span class="fr ">{{data.nameZh}}</span>
        <span class="fr em">（{{data.nameJa}}）</span>
      </div>
      <div class="li">
        属性
        <span class="fr property" :class="'property'+g1">{{data.type1}}</span>
        <span class="fr property" v-if="data.type2" :class="'property'+g2">{{data.type2}}</span>
      </div>
      <div class="li" @click="toSpeciality(data.ability1)">
        特性
        <span class="fr">{{data.ability1}}</span>
      </div>
      <div class="li" @click="toSpeciality(data.ability2)" v-if="data.ability2">
        特性
        <span class="fr">{{data.ability2}}</span>
      </div>
      <div class="li" @click="toSpeciality(data.abilityHide)" v-if="data.abilityHide">
        隐藏特性
        <span class="fr">{{data.abilityHide}}</span>
      </div>
      <div class="li">
        蛋组
        <span class="fr">{{data.detail.eggGroup1}}</span>
        <span class="fr" v-if="data.detail.eggGroup2">{{data.detail.eggGroup2}}&emsp;</span>
      </div>
      <div class="li">
        种类
        <span class="fr">{{data.detail.category}}</span>
      </div>
      <div class="li">
        性别比例
        <span class="fr">{{data.detail.genderRatio}}</span>
      </div>
      <div class="li">
        身高
        <span class="fr">{{data.detail.height}}</span>
      </div>
      <div class="li">
        体重
        <span class="fr">{{data.detail.weight}}</span>
      </div>
      <div class="li">
        捕获率
        <span class="fr">{{data.detail.catchRate}}</span>
      </div>
      <div class="li">
        培育
        <span class="fr">{{data.detail.hatchTime}}</span>
      </div>
      <div class="li">
        基础点数
        <span class="fr">{{basicsCount}}</span>
      </div>
      <div class="title">
        种族值
      </div>
      <div class="race">
        <div class="rli color1">
          <span class="fl a">ＨＰ:</span>
          <span class="fl b">{{data.baseStat.hp}}</span>
          <span :style="'width:'+data.baseStat.hp+'px'" class="fl c"></span>
        </div>
        <div class="rli color2">
          <span class="fl a">攻击:</span>
          <span class="fl b">{{data.baseStat.attack}}</span>
          <span :style="'width:'+data.baseStat.attack+'px'" class="fl c"></span>
        </div>
        <div class="rli color3">
          <span class="fl a">防御:</span>
          <span class="fl b">{{data.baseStat.defense}}</span>
          <span :style="'width:'+data.baseStat.defense+'px'" class="fl c"></span>
        </div>
        <div class="rli color4">
          <span class="fl a">特攻:</span>
          <span class="fl b">{{data.baseStat.spAttack}}</span>
          <span :style="'width:'+data.baseStat.spAttack+'px'" class="fl c"></span>
        </div>
        <div class="rli color5">
          <span class="fl a">特防:</span>
          <span class="fl b">{{data.baseStat.spDefense}}</span>
          <span :style="'width:'+data.baseStat.spDefense+'px'" class="fl c"></span>
        </div>
        <div class="rli color6">
          <span class="fl a">速度:</span>
          <span class="fl b">{{data.baseStat.speed}}</span>
          <span :style="'width:'+data.baseStat.speed+'px'" class="fl c"></span>
        </div>
        <div class="rli">
          <span class="fl a">总和:</span>
          <span class="fl b">{{data.baseStat.total}}</span>
        </div>
      </div>

      <div class="title">
        友情广告
      </div>
      <div class="banner">
        <ad unit-id="adunit-4322de44f112529c"></ad>
      </div>
      <div class="title">
        能力数值区间
      </div>
      <div class="section">
        <div class="capacity">
          <div class="a"></div>
          <div class="b">50级</div>
          <div class="c">100级</div>
        </div>
        <div class="capacity">
          <div class="a">ＨＰ:</div>
          <div class="b">{{section.b0_50}}</div>
          <div class="c">{{section.b0_100}}</div>
        </div>
        <div class="capacity">
          <div class="a">攻击:</div>
          <div class="b">{{section.b1_50}}</div>
          <div class="c">{{section.b1_100}}</div>
        </div>
        <div class="capacity">
          <div class="a">防御:</div>
          <div class="b">{{section.b2_50}}</div>
          <div class="c">{{section.b2_100}}</div>
        </div>
        <div class="capacity">
          <div class="a">特攻:</div>
          <div class="b">{{section.b3_50}}</div>
          <div class="c">{{section.b3_100}}</div>
        </div>
        <div class="capacity">
          <div class="a">特防:</div>
          <div class="b">{{section.b4_50}}</div>
          <div class="c">{{section.b4_100}}</div>
        </div>
        <div class="capacity">
          <div class="a">速度:</div>
          <div class="b">{{section.b5_50}}</div>
          <div class="c">{{section.b5_100}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ajax, isProperty, effortValue, section} from '../../utils'

  export default {
    component: {},
    onShow: function () {
    },
    onShareAppMessage: function () {
      return {
        path: '/pages/detail/main?name=' + this._index
      }
    },
    onLoad: function (option) {
      mpvue.showShareMenu();
      mpvue.showLoading({
        title: '加载中...',
      });
      const index = option.index ? option.index : 1;
      this._index = parseInt(index);
      const success = res => {
        mpvue.hideLoading();
        if (res.data.length) {
          this.data = res.data[0];
          this.g1 = isProperty(this.data.type1);
          this.g2 = isProperty(this.data.type2);
          this.basicsCount = effortValue(this.data.detail.effortValue);
          this.section = section(this.data.baseStat);
        } else {
          error();
        }
      };
      const error = () => {
        mpvue.hideLoading();
        mpvue.showToast({
          title: '加载宝可梦失败',
          icon: 'loading'
        });
        setTimeout(() => {
          mpvue.switchTab({url: '/pages/index/main'})
        }, 1500)
      };
      ajax('/pokemon/detail', {index, storage: 'detail' + index}, 'GET', success, error)
    },
    data() {
      return {
        g1: '',
        g2: '',
        basicsCount: '',
        _index: '',
        data: {
          detail: {},
          baseStat: {}
        },
        section: {},
      }
    },
    methods: {
      toSpeciality(name) {
        mpvue.navigateTo({
          url: "/pages/speciality/main?name=" + name
        });
      }
    }
  }
</script>
