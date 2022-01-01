<template>
  <div>
    <el-card
      v-for="(post, index) in this.contentlist"
      :key="post.contentId"
      class="contentCard"
    >
      <div class="clearfix" style="text-align: left;float:left">
        <span class="postTag">用户id:{{ post.userId }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="postTag" style="margin-left: 15px"
          >标题:{{ post.postTitle }}</span
        >
        <el-divider direction="vertical"></el-divider>
        <span class="postTag" style="margin-left: 15px"
          >举报数量:{{ post.reportNum }}</span
        >
        <el-divider direction="vertical"></el-divider>
        <span class="postTag" style="margin-left: 15px"
          >审核状态:{{ post.reviewState }}</span
        >
      </div>

      <el-button
        type="primary"
        @click="check(post.contentId)"
        size="medium"
        style="float:right;margin-left:10px"
      >
        check
      </el-button>
      <el-button
        type="primary"
        @click="setState(post.contentId, value[index])"
        size="medium"
        style="float:right;"
      >
        set
      </el-button>
      <!--      <el-button type="primary" @click="setNotnormal(post.contentId)" size="medium"-->
      <!--                 style="float:right; margin-right: 5px;">UnNormal-->
      <!--      </el-button>-->
      <el-select
        v-model="value[index]"
        placeholder="请选择"
        style="width: 100px;float:right;margin-bottom: 10px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contentlist: [],
      reviewPostlist: [],

      options: [
        {
          value: 1,
          label: "Normal"
        },
        {
          value: 2,
          label: "NotNormal"
        },
        {
          value: 3,
          label: "FakeNews"
        },
        {
          value: 4,
          label: "EighteenPlus"
        }
      ],

      value: []
    };
  },
  methods: {
    check(contentId) {
      this.$axios.put();
      //进入具体的帖子页面
      this.$router.push({
        path: `/PostDetails`,
        query: { contentId: contentId }
      });
    },
    //设置帖子标签
    setState(contentId, label) {
      console.log(contentId, label);
      this.$axios.put(
        "http://121.5.137.205:8081/api/admin/setPostLabel?contentId=" +
          contentId +
          "&label=" +
          label
      );
    },
    getdata() {
      this.$axios
        .get("http://121.5.137.205:8081/api/admin/getReportedPostList/0") //目前举报数大于0即返回
        .then(res => {
          this.contentlist = res.data.data;
        });
    }
  },
  created() {
    this.getdata();
  }
};
</script>
<style scoped>
.contentCard {
  width: 1000px;
  height: 60px;
  display: flex;
  margin-left: 16%;
  margin-top: 5px;
  flex-direction: column;
}

.postTag {
  min-width: 80px;
}
</style>
