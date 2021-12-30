<template>
  <div>
    <div class="postList">
      <el-scrollbar style="height: 600px">
        <div v-for="(post,index) in this.postInfo" :key="post.postId" class="postItem">
          <transition name="el-zoom-in-center">
            <el-card shadow="hover" v-show="postShow" @click.native="showPost(post.postId)">
              <div class="clearfix" style="text-align: left">
                <span class="postNum">{{ post.userId }}</span>
                <el-divider direction="vertical"></el-divider>
                <span style="margin-left: 15px">{{ post.postTitle }}</span>

                <el-button style="float: right; padding: 0px 5px 0 5px; margin: 0" type="text"
                           @click="reportPost(index)">
                  <img :src="reportSrc" style="width: 24px"/>
                </el-button>
                <el-button style="float: right; padding: 0px 5px 0 5px; margin: 0 " type="text"
                           @click="collectPost(index)" v-show="collectindex[index]">
                  <img :src="collectSrc1" style="width: 24px"/>
                </el-button>
                <el-button style="float: right; padding: 0px 5px 0 5px; margin: 0 " type="text"
                           @click="collectPost(index)" v-show="!collectindex[index]">
                  <img :src="collectSrc2" style="width: 24px"/>
                </el-button>
                <el-button style="float: right; padding: 0px 5px 5px 5px; width: 50px" type="text"
                           @click="likePost(index)" v-show="likeindex[index]">
                  <img :src="likeSrc1" style="width: 24px"/>
                  <span class="likeNum">{{ post.likeNum }}</span>
                </el-button>
                <el-button style="float: right; padding: 0px 5px 5px 5px; width: 50px" type="text"
                           @click="likePost(index)" v-show="!likeindex[index]">
                  <img :src="likeSrc2" style="width: 24px"/>
                  <span class="likeNum">{{ post.likeNum }}</span>
                </el-button>
                <span style="float: right;" v-if="post.label != 'Normal'">{{ post.label }} </span>
              </div>
            </el-card>
          </transition>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import {getRankByDay, getRecommandByUserId, getPostByZoneId, getPostBySearch} from "@/api/zoneApi";
import {likePost, collectPost, cancelCollectPost, reportPost, followZone} from "@/api/actionapi";

