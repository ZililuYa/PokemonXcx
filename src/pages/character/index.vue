<template>
  <div class="character">
    <div class="title">
      性格修正
    </div>
    <div class="ol">
      <div class="li th">
        性格
      </div>
      <div class="li th">
        增加能力值
      </div>
      <div class="li th">
        降低能力值
      </div>
    </div>
    <div class="ol" v-for="(i, k) in data" :key="k">
      <div class="li th">
        {{i.a}}
      </div>
      <div class="li" :class="i.bb">
        {{i.b?'↑ '+i.b:'-'}}
      </div>
      <div class="li" :class="i.cc">
        {{i.c?'↓ '+i.c:'-'}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {},
    data() {
      return {
        data: [
          {a: '怕寂寞', b: '攻击', c: '防御', bb: 'gj', cc: 'fy'},
          {a: '固执', b: '攻击', c: '特攻', bb: 'gj', cc: 'tg'},
          {a: '顽皮', b: '攻击', c: '特防', bb: 'gj', cc: 'tf'},
          {a: '勇敢', b: '攻击', c: '速度', bb: 'gj', cc: 'sd'},
          //
          {a: '大胆', b: '防御', c: '攻击', bb: 'fy', cc: 'gj'},
          {a: '淘气', b: '防御', c: '特攻', bb: 'fy', cc: 'tg'},
          {a: '乐天', b: '防御', c: '特防', bb: 'fy', cc: 'tf'},
          {a: '悠闲', b: '防御', c: '速度', bb: 'fy', cc: 'sd'},
          //
          {a: '内敛', b: '特攻', c: '攻击', bb: 'tg', cc: 'gj'},
          {a: '慢吞吞', b: '特攻', c: '防御', bb: 'tg', cc: 'fy'},
          {a: '马虎', b: '特攻', c: '特防', bb: 'tg', cc: 'tf'},
          {a: '冷静', b: '特攻', c: '速度', bb: 'tg', cc: 'sd'},
          //
          {a: '温和', b: '特防', c: '攻击', bb: 'tf', cc: 'gj'},
          {a: '温顺', b: '特防', c: '防御', bb: 'tf', cc: 'fy'},
          {a: '慎重', b: '特防', c: '特攻', bb: 'tf', cc: 'tg'},
          {a: '自大', b: '特防', c: '速度', bb: 'tf', cc: 'sd'},
          //
          {a: '胆小', b: '速度', c: '攻击', bb: 'sd', cc: 'gj'},
          {a: '急躁', b: '速度', c: '防御', bb: 'sd', cc: 'fy'},
          {a: '爽朗', b: '速度', c: '特攻', bb: 'sd', cc: 'tg'},
          {a: '天真', b: '速度', c: '特防', bb: 'sd', cc: 'tf'},
          //
          {a: '勤奋', b: '', c: '', bb: 'th', cc: 'th'},
          {a: '坦率', b: '', c: '', bb: 'th', cc: 'th'},
          {a: '害羞', b: '', c: '', bb: 'th', cc: 'th'},
          {a: '浮躁', b: '', c: '', bb: 'th', cc: 'th'},
          {a: '认真', b: '', c: '', bb: 'th', cc: 'th'},
        ]
      }
    },
  }
</script>

<style>
  .character {
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .character .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .character .ol {
    width: 100%;
    margin-bottom: 5px;
    overflow: hidden;
  }

  .character .li {
    width: 33.33333%;
    float: left;
    box-sizing: border-box;
    border-left: 5px solid #fff;
    border-right: 5px solid #fff;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 13px;
    color: #fff
  }

  .character .li.th {
    color: #333 !important;
  }

  .character .li.gj {
    background-color: #f6e19c;
  }

  .character .li.fy {
    background-color: #f288b1;
  }

  .character .li.tg {
    background-color: #acd3d9;
  }

  .character .li.tf {
    background-color: #8fa9ca;

  }

  .character .li.sd {
    background-color: #bd9fd4;
  }
</style>
