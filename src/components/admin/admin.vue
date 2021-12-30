<template>
<div>
    <el-card v-for="(post) in this.contentlist" :key="post.contentId" class="contentCard">
        <div class="clearfix" style="text-align: left;float:left">
            <span class="postTag">用户id:{{post.userId}}</span>
             <el-divider direction="vertical"></el-divider>
             <span class="postTag" style="margin-left: 15px">标题:{{ post.postTitle }}</span>
             <el-divider direction="vertical"></el-divider>
             <span class="postTag" style="margin-left: 15px">举报数量:{{ post.reportNum }}</span>
             <el-divider direction="vertical"></el-divider>
             <span class="postTag" style="margin-left: 15px">审核状态:{{ post.reviewState }}</span>
        </div>
        <el-button type="primary" @click="check(post.contentId)" size="medium" style="float:right;margin-right:10px">check</el-button>
       <el-button type="primary" @click="setnormal(post.contentId)" size="medium" style="float:right;margin-right: 10px">setNormal</el-button>
    </el-card>
</div>
</template>
<script>
export default {
    data(){
        return{
            contentlist:[],
            reviewPostlist:[]
        }
    },
    methods:{
        check(contentId){
          this.$axios
          .put()
            //进入具体的帖子页面
          this.$router.push({
            path: `/PostDetails`,
            query: {contentId: contentId},
          })
        },
        //设置帖子标签
        setnormal(contentId){
            this.$axios
            .put('http://121.5.137.205:8081/api/admin/setPostLabel?contentId='+contentId+'&label='+1)//记得加上label和contentid参数,label为数字1、2
        },
        getdata(){
            this.$axios
            .get('http://121.5.137.205:8081/api/admin/getReportedPostList/0')//目前举报数大于0即返回
            .then((res)=>{
                this.contentlist=res.data.data
            })

        }
    },
    created(){
        this.getdata()
    }
}
</script>
<style scoped>
.contentCard{
    width:1000px;
    height:60px;
    display: flex;
    margin-left: 16%;
    margin-top:5px;
    flex-direction: column;
}
.postTag{
    min-width:80px;
}
</style>
