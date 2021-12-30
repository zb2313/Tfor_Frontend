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
        <el-button type="primary" @click="check" size="medium" style="float:right;margin-right:10px">check</el-button>
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
        check(){
            //进入具体的帖子页面
            
        },
        // 设置帖子是不是normal，得到所有状态是review 的帖子
        getifnormal(){
            this.$axios
            .get('http://121.5.137.205:8081/api/admin/getReviewedPostList')
            .then((res)=>{
                this.reviewPostlist=res.data.data
            })
        },
        //设置帖子标签
        setifnormal(){
            this.$axios
            .put('http://121.5.137.205:8081/api/admin/setPostLabel')//记得加上label和contentid参数,label为数字1、2
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
    width:800px;
    height:60px;
    display: flex;
    margin-left: 20%;
    margin-top:5px;
    flex-direction: column;
}
.postTag{
    min-width:80px;
}
</style>
