<template>
  <div>
<el-row>
<el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row :gutter="20" >
<el-col :span="12" style="margin-left: 250px">
  <div class="grid-content bg-purple" >
    <el-card>
      <div style="text-align: left">
       <span style="margin-left: 0px;font-size:28px;font-weight: bolder">{{this.title}}</span>&nbsp;
        <span>50评论/ 50点赞/ 500浏览</span>
        <el-divider></el-divider>
      </div>

      <el-card style="background: #e2e2e2">
          <img :src="this.userImage" height="70" width="70" style="float: left">
          <div style="float: left">
            <span style="font-size:24px;color: #2d8cf0">{{this.posterName}} &nbsp;</span>
            <span style="font-size: 18px">2001-01-21</span>
          </div><br><br><br><br>
         <p style="text-align: left">
           {{this.postInfo.text}}
         </p>
        <img src="https://img2.baidu.com/it/u=2244323656,2206897366&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=326">
        <div style="float: bottom">
          <el-button style="font-size: 16px" type="text" class="el-icon-s-opportunity" @click="likePostI">点赞</el-button>({{this.postInfo.likeNum}})
          <el-button style="font-size: 16px" type="text" class="el-icon-tickets">评论</el-button>({{this.postInfo.commentNum}})
          <el-button style="font-size: 16px" type="text" class="el-icon-star-off" @click="collectPostI">收藏</el-button>
          <el-button style="font-size: 16px" type="text" class="el-icon-warning-outline" @click="reportDialogVisible=true">举报</el-button>({{this.postInfo.reportNum}})
        </div>
      </el-card><br>

      <el-dialog title="举报帖子" :visible="reportDialogVisible" style="width: 1000px">
         <el-button type="text" @click="reportDialogVisible=false" style="float: right">关闭</el-button>
        <el-checkbox-group v-model="reportList">
          <el-checkbox label="1">敏感词汇</el-checkbox>
          <el-checkbox label="2">攻击、侮辱他人人格</el-checkbox><br>
          <el-checkbox label="3">传谣造谣</el-checkbox>
          <el-checkbox label="4" >用语不文明</el-checkbox>
          <el-checkbox label="5" >其他</el-checkbox><br>
        </el-checkbox-group>
        <el-input style="width: 300px" placeholder="请输入其他举报理由"></el-input>
        <el-button @click="reportPostI">提交举报</el-button>
      </el-dialog>

      <el-card style="text-align: left">
         <span style="font-size: 15px">高赞评论</span>
        <el-divider></el-divider>
      </el-card><br>

      <el-card style="text-align: left">
        <span style="font-size: 15px">全部评论</span>
        <el-divider></el-divider>
      </el-card><br>

      <el-card style="text-align: left">
        <span style="font-size: 15px">发表评论</span>
        <el-divider></el-divider>
      </el-card>
    </el-card>
  </div>
</el-col>
<el-col :span="7">
  <div class="grid-content bg-purple-light">
    <el-row>
       <el-card style="text-align: left">
         <span>广告招商</span>
       </el-card>
    </el-row><br>
    <el-row>
      <el-card style="text-align: left">
        <span>校园热搜热帖</span>
      </el-card>
    </el-row>
  </div>
</el-col>
</el-row>

  </div>
</template>

<script>
import {getbyPostId, getRankByDay} from "../../api/zoneApi";
import {likePost,collectPost,reportPost} from "../../api/actionapi";
export default {
  name: "PostDetails",
  data(){
    return{
      title:"标题",
      commentNum:60,
      posterName:"XZB",
      likeNum:20,
      browserNum:"",
      userImage:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F835b18517ae5b7a2aeea97b1ea9d25938914b5fc.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642906832&t=a2046029eaae51ec5bc6173b8e883bab",
      postTime:"",
      postID:37,

      reportDialogVisible:false,

      reportList:[],

      postInfo:{},
      hotPosts:{}
    }
  },
  methods:{
    reFresh(){
      getbyPostId(this.postID).then(
          res=>{
            this.postInfo=res.data.data;
            console.log(this.postInfo)
          }
      );
    },
    likePostI(){
      likePost(this.postID);
      this.reFresh()
    },
    collectPostI(){
      collectPost(this.postID);
      this.reFresh()
    },
    reportPostI() {
      reportPost(this.postID);
      this.reFresh()
    }
  },
  created() {
    getbyPostId(this.postID).then(
        res=>{
          this.postInfo=res.data.data;
          console.log(this.postInfo)
        }
    );
    getRankByDay(10).then(
        res=>{
          this.hotPosts=res.data
          console.log(res.data.data)
        }
    )
  }
}
</script>

<style scoped>
.bg-purple-dark {
  background: #bf99ad;
}
.bg-purple {
  background: #1979e3;
}
.bg-purple-light {
  background: #70ac0f;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
