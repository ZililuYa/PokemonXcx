<template>
  <div class="detail">
    <div class="ol">
      <div class="li">
        特性编号
        <span class="fr em">#{{data.id}}</span>
      </div>
      <div class="li">
        特性名称
        <span class="fr">{{data.nameZh}}</span>
        <span class="fr em">（{{data.nameJa}}）</span>
      </div>
      <div class="li">
        所属世代
        <span class="fr">{{data.generation}}代</span>
      </div>
    </div>
    <div class="title">
      描述
    </div>
    <div class="desc">
      {{data.desc}}
    </div>
    <div class="title">
      对战效果
    </div>
    <div class="desc">
      {{data.effect}}
    </div>
    <div class="title">
      拥有此特性的宝可梦
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
  import {ajax, getPokemon} from '../../utils'

  export default {
    data() {
      return {
        data: {},
        pokemon: []
      }
    },
    onLoad(option) {

      // mpvue.showShareMenu();
      mpvue.showLoading({
        title: '加载中...',
      });

      const name = option.name ? option.name : '结实';
      const success = res => {
        mpvue.hideLoading();
        if (res.data.length) {
          this.data = res.data[0];
          this.pokemon = getPokemon(this.data.pokemons);
        } else {
          error();
        }
      };
      const error = () => {
        mpvue.hideLoading();
        mpvue.showToast({
          title: '加载失败',
          icon: 'loading'
        });

        setTimeout(() => {
          mpvue.switchTab({url: '/pages/index/main'})
        }, 1500)
      };

      ajax('/ability/detail', {nameZh: name}, 'GET', success, error)
    },
    methods: {
      click(index) {
        mpvue.navigateTo({
          url: "/pages/detail/main?index=" + index
        });
      },
    }
  }
</script>

<style>
</style>
