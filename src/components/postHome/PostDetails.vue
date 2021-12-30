<template>
  <div :style="{
    backgroundImage: 'url(' +
    bcimg
    + ')',
    backgroundSize: 'contain'
  }"
  >
<el-row>
<el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row :gutter="20" >
<el-col :span="12" style="margin-left: 250px">
  <div class="grid-content bg-purple" >
    <el-card>
      <div style="text-align: left">
       <span style="margin-left: 0px;font-size:28px;font-weight: bolder">{{this.postInfo.postTitle}}</span>&nbsp;
        <span>{{this.postInfo.commentNum}}评论/ {{this.postInfo.likeNum}} 点赞/ 500浏览</span>
        <el-button style="float: right" type="text" @click="follow">关注发帖人</el-button>
        <el-divider></el-divider>
      </div>

      <el-card style="background: #e2e2e2">
<!--          <img :src="this.userImage" height="70" width="70" style="float: left">-->
          <el-avatar :src="this.userImage" :size="40" fit="cover" style="float: left"></el-avatar>
          <div style="float: left">
            <span style="font-size:20px;color: #2d8cf0">{{this.postInfo.userId}} &nbsp;</span>
            <span style="font-size: 14px">{{this.postInfo.lastEditTime}}</span>
          </div><br><br><br><br>
         <p style="text-align: left">
           {{this.postInfo.text}}

         </p>
        <ul>
          <li v-for="dt in imgs" :key="dt">
            <img :src="dt" height="200" width="200">
          </li>
        </ul>
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

<!--      <el-card style="text-align: left">-->
<!--         <span style="font-size: 15px">高赞评论</span>-->
<!--        <el-divider></el-divider>-->
<!--      </el-card><br>-->

      <el-card style="text-align: left">
        <span style="font-size: 15px">全部评论</span>
        <el-divider></el-divider>
        <ul>
          <li v-for="dt in comments" :key="dt">
            <el-avatar :src="dt.img"></el-avatar>
            <span style="color: blue">{{dt.name}}</span><br>
            {{dt.text}}<br>
            {{dt.lastEditTime}}<br>
            <el-button style="font-size: 12px" type="text" class="el-icon-s-opportunity" @click="likePostI">点赞</el-button>
            <el-button style="font-size: 12px" type="text" class="el-icon-tickets">评论</el-button>
            <el-divider></el-divider>
          </li>

        </ul>
      </el-card><br>

      <el-card style="text-align: left">
        <span style="font-size: 15px">发表评论</span>
        <el-divider></el-divider>
        <v-comment
        v-bind:fatherId="postID"
        v-bind:userId="postInfo.userId"
        v-bind:fathertype=1></v-comment>
      </el-card>
    </el-card>
  </div>
</el-col>
<el-col :span="7">
  <div class="grid-content bg-purple-light">
    <el-row>
       <el-card style="text-align: left">
         <span>广告招商</span>
         <img src="https://img2.baidu.com/it/u=3349915226,4238223520&fm=26&fmt=auto">
       </el-card>
    </el-row><br>
    <el-row>
      <el-card style="text-align: left">
        <span style="color: red">校园热搜热帖</span>
        <ul>
          <li v-for="dt in hotPosts.data" :key="dt">
            uid:{{dt.userId}}<br>
            {{dt.postTitle}}<br>
            <el-divider></el-divider>
          </li>
        </ul>
      </el-card>
    </el-row>
  </div>
</el-col>
</el-row>

  </div>
</template>

<script>
import vComment from "../writePost/Comment";
import {getbyPostId, getRankByDay,getCommentPost} from "../../api/zoneApi";
import {likePost,collectPost,reportPost} from "../../api/actionapi";
import {getPostImgs} from "../../api/obsApi";
import {getUserImg,getUserInfo} from "../../api/UserInfo";
import {followUser} from "../../api/actionapi";
export default {
  name: "PostDetails",
  components:{
    vComment
  },
  data(){
    return{
      bcimg: require("@/assets/scene.jpg"),

      title:"标题",
      commentNum:60,
      posterName:"XZB",
      likeNum:20,
      browserNum:"",
      userImage:"" ,
      postTime:"",
      postID:"",

      reportDialogVisible:false,

      reportList:[],

      imgs:[],
      commentData:[],
      comments:[],
      postInfo:{},
      hotPosts:{}
    }
  },
  methods:{
    follow()
    {
      followUser(this.postInfo.userId,localStorage.getItem('username'));
      this.$message.success('关注成功')
    },
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
    },
    getCommentImgs(){
      for(let i=0;i<this.comments.length;i++){
        let id=this.comments[i].userId
        getUserImg(id).then(
            res=>{
              this.$set(this.comments[i],'img',res.data.data)
              console.log('co',this.comments[i])
            }
        )
        getUserInfo(id).then(
            res=>{
              this.$set(this.comments[i],'name',res.data.data.userName)
              console.log('co',this.comments[i])
            }
        )
      }
    },

    async getData(){
      localStorage.setItem('fatherid',this.postID)
      await getbyPostId(this.postID).then(
          res=>{
            this.postInfo=res.data.data;
            console.log(this.postInfo)
            getUserImg(this.postInfo.userId).then(
            res=>{
              this.userImage=res.data.data
             // console.log('帖子用户头像',res.data)
            }
            )
          }
      );

      getPostImgs(this.postID).then(
          res=>{

            this.imgs=res.data.data
            console.log('帖子图片',this.imgs)
          }
      )
      getCommentPost(this.postID).then(
          res=>{
            this.comments=res.data.data
            console.log('评论',res.data)
            this.getCommentImgs()
          }
      )

      getRankByDay(5).then(
          res=>{
            this.hotPosts=res.data
            console.log('热帖',res.data.data)
          }
      )

    }
  },
  created() {
    console.log(this.$route.query.contentId)
    this.postID = this.$route.query.contentId
    console.log(this.postID)
    this.getData()


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
