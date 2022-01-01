<template>
  <div
    id="forumhome"
    :style="{
      backgroundImage: 'url(' + bgTop + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <Top
      v-bind:zoneInfo2="zoneInfo2"
      v-bind:zoneInfo1="zoneInfo1"
      v-bind:searchInfo="searchInfo"
      @chooseZone="chooseZone"
      @passSearchInfo="passSearchInfo"
    />
    <Secend
      v-bind:zoneInfo2="zoneInfo2"
      v-bind:zoneInfo1="zoneInfo1"
      v-bind:searchInfo="searchInfo"
      style="margin: 10px 20% 20px 20%;"
    />
    <Footer />
  </div>
</template>

<style scoped>
Secend {
  height: 80%;
}
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px;
}
#forumhome {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<script>
import Top from "../forumHome/Top";
import Secend from "../forumHome/Secend";
import Footer from "../forumHome/Footer";
// import SecendTiles from "../forumHome/SecendTiles";

export default {
  data() {
    return {
      zoneInfo1: 99, //需要传递的值
      zoneInfo2: 99,
      searchInfo: "nullsearchINfo",
      bgTop: require("@/assets/bgTop2.jpg")
    };
  },
  components: {
    Top,
    Secend,
    Footer
  },
  methods: {
    // 用来给子组件传递参数到父组件的函数
    chooseZone(param1, param2) {
      this.zoneInfo1 = param1;
      this.zoneInfo2 = param2;
    },
    passSearchInfo(searchInfo) {
      this.searchInfo = searchInfo;
    },
    debug() {
      console.log(this.zoneInfo1, this.zoneInfo2, this.searchInfo);
    }
  }
};
</script>
