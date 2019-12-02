<template>
  <div class="more">
    <div class="ol">
      <div class="li" @click="toPath('/property/main')">
        <div class="i">
          <span class="sprite-icon sprite-icon-003M"></span>
        </div>
        <div class="t">精灵克制</div>
      </div>
      <div class="li" @click="onPicker">
        <div class="i">
          <span class="sprite-icon sprite-icon-006MY"></span>
        </div>
        <div class="t">蛋组</div>
      </div>
      <div class="li" @click="no">
        <div class="i">
          <span class="sprite-icon sprite-icon-009M"></span>
        </div>
        <div class="t">特性</div>
      </div>
      <div class="li" @click="toPath('/character/main')">
        <div class="i">
          <span class="sprite-icon sprite-icon-254M"></span>
        </div>
        <div class="t">性格</div>
      </div>
      <div class="li" @click="toPath('/team/main')">
        <div class="i">
          <span class="sprite-icon sprite-icon-257M"></span>
        </div>
        <div class="t">队伍推荐</div>
      </div>
      <div class="li" @click="no">
        <div class="i">
          <span class="sprite-icon sprite-icon-260M"></span>
        </div>
        <div class="t">招式</div>
      </div>
      <div class="li" @click="no">
        <div class="i">
          <span class="sprite-icon sprite-icon-480"></span>
        </div>
        <div class="t">攻略</div>
      </div>
      <div class="li" @click="toPath('/prop/main', true)">
        <div class="i">
          <span class="sprite-icon sprite-icon-481"></span>
        </div>
        <div class="t">道具</div>
      </div>
      <div class="li" @click="gy">
        <div class="i">
          <span class="sprite-icon sprite-icon-482"></span>
        </div>
        <div class="t">关于</div>
      </div>
    </div>
    <div class="version">版本：v{{version}}</div>
    <mpPicker
      ref="mpPicker"
      :deepLength="1"
      :pickerValueDefault="pickerValueDefault"
      @onConfirm="onConfirm"
      :pickerValueArray="pickerValueArray"
    ></mpPicker>
  </div>
</template>

<script>
import { version } from "../../../package.json";
import mpPicker from "mpvue-weui/src/picker";

export default {
  data() {
    return {
      version,
      pickerValueDefault: ["怪兽"],
      pickerValueArray: [
        {
          label: "怪兽",
          value: "怪兽"
        },
        {
          label: "水中1",
          value: "水中1"
        },
        {
          label: "虫",
          value: "虫"
        },
        {
          label: "飞行",
          value: "飞行"
        },
        {
          label: "陆上",
          value: "陆上"
        },
        {
          label: "妖精",
          value: "妖精"
        },
        {
          label: "植物",
          value: "植物"
        },
        {
          label: "人型",
          value: "人型"
        },
        {
          label: "水中3",
          value: "水中3"
        },
        {
          label: "矿物",
          value: "矿物"
        },
        {
          label: "不定形",
          value: "不定形"
        },
        {
          label: "水中2",
          value: "水中2"
        },
        {
          label: "龙",
          value: "龙"
        },
        {
          label: "未发现",
          value: "未发现"
        },
        {
          label: "百变怪",
          value: "百变怪"
        }
      ]
    };
  },
  components: {
    mpPicker
  },
  methods: {
    onPicker() {
      this.$refs.mpPicker.show();
    },
    onConfirm(data) {
      this.toPath("/egg/main?name=" + data.label);
    },
    toPath(url, i) {
      if (i) {
        mpvue.switchTab({
          url: "/pages" + url
        });
        return;
      }
      mpvue.navigateTo({
        url: "/pages" + url
      });
    },
    no() {
      mpvue.showToast({
        title: "暂未开放",
        icon: "none"
      });
    },
    gy() {
      mpvue.showModal({
        title: "关于",
        content: "联系人微信：lukangdaye"
      });
    }
  }
};
</script>

<style>
.more {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.more .version {
  width: 100%;
  text-align: center;
  font-size: 11px;
  position: absolute;
  bottom: 0;
  left: 0;
  line-height: 50px;
  color: #b3b3b3;
}

.more .li {
  text-align: center;
  width: 33.3333%;
  float: left;
  padding: 20px 0;
  font-size: 13px;
  border-top: 1px solid #f9f9f9;
  border-left: 1px solid #f9f9f9;
  background-color: #fff;
  box-sizing: border-box;
}

.more .li .t {
  padding-top: 10px;
}

.more .ol {
  overflow: hidden;
  box-sizing: border-box;
  border-right: 1px solid #f9f9f9;
  border-bottom: 1px solid #f9f9f9;
}
</style>
