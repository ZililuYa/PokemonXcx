<template>
  <div class="detail">
    <div class="img">
      <img
        v-if="imageIndex"
        :src="'https://s.pokeuniv.com/pokemon/pgl/'+imageIndex+'.png'"
        alt
        class="picture"
      />
    </div>
    <div class="ol">
      <div class="li">
        图鉴编号
        <span class="fr em">#{{data.index}}</span>
      </div>
      <div class="li">
        宝可梦名称
        <span class="fr">{{data.nameZh}}</span>
        <span class="fr em">（{{data.nameJa}}）</span>
      </div>
      <div class="li">
        属性
        <span class="fr property" :class="'property'+g1">{{data.type1}}</span>
        <span class="fr property" v-if="data.type2" :class="'property'+g2">{{data.type2}}</span>
      </div>
      <div class="li" @click="toSpeciality(data.ability1)">
        特性
        <span class="fr href">{{data.ability1}}</span>
      </div>
      <div class="li" @click="toSpeciality(data.ability2)" v-if="data.ability2">
        特性
        <span class="fr href">{{data.ability2}}</span>
      </div>
      <div class="li" @click="toSpeciality(data.abilityHide)" v-if="data.abilityHide">
        隐藏特性
        <span class="fr href">{{data.abilityHide}}</span>
      </div>
      <div class="li">
        蛋组
        <span class="fr href" @click="toEgg(data.detail.eggGroup1)">{{data.detail.eggGroup1}}</span>
        <span
          class="fr href"
          @click="toEgg(data.detail.eggGroup2)"
          v-if="data.detail.eggGroup2"
        >{{data.detail.eggGroup2}}</span>
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
      <div class="title">种族值</div>
      <div class="race" v-show="data.baseStat">
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

      <div class="title" v-if="!qq">Advert</div>
      <div class="banner" v-if="!qq">
        <ad unit-id="adunit-4322de44f112529c"></ad>
      </div>
      <div class="title" v-if="evolve && evolve.length">进化</div>
      <div class="evolve" v-if="evolve && evolve.length">
        <!-- <div class="fl" :style="'width:'+evolveBfb+'%'" v-for="(i, k) in evolve" :key="k">
          <span
            class="sprite-icon"
            @click="goTo(i.index)"
            v-if="i.index"
            :class="'sprite-icon-'+i.index"
          ></span>
          <span class="sprite-icon noIndex" v-if="!i.index">→</span>
          <div v-if="i.name">{{i.name}}</div>
          <div class="describe" v-if="i.describe">{{i.describe}}</div>
        </div>-->
        <div class="fl evolve-li">
          <span
            v-if="evolve[0].id.indexOf('.')==-1"
            class="sprite-icon"
            :class="'sprite-icon-'+evolve[0].id"
          ></span>
          <img
            class="evolveImg"
            :src="'https://s.pokeuniv.com/pokemon/icon/'+evolve[0].id+'.png'"
            mode="aspectFit"
            v-if="evolve[0].id.indexOf('.')!=-1"
            alt
          />
          {{evolve[0].name}}
        </div>
        <div v-for="(i, k) in evolve[1].approach" :key="k">
          <div class="fl evolve-li approach">
            <!-- <span class="sprite-icon" :class="'sprite-icon-'+i.id"></span> -->
            <span v-if="i.id.indexOf('.')==-1" class="sprite-icon" :class="'sprite-icon-'+i.id"></span>
            <img
              class="evolveImg"
              :src="'https://s.pokeuniv.com/pokemon/icon/'+i.id+'.png'"
              mode="aspectFit"
              v-if="i.id.indexOf('.')!=-1"
              alt
            />
            {{i.name}}
            <span class="fr">{{i.text}}</span>
          </div>
          <div class="fl evolve-li chain" v-if="i.chain">
            <!-- <span class="sprite-icon" :class="'sprite-icon-'+i.chain.id"></span> -->
            <span
              v-if="i.chain.id.indexOf('.')==-1"
              class="sprite-icon"
              :class="'sprite-icon-'+i.id"
            ></span>
            <img
              class="evolveImg"
              :src="'https://s.pokeuniv.com/pokemon/icon/'+i.chain.id+'.png'"
              mode="aspectFit"
              v-if="i.chain.id.indexOf('.')!=-1"
              alt
            />
            {{i.chain.name}}
            <span class="fr">{{i.chain.text}}</span>
          </div>
        </div>
      </div>

      <div class="title">异色</div>
      <div class="heteColor">
        <img
          class="colorImg"
          mode="aspectFit"
          :src="'https://s.pokeuniv.com/pokemon/sprite/front/'+imageIndex+'.'+(imageIndex>=810?'png':'gif')"
          alt
        />
        <img
          class="colorImg"
          mode="aspectFit"
          :src="'https://s.pokeuniv.com/pokemon/sprite/front-shiny/'+imageIndex+'.'+(imageIndex>=810?'png':'gif')"
          alt
        />
      </div>
      <div class="title">能力数值区间</div>
      <div class="section" v-show="data.baseStat">
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
      <div class="title">对战相克</div>
      <div class="listCalc">
        <div class="fight fl" v-for="(i, k) in listCalc" :key="k">
          <div class="attribute" :class="'property'+(k+1)">{{property[k]}}</div>
          <div class="t" :class="i>1?'red':i<1?'blue':''">{{i}}</div>
        </div>
      </div>
      <div class="title">可学会招式表</div>
      <mpNavbar :tabs="tabs" :activeIndex="tabIndex" @tabClick="tabClick"></mpNavbar>
      <div class="upgrade" v-if="tabIndex===0">
        <div class="list">
          <div
            class="item"
            :key="k"
            v-for="(i, k) in learnSetByLevelingUp"
            @click="goToMove(i.move)"
          >
            <span class="level">{{i.level1}}</span>
            <span class="move">{{i.move}}</span>
            <div class="fr">
              <span class="power br">{{i.power}}</span>
              <span class="power br">{{i.accuracy}}</span>
              <span class="power">{{i.pp}}</span>
              <span class="power sx" :class="'property'+i.isx">{{i.type}}</span>
              <span class="power sx" :class="'property'+i.ifl">{{i.category}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="upgrade" v-if="tabIndex===1">
        <div class="list">
          <div
            class="item"
            :key="k"
            v-for="(i, k) in learnSetByTechnicalMachine"
            @click="goToMove(i.move)"
          >
            <img :src="i.imgUrl" class="imgUrl fl" alt />
            <span class="move">{{i.move}}</span>
            <div class="fr">
              <span class="power br">{{i.power}}</span>
              <span class="power br">{{i.accuracy}}</span>
              <span class="power">{{i.pp}}</span>
              <span class="power sx" :class="'property'+i.isx">{{i.type}}</span>
              <span class="power sx" :class="'property'+i.ifl">{{i.category}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="upgrade" v-if="tabIndex===2">
        <div class="list">
          <div class="item" :key="k" v-for="(i, k) in learnSetByBreeding">
            <div @click="goToMove(i.move)">
              <span class="move">{{i.move}}</span>
              <div class="fr">
                <span class="power br">{{i.power}}</span>
                <span class="power br">{{i.accuracy}}</span>
                <span class="power">{{i.pp}}</span>
                <span class="power sx" :class="'property'+i.isx">{{i.type}}</span>
                <span class="power sx" :class="'property'+i.ifl">{{i.category}}</span>
              </div>
            </div>
            <div class="icon-list">
              <div
                @click="goTo(a)"
                class="fl sprite-icon"
                :key="b"
                :class="'sprite-icon-'+a"
                v-for="(a, b) in i.icon"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ajax,
  isProperty,
  effortValue,
  section,
  globalError,
  restrainCalc,
  getPokemon,
  isIndex,
  globalToPokemonDetail
} from "../../utils";
import mpNavbar from "mpvue-weui/src/navbar";

export default {
  components: { mpNavbar },
  onShareAppMessage: function() {
    return {
      path: "/pages/detail/main?name=" + this._index,
      query: "name=" + this._index
    };
  },
  onLoad: function(option) {
    const that = this;
    mpvue.getSystemInfo({
      success(res) {
        if (res.AppPlatform === "qq") {
          that.qq = true;
        }
      }
    });
    mpvue.showShareMenu();
    mpvue.showLoading({
      title: "加载中..."
    });
    // const opt = mpvue.getLaunchOptionsSync(); // 获取参数，目前不能用
    // console.log(opt);
    const index = option.index ? option.index : 1;
    this._index = parseInt(index);
    this.getPokemonEvent(index);
  },
  data() {
    return {
      tabIndex: 0,
      imageIndex: 1,
      tabs: ["升级", "学习器", "蛋招式"],
      evolve: [],
      evolveBfb: 100,
      g1: "",
      g2: "",
      basicsCount: "",
      _index: "",
      learnSetByTechnicalMachine: [],
      learnSetByLevelingUp: [],
      learnSetByBreeding: [],
      data: {
        detail: {},
        baseStat: {}
      },
      property: [
        "普",
        "飞",
        "火",
        "超",
        "水",
        "虫",
        "电",
        "岩",
        "草",
        "鬼",
        "冰",
        "龙",
        "斗",
        "恶",
        "毒",
        "钢",
        "地",
        "妖"
      ],
      listCalc: [],
      section: {},
      qq: false
    };
  },
  methods: {
    goToMove(name) {
      mpvue.navigateTo({
        url: "/pages/skill/main?name=" + name
      });
    },
    goTo(index) {
      mpvue.showLoading({
        title: "加载中..."
      });
      index = parseInt(index);
      this.getPokemonEvent(index);
    },
    getPokemonEvent(index) {
      this.learnSetByLevelingUp = [];
      this.learnSetByTechnicalMachine = [];
      this.learnSetByBreeding = [];
      this.imageIndex = parseInt(index);
      const success = res => {
        // 老缓存数据处理
        // if (!res.data.length) {
        // mpvue.removeStorageSync('detail' + index);
        // this.getPokemonEvent(index);
        // return;
        // }

        mpvue.hideLoading();

        if (res.data.length) {
          this.data = res.data[0];
          if (
            this.data.learnSetByLevelingUp &&
            this.data.learnSetByLevelingUp.length
          )
            this.learnSetByLevelingUp = this.data.learnSetByLevelingUp.map(
              ls => {
                return {
                  ...ls,
                  isx: isProperty(ls.type),
                  ifl: isProperty(ls.category)
                };
              }
            );
          if (
            this.data.learnSetByTechnicalMachine &&
            this.data.learnSetByTechnicalMachine.length
          )
            this.learnSetByTechnicalMachine = this.data.learnSetByTechnicalMachine.map(
              ls => {
                return {
                  ...ls,
                  isx: isProperty(ls.type),
                  ifl: isProperty(ls.category)
                };
              }
            );
          if (
            this.data.learnSetByBreeding &&
            this.data.learnSetByBreeding.length
          )
            this.learnSetByBreeding = this.data.learnSetByBreeding.map(ls => {
              return {
                ...ls,
                isx: isProperty(ls.type),
                ifl: isProperty(ls.category),
                icon: getPokemon(ls.parent, true)
              };
            });
          this.g1 = isProperty(this.data.type1);
          this.g2 = isProperty(this.data.type2);
          let list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
          this.listCalc = restrainCalc(list, this.g1);
          if (this.data.type2)
            this.listCalc = restrainCalc(this.listCalc, this.g2);
          this.basicsCount = effortValue(this.data.detail.effortValue);
          if (this.data.baseStat) this.section = section(this.data.baseStat);
        } else {
          error();
        }
      };
      const error = () => {
        globalError();
      };
      ajax(
        "/pokemon/detail",
        { index, storage: "detail" + index },
        "GET",
        success,
        error
      );
      this.getEvolve(index);
    },
    getEvolve(index) {
      index = isIndex(index);
      const that = this;
      const success = function(res) {
        that.evolve = [];
        Object.keys(res).forEach(id => {
          if (id.indexOf(index) !== -1) {
            that.evolve = res[id];
            console.log(that.evolve);
            // that.evolveBfb = 100 / that.evolve.length;
            // if (that.evolve.length >= 9) that.evolveBfb = 33.33333;
            return res[id];
          }
        });
      };
      // https://gitee.com/lukangdaye/PokemonTeamData/raw/master/evolve.json
      ajax(
        "/lukangdaye/PokemonTeamData/raw/master/evolve.json",
        { baseUrl: "https://gitee.com", storage: "getEvolve" },
        "GET",
        success
      );
    },
    tabClick(tab) {
      this.tabIndex = tab;
    },
    toEgg(egg) {
      mpvue.navigateTo({
        url: "/pages/egg/main?name=" + egg
      });
    },
    toSpeciality(name) {
      mpvue.navigateTo({
        url: "/pages/speciality/main?name=" + name
      });
    }
  }
};
</script>
