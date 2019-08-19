<template>
  <div class="detail prop">
    <div class="ol">
      <div class="li">
        道具图片
        <img :src="data.imgUrl?data.imgUrl:sprite" alt=""
             class="fr imgUrl"/>
      </div>
      <div class="li">
        道具编号
        <span class="fr em">#{{data.id}}</span>
      </div>
      <div class="li">
        道具名称
        <span class="fr">{{data.nameZh}}</span>
        <span class="fr em">（{{data.nameJa}}）</span>
      </div>
    </div>
    <div class="title">
      描述
    </div>
    <div class="desc">
      {{data.desc}}
    </div>
  </div>
</template>

<script>
  import {globalError} from '../../utils'

  export default {
    data() {
      return {
        sprite: 'https://pokemon.forver.cc/sprite-1.png',
        data: {},
        pokemon: []
      }
    },
    onLoad() {
      mpvue.showShareMenu();
      mpvue.showLoading({
        title: '加载中...',
      });

      const data = mpvue.getStorageSync('prop');

      const error = () => {
        globalError();
      };

      if (data) {
        this.data = data;
        mpvue.hideLoading();
      } else {
        error();
      }
    },
    methods: {}
  }
</script>

<style>
  .prop .imgUrl {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }
</style>
