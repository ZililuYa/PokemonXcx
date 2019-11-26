<template>
  <div class="generation" v-if="!runSearch">
    <div class="title" :class="isShow?'show':''" @click="switchover">
      {{title}}
      <span class="fr loading">{{list.length?'':'载入数据中'}}</span>
    </div>
    <div class="ol" v-show="isShow">
      <div class="li" :class="'li'+generation" v-for="i in list" :key="i" @click="click(i.index)">
        <span class="fl sprite-icon" :class="'sprite-icon-'+i.index"></span>
        <!-- <span class="fl sprite-icon icon-two" :style="'background-image: url(https://s.pokeuniv.com/pokemon/icon/'+i.index+'.png)'" ></span> -->
        <span class="fl index">#{{i.index}}</span>
        {{i.nameZh}}
        <span class="fr property" :class="'property'+i.g1">{{i.type1}}</span>
        <span class="fr property" :class="'property'+i.g2" v-if="i.type2">{{i.type2}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ajax, isProperty, isIndex, globalToPokemonDetail } from "../utils";

export default {
  props: ["generation", "title", "show", "search"],
  data() {
    return {
      list: [],
      oldList: [],
      isShow: false,
      runSearch: false
    };
  },
  methods: {
    click(index) {
      globalToPokemonDetail(index);
    },
    switchover() {
      this.$emit("showEvent", { show: !this.show, index: this.generation });
    },
    isSearch(e) {
      if (e) {
        let list = [];
        this.oldList.forEach(poke => {
          const search =
            poke.nameZh +
            poke.nameJa +
            poke.nameEn +
            poke.type1 +
            poke.type2 +
            poke.ability1 +
            poke.ability2 +
            poke.abilityHide;
          if (search.indexOf(e) !== -1) list.push(poke);
        });
        this.list = list;
        if (!list.length) this.runSearch = true;
        else this.runSearch = false;
      } else {
        this.list = this.oldList;
        this.runSearch = false;
      }
    }
  },
  watch: {
    show(e) {
      this.isShow = e;
    },
    search(e) {
      this.isSearch(e);
    }
  },
  created() {
    this.isShow = this.show;

    const data = {
      generation: this.generation,
      storage: "list" + this.generation
    };
    const success = res => {
      const arr = res.data.map(n => {
        n.eight = n.index >= 810;
        n.index = isIndex(n.index);
        n.g1 = isProperty(n.type1);
        n.g2 = isProperty(n.type2);
        return n;
      });
      this.list = arr;
      this.oldList = arr;
    };
    ajax("/pokemon/list", data, "GET", success);
  },
  mounted() {}
};
</script>
