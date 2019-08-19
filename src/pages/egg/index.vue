<template>
  <div class="detail">
    <div class="ol">
      <div class="li">
        蛋组名称
        <span class="fr">{{name}}</span>
      </div>
      <div class="li">
        宝可梦数量
        <span class="fr">{{pokemon.length}}</span>
      </div>
      <div class="title">
        此蛋组的宝可梦
      </div>
    </div>
    <div class="generation">
      <div class="ol">
        <div class="li" v-for="i in pokemon" :key="i" @click="click(i.index)">
          <span class="fl sprite-icon" :class="'sprite-icon-'+i.index"></span><span class="fl index">#{{i.index}}</span>
          {{i.nameZh}}
          <span class="fr property" :class="'property'+i.g1">{{i.type1}}</span>
          <span class="fr property" :class="'property'+i.g2" v-if="i.type2">{{i.type2}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ajax, isIndex, isProperty, globalError, globalToPokemonDetail} from '../../utils'

  export default {
    data() {
      return {
        data: {},
        name: '',
        pokemon: []
      }
    },
    onLoad(option) {

      // mpvue.showShareMenu();
      mpvue.showLoading({
        title: '加载中...',
      });

      const name = option.name ? option.name : '怪兽';
      this.name = name;
      const success = res => {
        mpvue.hideLoading();
        if (res.data.length) {
          this.pokemon = res.data.map(n => {
            n.index = isIndex(n.index);
            n.g1 = isProperty(n.type1);
            n.g2 = isProperty(n.type2);
            return n
          });

        } else {
          error();
        }
      };
      const error = () => {
        globalError();
      };

      ajax('/pokemon/list', {eggGroup: name}, 'GET', success, error)
    },
    methods: {
      click(index) {
        globalToPokemonDetail(index);
      },
    }
  }
</script>

<style>
</style>
