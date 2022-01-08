<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <el-button
        class="el-icon-back"
        style="position:absolute; left: 10px; top: 5px"
        circle
        type="info"
        @click="goHome"
      >
      </el-button>
    </nav>
    <div style="margin: 20px auto 20px auto; width: 1000px;">
      <div class="left">
        <el-avatar :src="userImg" :size="300" fit="cover" @error="true">
          <img :src="defaultUserImg" />
        </el-avatar>
        <el-button size="mini" round @click="uploadImg" v-show="privateMode">
          上传头像
        </el-button>
        <div style="margin-top: 20px; text-align: left;">
          <el-card
            class="box-card"
            style="padding: 0px 15px"
            v-model="userForm"
          >
            <div slot="header" class="clearfix">
              <span>{{ userForm.userName }}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="editUserInfo"
                v-show="privateMode"
                >编辑信息</el-button
              >
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
              <span>{{ userForm.postNum }}</span>
            </div>
            <div class="text item">
              <span>获得点赞数：</span>
              <span>{{ userForm.likeNum }}</span>
            </div>
          </el-card>
        </div>
      </div>
      <div class="right">
        <el-tabs type="border-card" ref="tabs">
          <el-tab-pane>
            <span slot="label"
              ><i class="el-icon-user-solid"></i> {{ this.followingTile }}</span
            >
            <div class="postList">
              <el-scrollbar>
                <!-- 滚动条 -->
                <div
                  v-for="person in this.followingList"
                  :key="person.userId"
                  class="postItem"
                >
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover" style="margin-top: 15px">
                      <div class="clearfix" style="text-align: left;">
                        <el-row>
                          <el-col :span="3">
                            <span class="postNum">{{ person.userId }}</span>
                          </el-col>
                          <el-col :span="2">
                            <div @click="showDetialInfo(person.userId)">
                              <el-avatar
                                :src="person.userImage"
                                :size="40"
                                fit="cover"
                                @error="true"
                                ><img :src="defaultUserImg"
                              /></el-avatar>
                            </div>
                          </el-col>
                          <el-col :span="1">
                            <i
                              class="el-icon-male"
                              v-if="person.userGender == 1"
                            ></i>
                            <i class="el-icon-female" v-else=""></i>
                          </el-col>
                          <el-col :span="7" :offset="-3">
                            <span style="margin-left: 15px">{{
                              person.userName
                            }}</span>
                          </el-col>
                          <el-button
                            style="float: right"
                            @click="cancelFollow(person.userId)"
                            v-show="privateMode"
                          >
                            取消关注
                          </el-button>
                        </el-row>
                      </div>
                    </el-card>
                  </transition>
                </div> </el-scrollbar
              ><!-- /滚动条 -->
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-star-on"></i> 我的收藏</span>
            <div class="postList">
              <el-scrollbar>
                <!-- 滚动条 -->
                <div
                  v-for="post in this.collectionList"
                  :key="post.contentId"
                  class="postItem"
                >
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover" style="margin-top: 5px">
                      <div class="clearfix" style="text-align: left">
                        <span class="postNum">{{ post.contentId }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <div
                          @click="showPostDetail(post.contentId)"
                          style="display: inline;cursor: pointer"
                        >
                          <span style="margin-left: 15px">{{
                            post.postTitle
                          }}</span>
                        </div>
                        <el-button
                          style="float: right;padding-top: 5px;padding-bottom: 5px"
                          size="small"
                          icon="el-icon-delete"
                          @click="cancelCollect(post.contentId)"
                        >
                        </el-button>
                      </div>
                    </el-card>
                  </transition>
                </div> </el-scrollbar
              ><!-- /滚动条 -->
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-zoom-in"></i> 关注的分区</span>
            <div class="postList">
              <el-scrollbar>
                <!-- 滚动条 -->
                <div
                  v-for="zone in this.zoneList"
                  :key="zone.zoneId"
                  class="postItem"
                >
                  <transition name="el-zoom-in-center">
                    <el-card
                      class="box-card"
                      style="text-align: left; width:60%; margin-inline: 10%;margin-top: 20px;padding: 0px 15px"
                    >
                      <div slot="header" class="clearfix">
                        <span>{{ zone.zoneName }}</span>
                        <el-button
                          style="float: right; padding: 3px 0"
                          type="text"
                          @click="cancelFollowZ(zone.zoneId)"
                        >
                          取消关注
                        </el-button>
                      </div>
                      <!--                      <div class="text item">-->
                      <!--                        帖子数量：{{ zone.postNum }}-->
                      <!--                      </div>-->
                      <!--                      <div class="text item">-->
                      <!--                        关注人数：{{ zone.postNum }}-->
                      <!--                      </div>-->
                    </el-card>
                  </transition>
                </div> </el-scrollbar
              ><!-- /滚动条 -->
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"
              ><i class="el-icon-s-promotion"></i>{{ this.postTile }}</span
            >
            <div class="postList">
              <el-scrollbar>
                <!-- 滚动条 -->
                <div
                  v-for="post in this.writePostList"
                  :key="post.contentId"
                  class="postItem"
                >
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover" style="margin-top: 5px">
                      <div class="clearfix" style="text-align: left">
                        <span class="postNum">{{ post.contentId }}</span>
                        <el-divider direction="vertical"></el-divider>
                        <div
                          @click="showPostDetail(post.contentId)"
                          style="display: inline;cursor: pointer"
                        >
                          <span style="margin-left: 15px">{{
                            post.postTitle
                          }}</span>
                        </div>
                        <el-button
                          style="float: right;padding-top: 5px;padding-bottom: 5px"
                          size="small"
                          icon="el-icon-delete"
                          @click="delePost(post.contentId)"
                          v-show="privateMode"
                        >
                        </el-button>
                      </div>
                    </el-card>
                  </transition>
                </div> </el-scrollbar
              ><!-- /滚动条 -->
            </div>
          </el-tab-pane>
          <!--          <el-tab-pane>-->
          <!--            <span slot="label"><i class="el-icon-edit"></i> 我的评论</span>-->
          <!--            <div class="postList">-->
          <!--              <el-scrollbar> &lt;!&ndash; 滚动条 &ndash;&gt;-->
          <!--                <div v-for="(post) in 20" :key="post.postId" class="postItem">-->
          <!--                  <transition name="el-zoom-in-center">-->
          <!--                    <el-card shadow="hover">-->
          <!--                      <div class="clearfix" style="text-align: left">-->
          <!--                        <span class="postNum">{{ post }}</span>-->
          <!--                        <el-divider direction="vertical"></el-divider>-->
          <!--                        <span style="margin-left: 15px">{{ post }}</span>-->
          <!--                      </div>-->
          <!--                    </el-card>-->
          <!--                  </transition>-->
          <!--                </div>-->
          <!--              </el-scrollbar>&lt;!&ndash; /滚动条 &ndash;&gt;-->
          <!--            </div>-->
          <!--          </el-tab-pane>-->
        </el-tabs>
      </div>
    </div>

    <el-dialog
      title="编辑信息"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :model="userForm" label-position="left" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName"> </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="userForm.user_gender"
            placeholder="请选择性别"
            style="width: 100%"
          >
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.userEmail" :disabled="emailTrigger">
            <template slot="append">
              <el-button icon="el-icon-edit" @click="modifyEmail"> </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userForm.userTel" :disabled="telTrigger">
            <template slot="append">
              <el-button icon="el-icon-edit" @click="modifyTel"> </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="modifyUser">确认修改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑邮箱"
      :visible.sync="dialogEmailVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="userForm" label-position="left" label-width="100px">
        <el-form-item label="验证码">
          <el-input v-model="verifycode1" placeholder="请输入收到的验证码">
          </el-input>
        </el-form-item>
        <el-form-item label="新的邮箱">
          <el-input v-model="newEmail" placeholder="邮箱地址"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEmailVisible = false">取消</el-button>
        <el-button type="primary" @click="commitModifyEmail"
          >确认修改</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="编辑电话"
      :visible.sync="dialogTelVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="userForm" label-position="left" label-width="100px">
        <el-form-item label="验证码">
          <el-input v-model="verifycode2" placeholder="请输入收到的验证码">
          </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="newTel" placeholder="电话号码"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTelVisible = false">取消</el-button>
        <el-button type="primary" @click="commitModifyTel">确认修改</el-button>
      </span>
    </el-dialog>

    <el-dialog title="上传头像" :visible.sync="uploadVisble" width="40%">
      <div>
        <form
          action="https://tfor.obs.cn-east-3.myhuaweicloud.com"
          method="post"
          enctype="multipart/form-data"
        >
          <!-- Object name -->
          <input type="hidden" name="key" v-model="this.uploadForm.filePath" />

          <!-- Object ACL -->
          <input type="hidden" name="x-obs-acl" value="public-read" />

          <!-- Object MIME type -->
          <!-- <input type="text" name="content-type" value="text/plain" /> -->
          <input
            type="hidden"
            name="content-type"
            value="multipart/form-data"
          />

          <!-- Base64 code of the policy -->
          <input type="hidden" name="policy" v-model="this.uploadForm.policy" />
          <!-- AK+Short date+Region+/s3/aws4_request -->
          <input
            type="hidden"
            name="AccessKeyId"
            v-model="this.uploadForm.accessKey"
          />
          <!-- Signature information -->
          <input
            type="hidden"
            name="signature"
            v-model="this.uploadForm.signature"
          />
          <el-card shadow="never">
            <input name="file" type="file" />
          </el-card>
          <el-input
            name="submit"
            value="Upload"
            type="submit"
            @click.native="uploadBtn"
            style="margin-top: 20px;"
          />
        </form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadVisble = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserInfo,
  getInfoNeedAuth,
  getRelationInfo,
  modifyUserInfo,
  getVerifyCodeE,
  getVerifyCodeT,
  changePhoneNbr,
  changeEmail,
  getFollowingList,
  getCollectionList,
  getFollowingZoneList,
  getPostList
} from "@/api/UserInfo";
import { getUploadAuth, getUserImg } from "@/api/obsApi";
// eslint-disable-next-line no-unused-vars
import {
  cancelFollowUser,
  cancelCollectPost,
  cancelFollowZone
} from "@/api/actionapi";
import { deleteContent } from "@/api/postApi";