export default {
  props: {
    zoneInfo1: Number, // 表示分区的类型
    zoneInfo2: Number,
    searchInfo: String,
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    computedInfo1() {
      // if(this.zoneInfo1) {
      //   return this.zoneInfo1
      // }
      return this.zoneInfo1
    },
    // 不能直接使用this.zoneInfo2, 需要使用计算属性
    computedInfo2() {
      return this.zoneInfo2
    },
    computedSearchInfo() {
      return this.searchInfo
    }
  },
  watch: {
    zoneInfo1() {
      this.changePostData();
    },
    zoneInfo2() {
      this.changePostData();
      this.followZoneNoti();
    },
    searchInfo() {
      this.searchInfoChanged();
    }
  },
  data() {
    return {
      postInfo: [],
      postShow: true,
      likeSrc1: require("@/assets/beforeLike.png"),
      likeSrc2: require("@/assets/afterLike.png"),
      collectSrc1: require("@/assets/beforeCollect.png"),
      collectSrc2: require("@/assets/afterCollect.png"),
      reportSrc: require("@/assets/report.png"),
      likeindex: [],
      collectindex: [],
      userId: ""
    };
  },
  async created() {
    // 默认加载热榜3天的帖子列表

    this.userId = window.localStorage.getItem('username')

    await getRankByDay(3).then(
        res => {
          this.postInfo = res.data.data
          for (var i in res.data.data) {
            this.likeindex[i] = true
            this.collectindex[i] = true
          }
        }
    )
    // console.log(this.computedInfo1)
    // console.log(this.computedInfo2)
  },
  methods: {
    async likePost(index) {
      if (this.likeindex[index] == true) {
        this.$set(this.likeindex, index, !this.likeindex[index])
        await likePost(this.postInfo[index].postId).then(
            res => {
              if (res.data.code == 200) {
                this.$notify({
                  title: '点赞成功',
                  message: '感谢您的支持',
                  position: 'top-left',
                  type: 'success'
                });
              }
            }
        )
        this.postInfo[index].likeNum++
      }
    },
    async collectPost(index) {
      if (this.collectindex[index] == true) {
        this.$set(this.collectindex, index, !this.collectindex[index])
        let data = {
          contentId: this.postInfo[index].postId,
          userId: this.userId,
        }
        await collectPost(data).then(
            res => {
              if (res.data.code == 200) {
                this.$notify({
                  title: '收藏成功',
                  position: 'top-left',
                  type: 'success'
                });
              }
            }
        )
      } else {
        this.$set(this.collectindex, index, !this.collectindex[index])
        await cancelCollectPost(this.userId, this.postInfo[index].postId).then(
            res => {
              if (res.data.code == 200) {
                this.$notify({
                  title: '取消收藏',
                  position: 'top-left',
                  type: 'info'
                });
              }
            }
        )
      }
    },
    async reportPost(index) {
      await reportPost(this.postInfo[index].postId).then(
          res => {
            if (res.data.code == 200) {
              this.$notify({
                title: '举报成功',
                position: 'top-left',
                type: 'warning'
              });
            }
          }
      )
    },
    showpost() {
      this.postShow = true;
    },
    async searchInfoChanged() {
      // console.log(this.computedSearchInfo)
      this.postShow = false
      this.likeindex.splice(0) // 清空标记数组
      await getPostBySearch(this.computedSearchInfo).then(
          res => {
            this.postInfo = []
            for (var i in res.data.data) {
              this.postInfo.push(res.data.data[i])
              this.likeindex[i] = true
              this.collectindex[i] = true
            }
          }
      )
      this.postShow = true
    },
    async changePostData() {
      this.postShow = false
      this.likeindex.splice(0)
      if (this.computedInfo1 == 1) {
        console.log("推荐")
        await getRecommandByUserId(this.userId).then(
            res => {
              console.log(res.data)
              this.postInfo = []
              for (var i in res.data.data) {
                this.postInfo.push(res.data.data[i])
                this.likeindex[i] = true
                this.collectindex[i] = true
              }
            }
        )
      } else if (this.computedInfo1 == 2) {
        console.log(this.computedInfo2)
        await getRankByDay(this.computedInfo2).then(
            res => {
              this.postInfo = []
              for (var i in res.data.data) {
                this.postInfo.push(res.data.data[i])
                this.likeindex[i] = true
                this.collectindex[i] = true
              }
            }
        )
      } else {
        await getPostByZoneId(this.computedInfo2).then(
            res => {
              this.postInfo = []
              console.log(res.data)
              for (var i in res.data) {
                this.postInfo.push(res.data[i])
                this.likeindex[i] = true
                this.collectindex[i] = true
              }
            }
        )
      }
      this.showpost()
    },
    followZoneNoti() {
      if (this.computedInfo1 == 3) {
        const h = this.$createElement
        this.$notify({
          title: '      ',
          message: h('p', null, [
            h('el-button', {
              on: {click: this.followZone},
              style: {float: "right"},
              attrs: {
                size: "medium",
                type: "primary"
              },
            }, '关注该分区'),
          ]),
          offset: 100,
          button: this.showpost(),
        });
      }
    },
    async followZone() {
      let data = {
        userId: this.userId,
        zoneId: this.computedInfo2,
      }
      await followZone(data).then(
          res => {
            if (res.data.code == 200) {
              this.$message({
                message: '关注成功',
                type: 'success',
                duration: 1000,
              });
            }
          }
      )
    },
    showPost(postId) {
      // console.log(postId)
      this.$router.push({
        path: `/PostDetails`,
        query: {contentId: postId},
      })
    }
  },

};

</script>

<style scoped>
.title {
  text-align: left;
}

.subtitle {
  text-align: right;
}

.postList {
  /*height: 800px;*/
}

.postItem {
  padding-top: 10px;
}

.postNum {
  float: left;
  min-width: 80px;
  margin-inline: 10px;
  font-size: 1.2em;
  font-family: 'Arial Black', arial-black, 'Helvetica Black', helvetica-black, Sans-serif;
  opacity: 0.7;
}

.likeNum {
  color: #CE5A5A;
}

/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

</style>