<template>
  <div>

    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <el-button class="el-icon-back" style="position:absolute; left: 10px; top: 5px" circle type="info"
                 @click="goHome">

      </el-button>
    </nav>
    <div style="margin: 20px auto 20px auto; width: 1000px;">
      <div class="left">
        <el-avatar :src="userImg" :size="300" fit="cover">
        </el-avatar>
        <div style="margin-top: 20px; text-align: left;">
          <el-card class="box-card" style="padding: 0px 15px" v-model="userForm">
            <div slot="header" class="clearfix">
              <span>{{ userForm.userName }}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="editUserInfo">编辑信息</el-button>
            </div>
            <div class="text item">
              <span>关注数：</span>
              <span>{{ userForm.followingNum }}</span>
            </div>
            <div class="text item">
              <span>粉丝数：</span>
              <span>{{ userForm.followedNum }}</span>
            </div>
            <div class="text item">
              <span>发贴数：</span>
              <span>30</span>
            </div>
            <div class="text item">
              <span>获得点赞数：</span>
              <span>302</span>
            </div>
          </el-card>
        </div>
      </div>
      <div class="right">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-user-solid"></i> 我的关注</span>
            <div class="postList">
              <el-scrollbar> <!-- 滚动条 -->
                <div v-for="(post) in 5" :key="post.postId" class="postItem">
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover">
                      <div class="clearfix" style="text-align: left">
                        <span class="postNum">{{ post }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span style="margin-left: 15px">{{ post }}</span>
                      </div>
                    </el-card>
                  </transition>
                </div>
              </el-scrollbar><!-- /滚动条 -->
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-star-on"></i> 我的收藏</span>
            <div class="postList">
              <el-scrollbar> <!-- 滚动条 -->
                <div v-for="(post) in 20" :key="post.postId" class="postItem">
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover">
                      <div class="clearfix" style="text-align: left">
                        <span class="postNum">{{ post }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span style="margin-left: 15px">{{ post }}</span>
                      </div>
                    </el-card>
                  </transition>
                </div>
              </el-scrollbar><!-- /滚动条 -->
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-zoom-in"></i> 关注的分区</span>
            <div class="postList">
              <el-scrollbar> <!-- 滚动条 -->
                <div v-for="(post) in 20" :key="post.postId" class="postItem">
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover">
                      <div class="clearfix" style="text-align: left">
                        <span class="postNum">{{ post }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span style="margin-left: 15px">{{ post }}</span>
                      </div>
                    </el-card>
                  </transition>
                </div>
              </el-scrollbar><!-- /滚动条 -->
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-s-promotion"></i> 我的发帖</span>
            <div class="postList">
              <el-scrollbar> <!-- 滚动条 -->
                <div v-for="(post) in 20" :key="post.postId" class="postItem">
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover">
                      <div class="clearfix" style="text-align: left">
                        <span class="postNum">{{ post }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span style="margin-left: 15px">{{ post }}</span>
                      </div>
                    </el-card>
                  </transition>
                </div>
              </el-scrollbar><!-- /滚动条 -->
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-edit"></i> 我的评论</span>
            <div class="postList">
              <el-scrollbar> <!-- 滚动条 -->
                <div v-for="(post) in 20" :key="post.postId" class="postItem">
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover">
                      <div class="clearfix" style="text-align: left">
                        <span class="postNum">{{ post }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span style="margin-left: 15px">{{ post }}</span>
                      </div>
                    </el-card>
                  </transition>
                </div>
              </el-scrollbar><!-- /滚动条 -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog
        title="编辑信息"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <el-form :model="userForm" label-position="left" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName">
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userForm.user_gender" placeholder="请选择性别" style="width: 100%">
            <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.userEmail" :disabled="emailTrigger">
            <template slot="append">
              <el-button icon="el-icon-edit">
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userForm.userTel" :disabled="telTrigger">
            <template slot="append">
              <el-button icon="el-icon-edit">
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="modifyUser">确认修改</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
import {getUserImg, getUserInfo, getInfoNeedAuth, getRelationInfo, modifyUserInfo} from "@/api/UserInfo"

export default {
  name: "MyUserHome",
  data() {
    return {
      userImg: "",
      dialogVisible: false,
      telTrigger: true,

      emailTrigger: true,
      userForm: {
        userId: 1,
        userName: "xzb",
        user_gender: "男",
        userEmail: "333@qq.com",
        userTel: "42343255",
        userPwd: "",
        followingNum: "0",
        followedNum: "0",
        likeNum: "0",
        postNum: "0",
      },
      genderOptions: [
        {value: "1", label: "男"},
        {value: "0", label: "女"},
      ]
    }
  },
  created() {
    getUserImg(1950072).then(
        res => {
          console.log(res.data.data)
          // this.userImg = "https://tfor.obs.cn-east-3.myhuaweicloud.com/profile/2?AccessKeyId=JDOPVQVKTYEJUXZXODLK&Expires=1640487882&Signature=PbRFpQULBBx0WZnsRa21BdGhYLI%3D"
          this.userImg = res.data.data
        }
    )
    getUserInfo(1).then(
        res => {
          // console.log(res);
          res
        }
    )

    // 获取用户基本信息
    getInfoNeedAuth(1).then(
        res => {
          let userdata = res.data.data
          this.userForm.userName = userdata.userName
          if (userdata.userGender === 1) {
            this.userForm.user_gender = "男"
          } else this.userForm.user_gender = "女"
          this.userForm.userEmail = userdata.userEmail
          this.userForm.userTel = userdata.userTel
        }
    )
    // 获取用户的点赞被关注信息
    getRelationInfo(1).then(
        res => {
          let userdata = res.data.data
          this.userForm.followingNum = userdata.followingNum
          this.userForm.followedNum = userdata.followedNum
          this.userForm.likeNum = userdata.likeNum
          this.userForm.postNum = userdata.postNum
        }
    )


  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    editUserInfo() {
      this.dialogVisible = true;
    },
    async modifyUser() {

      let userInfo = JSON.stringify({
        uid: this.userForm.userId,
        userName: this.userForm.userName,
        // "userGender": this.userForm.user_gender == "男" ? 1 : 0,
      })
      console.log(userInfo)
      await modifyUserInfo(userInfo).then(
          res => {
            console.log(res)
          }
      )
      // this.dialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {
          });
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
  /*background-color: orange;*/
  margin-left: 340px;
  /*height: 300px;*/
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

el-tabs {
  max-height: 900px;
}

.el-scrollbar {
  height: 600px;
}

/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}

/deep/ .el-input__inner {
  /*width: 80%;*/
  /*margin-left: 0px;*/
}

/*.el-scrollbar {*/
/*  margin-right: 10px;*/
/*}*/
</style>