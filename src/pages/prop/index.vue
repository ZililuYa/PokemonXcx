<template>
  <div class="prop">
    <searchInput :isFocus="isFocus" :placeholder="placeholder" @confirm="confirm"
                 @clear="clear"></searchInput>
    <div class="ol">
      <div class="li" v-for="(i, k) in list" :key="k" @click="click(i)" v-if="i">
        <img :src="i.imgUrl?i.imgUrl:sprite" alt=""
             class="fl img"> <span class="fl em">#{{i.id}}</span>
        <span class="fr">{{i.nameZh}}</span>
      </div>
      <div class="loading">{{loading?'加载数据中':'已经全部显示'}}</div>
    </div>
  </div>
</template>

<script>
  import {ajax, globalError} from '../../utils'
  import searchInput from '../../components/searchInput'

  export default {
    components: {searchInput},
    onReachBottom() {
      let list = this.getPage(this.page);
      if (!list.length) {
        this.loading = false;
        return;
      } else if (list.length < 20) {
        this.loading = false;
      }
      this.page++;
      this.list = [...this.list, ...list];
    },
    methods: {
      click(i) {
        mpvue.setStorage({
          key: 'prop',
          data: i,
          success: function () {
            mpvue.navigateTo({
              url: "/pages/propDetail/main"
            });
          }
        });
      },
      confirm(e) {
        e = e.target.value;
        if (e)
          this.search(e);
      },
      clear() {
        this.search(undefined);
      },
      search(e) {
        let list = [];
        if (e) {
          this.cd.forEach(res => {
            if (res.nameZh.indexOf(e) !== -1) list.push(res);
          })
        } else {
          list = this.cd;
        }
        this.data = list;
        this.list = this.getPage(1);
        this.page = 2;
        if (this.list.length < 20) {
          this.loading = false
        } else this.loading = true;
      },
      getPage(nowPage) {
        let page = 20;
        let length = this.data.length;
        let index = nowPage * page - page;
        let list = [];
        for (let i = 1; i <= 20; i++) {
          if (index <= length) {
            list.push(this.data[index])
          }
          index++;
        }
        return list;
      }
    },
    data() {
      return {
        sprite: 'https://pokemon.forver.cc/sprite-1.png',
        data: [],
        list: [],
        page: 2,
        loading: true,
        placeholder: '道具名称'
      }
    },
    onLoad() {
      mpvue.showShareMenu();
      mpvue.showLoading({
        title: '加载中...',
      });
      const success = res => {
        mpvue.hideLoading();
        if (res.data.length) {
          this.data = res.data;
          this.cd = res.data;
          this.list = this.getPage(1);
        } else {
          error();
        }
      };
      const error = () => {
        globalError();
      };
      ajax('/item/list', {storage: 'item'}, 'GET', success, error)
    },
  }
</script>

<style>
  .prop {
    padding-top: 50px;
    padding-bottom: 30px;
  }

  .prop .li {
    width: 100%;
    height: 60px;
    padding: 0 20px;
    line-height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #f9f9f9;
    font-size: 14px;
  }

  .prop .li .img {
    width: 30px;
    height: 30px;
    margin-top: 15px;
  }

  .prop .li .em {
    font-size: 12px;
    color: #878787;
    margin-left: 5px;
  }

  .prop .loading {
    width: 100%;
    font-size: 13px;
    text-align: center;
    margin-top: 30px;
  }
</style>
