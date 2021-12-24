<template>
  <div>

    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <el-button class="el-icon-back" style="position:absolute; left: 10px; top: 5px" circle type="info" @click="goHome">

      </el-button>
      </nav>
    <div style="margin: 20px auto 20px auto; width: 1000px;">
      <div class="left">
        <el-avatar :src="require('@/assets/user6.jpg')" :size="300" fit="fill"></el-avatar>
        <div style="margin-top: 20px; text-align: left;">
          <el-card class="box-card" style="padding: 0px 15px">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </div>
      </div>
      <div class="right">

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "MyUserHome",
  methods:{
    goHome(){
      this.$router.push("/");
    },
  },
}
</script>

<style scoped>
.left {
  float: left;
  width: 300px;
  height: 300px;
  /*background-color: red;*/
}
.right {
  background-color: orange;
  margin-left: 310px;
  height: 300px;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 10px;
}

</style>