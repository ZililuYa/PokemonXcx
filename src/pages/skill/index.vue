<template>
  <div class="detail skill-main">
    <img :src="data.detail.imgUrl" alt="" class="skill">
    <div class="ol">
      <div class="li">
        招式编号
        <span class="fr em">#{{data.id}}</span>
      </div>
      <div class="li">
        招式名称
        <span class="fr ">{{data.nameZh}}</span>
        <span class="fr em">（{{data.nameJa}}）</span>
      </div>
      <div class="li">
        属性
        <span class="fr property" :class="'property'+typeIn">{{data.type}}</span>
      </div>
      <div class="li">
        分类
        <span class="fr property" :class="'property'+categoryIn">{{data.category}}</span>
      </div>
      <div class="li">
        威力
        <span class="fr">{{data.power}}</span>
      </div>
      <div class="li">
        命中
        <span class="fr">{{data.accuracy}}</span>
      </div>
      <div class="li">
        PP
        <span class="fr">{{data.pp}}</span>
      </div>
      <div class="li">
        所属世代
        <span class="fr">{{data.generation}}代</span>
      </div>
      <div class="title">
        描述
      </div>
      <div class="desc">
        {{data.detail.desc}}
      </div>
      <div class="title">
        范围
      </div>
      <div class="desc">
        {{data.detail.scope}}
      </div>
      <div class="title">
        影响
      </div>
      <div class="desc">
        {{data.detail.effect}}
      </div>
      <div class="title">
        说明
      </div>
      <div class="desc">
        {{data.detail.notes}}
      </div>
    </div>
  </div>
</template>

<script>
  import {globalGoBackHome, globalError, ajax, isProperty} from '../../utils'

  export default {
    data() {
      return {
        data: {
          detail: {}
        },
        categoryIn: '',
        typeIn: ''
      }
    },
    methods: {
      getSkill(name) {
        const success = (res) => {
          mpvue.hideLoading();
          let data = res.data;
          if (data && data.length) {
            this.data = data[0];
            this.typeIn = isProperty(this.data.type);
            this.categoryIn = isProperty(this.data.category);
          } else {
            error();
          }
        };

        const error = () => {
          globalError();
        };
        ajax('/move/detail', {nameZh: name, storage: 'skill' + name}, 'GET', success, error)
      }
    },
    onLoad(option) {
      mpvue.showShareMenu();
      mpvue.showLoading({
        title: '加载中...',
      });
      // const opt = mpvue.getLaunchOptionsSync(); // 获取参数，目前不能用
      // console.log(opt);
      const name = option.name ? option.name : '地震';
      if (!name) globalGoBackHome();
      this.getSkill(name);
    }
  }
</script>

<style>
  .detail .skill {
    width: 100%;
    height: 75vw;
  }

  .skill-main {
    padding-top: 0 !important;
  }
</style>
