<template>
  <div id="forumhome">
    <Top v-bind:zoneInfo2="zoneInfo2" v-bind:zoneInfo1="zoneInfo1" @chooseZone="chooseZone"/>
    <el-button @click="debug">debug buttun</el-button>
    <Secend
        v-bind:zoneInfo2="zoneInfo2" v-bind:zoneInfo1="zoneInfo1"
        style="margin: 10px 150px 20px 150px;"/>
    <Tiles/>

    <SecendTiles/>
    <Footer/>

  </div>
</template>

<style>

</style>


<script>
import Top from "../forumHome/Top";
import Secend from "../forumHome/Secend";
import Tiles from "../forumHome/Tiles";
import Footer from "../forumHome/Footer";
import SecendTiles from "../forumHome/SecendTiles";


export default {
  data() {
    return {
      zoneInfo1: 99, //需要传递的值
      zoneInfo2: 99,
    }
  },
  components: {
    Top,
    Secend,
    Tiles,
    Footer,
    SecendTiles,
  },
  methods: {
    // 用来给子组件传递参数到父组件的函数
    chooseZone(param1, param2) {
      this.zoneInfo1 = param1
      this.zoneInfo2 = param2
    },
    debug() {
      console.log(this.zoneInfo1, this.zoneInfo2)
    }
  }
};
</script>

