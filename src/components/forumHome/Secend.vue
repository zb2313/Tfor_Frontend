<template>
  <div class="postList">
    <div v-for="post in this.postInfo" :key="post.postId" class="postItem">
      <transition name="el-zoom-in-center">
        <el-card shadow="hover" v-show="postShow">
          <div class="clearfix" style="text-align: left">
            <span class="postNum">{{ post.postId }}</span>
            <el-divider direction="vertical"></el-divider>
            <span style="margin-left: 15px">{{ post.postTitle }}</span>

            <el-button style="float: right; padding: 0px 5px 0 5px; margin: 0" type="text" @click="likePost">
              <img src="../../assets/report.png" style="width: 24px"/>
            </el-button>
            <el-button style="float: right; padding: 0px 5px 0 5px; margin: 0 " type="text" @click="likePost">
              <img src="../../assets/beforeCollect.png" style="width: 24px"/>
            </el-button>
            <el-button style="float: right; padding: 0px 5px 5px 5px; width: 50px" type="text" @click="likePost">
              <img src="../../assets/beforeLike.png" style="width: 24px"/>
              <span class="likeNum">{{ post.likeNum }}</span>
            </el-button>
          </div>
        </el-card>
      </transition>
    </div>
  </div>
</template>
<script>
import {getRankByDay, getRecommandByUserId, getPostByZoneId, getPostBySearch} from "@/api/zoneApi";

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
    },
    searchInfo() {
      this.searchInfoChanged();
    }
  },
  data() {
    return {
      postInfo: [],
      postShow: true,
    };
  },
  created() {
    // 默认加载热榜3天的帖子列表
    getRankByDay(3).then(
        res => {
          for (var i in res.data) {
            this.postInfo.push(res.data[i])
          }
        }
    )
    console.log(this.computedInfo1)
    console.log(this.computedInfo2)
  },
  methods: {
    likePost() {
      console.log("like")
      console.log(this.computedSearchInfo)
    },
    showpost() {
      this.postShow = true;
    },
    async searchInfoChanged() {
      // console.log(this.computedSearchInfo)
      this.postShow = false
      await getPostBySearch(this.computedSearchInfo).then(
          res => {
            this.postInfo = []
            for (var i in res.data) {
              this.postInfo.push(res.data[i])
            }
          }
      )

      this.postShow = true
    },
    async changePostData() {
      this.postShow = false

      if (this.computedInfo1 == 1) {
        console.log("推荐")
        let userid = 2 // 这里暂时使用默认值1
        await getRecommandByUserId(userid).then(
            res => {
              console.log(res.data)
              this.postInfo = []
              for (var i in res.data) {
                this.postInfo.push(res.data[i])
              }
            }
        )
      } else if (this.computedInfo1 == 2) {
        console.log("热榜")
        await getRankByDay(this.computedInfo2).then(
            res => {
              this.postInfo = []
              for (var i in res.data) {
                this.postInfo.push(res.data[i])
              }
            }
        )
      } else {
        await getPostByZoneId(this.computedInfo2).then(
            res => {
              this.postInfo = []
              for (var i in res.data) {
                this.postInfo.push(res.data[i])
              }
            }
        )
      }


      this.showpost()
    },
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

.postItem {
  padding-top: 10px;
}

.postNum {
  float: left;
  width: 60px;
  margin-inline: 10px;
  font-size: 1.2em;
  font-family: 'Arial Black', arial-black, 'Helvetica Black', helvetica-black, Sans-serif;
  opacity: 0.7;
}

.likeNum {
  color: #CE5A5A;
}

</style>