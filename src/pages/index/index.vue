<template>
  <div class="app-main">
    <searchInput :isFocus="isFocus" :placeholder="placeholder" @confirm="confirm"></searchInput>
    <generation v-for="i in generation" @showEvent="showEvent" :generation="i.index" :title="i.title" :search="search"
                :show="i.show" :key="i.index"></generation>

  </div>
</template>

<script>
  import generation from '../../components/generation'
  import searchInput from '../../components/searchInput'

  export default {
    data() {
      return {
        placeholder: '宝可梦名称 / 属性 / 特性',
        isFocus: false,
        search: '',
        generation: [
          {index: 1, title: '第一世代', show: false},
          {index: 2, title: '第二世代', show: false},
          {index: 3, title: '第三世代', show: false},
          {index: 4, title: '第四世代', show: false},
          {index: 5, title: '第五世代', show: false},
          {index: 6, title: '第六世代', show: false},
          {index: 7, title: '第七世代', show: false},
        ]
      }
    },

    components: {
      searchInput,
      generation
    },

    methods: {
      confirm(e) {
        if (!e) {
          this.search = '';
        } else
          this.search = e.target.value;
        // this.$set(this.search, e.target.value)
      },
      showEvent(e) {
        const i = e.index - 1;
        let list = this.generation.map(n => {
          n.show = false;
          return n;
        });
        list[i].show = e.show;
        this.$set(this.generation, list);
      },
      // goToCou() {
      //   mpvue.navigateTo({url: '../counter/main'})
      // },
    },

    created() {
      // let app = getApp()
    },
    onLoad() {
      mpvue.showShareMenu();
    }
  }
</script>