export default {
  name: "MyUserHome",
  computed: {
    followingTile() {
      if (this.privateMode == true) {
        return " 我的关注";
      } else {
        return (this.userForm.user_gender === "女" ? " 她" : " 他") + "的关注";
      }
    },
    postTile() {
      if (this.privateMode == true) {
        return " 我的发帖";
      } else {
        return (this.userForm.user_gender === "女" ? " 她" : " 他") + "的发帖";
      }
    },
    intUserGender() {
      return this.userForm.user_gender === "女" ? 0 : 1;
    }
  },
  data() {
    return {
      privateMode: false,
      userImg: "",
      defaultUserImg: require("@/assets/defaultImg.jpg"),
      dialogVisible: false,

      emailTrigger: true,
      dialogEmailVisible: false,
      verifycode1: "",
      newEmail: "",

      telTrigger: true,
      dialogTelVisible: false,
      verifycode2: "",
      newTel: "",

      // 用户信息表
      userForm: {
        userId: 2,
        userName: "null",
        user_gender: "",
        userEmail: "null.com",
        userTel: "000000",
        userPwd: "",
        followingNum: "0",
        followedNum: "0",
        likeNum: "0",
        postNum: "0"
      },
      genderOptions: [
        { value: "男", label: "男" },
        { value: "女", label: "女" }
      ],
      uploadVisble: false,
      // 上传相关信息
      uploadForm: {
        filePath: "",
        accessKey: "",
        signature: "",
        requestURL: "",
        policy: ""
      },
      followingList: [{ userid: "", userName: "default", userGender: "" }],
      collectionList: [],
      zoneList: [],
      writePostList: []
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    // 需要使用这种方法来控制标签页的隐藏
    this.$nextTick(() => {
      if (this.privateMode == false) {
        this.$refs.tabs.$children[0].$refs.tabs[1].style.display = "none";
        this.$refs.tabs.$children[0].$refs.tabs[2].style.display = "none";
      }
    });
  },
  methods: {
    async getData() {
      // 判断访问的页面的userid是否和登录的userid是否一致
      if (this.$route.query.userId == window.localStorage.getItem("username")) {
        this.privateMode = true; // 访问的是自己的页面
        this.userForm.userId = window.localStorage.getItem("username");
      } else {
        this.privateMode = false; // 访问的是别人的页面
        this.userForm.userId = this.$route.query.userId;
      }

      await getUserImg(this.userForm.userId).then(res => {
        this.userImg = res.data.data;
      });
      await getUserInfo(this.userForm.userId).then(res => {
        // console.log(res);
        res;
      });
      // 获取用户基本信息
      await getInfoNeedAuth(this.userForm.userId).then(res => {
        console.log(res);
        let userdata = res.data.data;
        this.userForm.userName = userdata.userName;
        if (userdata.userGender === 1) {
          this.userForm.user_gender = "男";
        } else this.userForm.user_gender = "女";
        this.userForm.userEmail = userdata.userEmail;
        this.userForm.userTel = userdata.userTel;
      });
      // 获取用户的点赞被关注信息
      await getRelationInfo(this.userForm.userId).then(res => {
        let userdata = res.data.data;
        // console.log(userdata)
        this.userForm.followingNum = userdata.followingNum;
        this.userForm.followedNum = userdata.followedNum;
        this.userForm.likeNum = userdata.likeNum;
        this.userForm.postNum = userdata.postNum;
      });

      // 用户关注列表的信息
      await getFollowingList(this.userForm.userId).then(res => {
        this.followingList = res.data.data;
      });

      for (var i in this.followingList) {
        await getUserImg(this.followingList[i].userId).then(res => {
          this.followingList[i].userImage = res.data.data;
        });
      }

      await getCollectionList(this.userForm.userId).then(res => {
        this.collectionList = res.data.data;
      });
      await getFollowingZoneList(this.userForm.userId).then(res => {
        this.zoneList = res.data.data;
      });
      await getPostList(this.userForm.userId).then(res => {
        this.writePostList = res.data.data;
      });
    },
    goHome() {
      this.$router.push("/");
    },
    editUserInfo() {
      this.dialogVisible = true;
    },
    async modifyUser() {
      let userInfo = {
        uid: this.userForm.userId,
        userName: this.userForm.userName,
        userGender: this.intUserGender
      };
      console.log(userInfo);
      await modifyUserInfo(userInfo).then(res => {
        console.log(res.data.code);
        if (res.data.code == 200) {
          this.$notify({
            title: "成功",
            message: "修改个人信息成功",
            type: "success"
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: "请稍后再尝试"
          });
        }
      });
      this.dialogVisible = false;
    },
    async modifyEmail() {
      this.dialogVisible = false;
      let userEmail = this.userForm.userEmail.replace(/@/g, "%40");
      await getVerifyCodeE(userEmail).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message({
            message: "验证码已发送，请注意查收",
            type: "success"
          });
        }
      });
      await this.doubleAfter2seconds(60); // 暂停函数
      this.dialogEmailVisible = true;
    },
    async commitModifyEmail() {
      let data = {
        uid: this.userForm.userId,
        email: this.newEmail,
        verifyCode: this.verifycode1
      };
      console.log(data);
      await changeEmail(data).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$notify({
            title: "成功",
            message: "修改邮箱成功",
            type: "success"
          });
          this.userForm.userEmail = this.newEmail;
        } else {
          this.$notify.error({
            title: "错误",
            message: "请稍后再尝试"
          });
        }
      });
      this.dialogEmailVisible = false;
    },
    async modifyTel() {
      this.dialogVisible = false;
      await getVerifyCodeT("+86" + this.userForm.userTel).then(res => {
        console.log(res.data);
        this.$message({
          message: "验证码已发送，请注意查收",
          type: "success"
        });
      });
      await this.doubleAfter2seconds(60); // 暂停函数
      this.dialogTelVisible = true;
    },
    async commitModifyTel() {
      let data = {
        uid: this.userForm.userId,
        telNum: this.newTel,
        verifyCode: this.verifycode2
      };
      // 19946254492
      console.log(data);
      await changePhoneNbr(data).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$notify({
            title: "成功",
            message: "修改电话成功",
            type: "success"
          });
          this.userForm.userTel = this.newTel;
        } else {
          this.$notify.error({
            title: "错误",
            message: "请稍后再尝试"
          });
        }
      });
      this.dialogTelVisible = false;
    },
    async uploadImg() {
      await getUploadAuth().then(res => {
        this.uploadForm.filePath = "profile/" + this.userForm.userId;
        this.uploadForm.accessKey = res.data.data.accessKey;
        this.uploadForm.signature = res.data.data.signature;
        this.uploadForm.policy = res.data.data.policy;
      });
      this.uploadVisble = true;
    },
    uploadBtn() {
      this.uploadVisble = false;
      this.$router.go(0);
    },
    async cancelFollow(followId) {
      await cancelFollowUser(this.userForm.userId, followId).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "取关成功",
            type: "info"
          });
        }
      });
    },
    async cancelCollect(postId) {
      await cancelCollectPost(this.userForm.userId, postId).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "取消收藏成功",
            type: "info"
          });
        }
      });
    },
    async cancelFollowZ(zoneId) {
      await cancelFollowZone(this.userForm.userId, zoneId).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "取消关注成功",
            type: "info"
          });
        }
      });
    },
    async delePost(contentId) {
      await deleteContent(contentId).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "删除成功",
            type: "info"
          });
        }
      });
    },
    showDetialInfo(userId) {
      this.$router.push({
        path: `/userhome`,
        query: { userId: userId }
      });
      this.$router.go(0);
    },
    showPostDetail(postId) {
      this.$router.push({
        path: `/PostDetails`,
        query: { contentId: postId }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        // eslint-disable-next-line no-unused-vars
        .then(_ => {
          done();
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_ => {});
    },
    doubleAfter2seconds(num) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(2 * num);
        }, 2000);
      });
    },
    debug() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
    }
  }
};
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

/deep/ .el-card__body {
  padding: 10px;
}

/deep/ input#file-load-button {
  background: #0d0d0d;
}
</style>
