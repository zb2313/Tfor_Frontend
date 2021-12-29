<template xmlns:el-col="http://www.w3.org/1999/html">
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
        <el-button size="mini" round @click="uploadImg">
          上传头像
        </el-button>
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
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-user-solid"></i> 我的关注</span>
            <div class="postList">
              <el-scrollbar> <!-- 滚动条 -->
                <div v-for="(post) in 5" :key="post.postId" class="postItem">
                  <transition name="el-zoom-in-center">
                    <el-card shadow="hover" style="margin-top: 15px">
                      <div class="clearfix" style="text-align: left;">
                        <el-row>
                          <el-col :span="1">
                            <span class="postNum">{{ post }}</span>
                          </el-col>
                          <el-col :span="2">
                            <el-avatar :src="userImg" :size="40" fit="cover"></el-avatar>
                          </el-col>
                          <el-col :span="3" :offset="-3">
                            <span style="margin-left: 15px">用户名</span>
                          </el-col>
                        </el-row>
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
              <el-button icon="el-icon-edit" @click="modifyEmail">
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userForm.userTel" :disabled="telTrigger">
            <template slot="append">
              <el-button icon="el-icon-edit" @click="modifyTel">
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


    <el-dialog
        title="编辑邮箱"
        :visible.sync="dialogEmailVisible"
        width="30%"
        :before-close="handleClose">
      <el-form :model="userForm" label-position="left" label-width="100px">
        <el-form-item label="验证码">
          <el-input v-model="verifycode1" placeholder="请输入收到的验证码">
          </el-input>
        </el-form-item>
        <el-form-item label="新的邮箱">
          <el-input v-model="newEmail" placeholder="邮箱地址">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogEmailVisible = false">取消</el-button>
    <el-button type="primary" @click="commitModifyEmail">确认修改</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="编辑电话"
        :visible.sync="dialogTelVisible"
        width="30%"
        :before-close="handleClose">
      <el-form :model="userForm" label-position="left" label-width="100px">
        <el-form-item label="验证码">
          <el-input v-model="verifycode2" placeholder="请输入收到的验证码">
          </el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="newTel" placeholder="电话号码">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTelVisible = false">取消</el-button>
    <el-button type="primary" @click="commitModifyTel">确认修改</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="uploadVisble"
        width="40%">
      <div>
        <form action="https://tfor.obs.cn-east-3.myhuaweicloud.com" method="post" enctype="multipart/form-data">
          <!-- Object name -->
          <input type="hidden" name="key" v-model="this.uploadForm.filePath"/>


          <!-- Object ACL -->
          <input type="hidden" name="x-obs-acl" value="public-read"/>

          <!-- Object MIME type -->
          <!-- <input type="text" name="content-type" value="text/plain" /> -->
          <input type="hidden" name="content-type" value="multipart/form-data"/>

          <!-- Base64 code of the policy -->
          <input type="hidden" name="policy"
                 v-model="this.uploadForm.policy"/>
          <!-- AK+Short date+Region+/s3/aws4_request -->
          <input type="hidden" name="AccessKeyId" v-model="this.uploadForm.accessKey"/>
          <!-- Signature information -->
          <input type="hidden" name="signature" v-model="this.uploadForm.signature"/>


          <input name="file" type="file"/>
          <input name="submit" value="Upload" type="submit"/>
        </form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="uploadVisble = false">取 消</el-button>
  </span>
    </el-dialog>


  </div>

</template>

<script>
import {
  getUserImg,
  getUserInfo,
  getInfoNeedAuth,
  getRelationInfo,
  modifyUserInfo,
  getVerifyCodeE,
  getVerifyCodeT,
  changePhoneNbr,
  changeEmail,
} from "@/api/UserInfo"
import {getUploadAuth} from "@/api/obsApi"

export default {
  name: "MyUserHome",
  data() {
    return {
      userImg: "",
      dialogVisible: false,

      emailTrigger: true,
      dialogEmailVisible: false,
      verifycode1: "",
      newEmail: "",

      telTrigger: true,
      dialogTelVisible: false,
      verifycode2: "",
      newTel: "",

      userForm: {
        userId: 2,
        userName: "xzb",
        user_gender: "",
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
      ],
      uploadVisble: false,
      uploadForm: {
        filePath: "",
        accessKey: "",
        signature: "",
        requestURL: "",
        policy: "",
      },

      
    }
  },
  created() {

    getUserImg(this.userForm.userId).then(
        res => {
          // console.log(res.data.data)
          // this.userImg = "https://tfor.obs.cn-east-3.myhuaweicloud.com/profile/2?AccessKeyId=JDOPVQVKTYEJUXZXODLK&Expires=1640859251&Signature=bP5opbdkunPkuLQIFukrb0GG/UU%3D"
          this.userImg = res.data.data
        }
    )
    getUserInfo(this.userForm.userId).then(
        res => {
          // console.log(res);
          res
        }
    )

    // 获取用户基本信息
    getInfoNeedAuth(this.userForm.userId).then(
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
    getRelationInfo(this.userForm.userId).then(
        res => {
          let userdata = res.data.data
          // console.log(userdata)
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
      let userInfo = {
        uid: this.userForm.userId,
        userName: this.userForm.userName,
        userGender: this.userForm.user_gender
      }
      await modifyUserInfo(userInfo).then(
          res => {
            console.log(res.data.code)
            if (res.data.code == 200) {
              this.$notify({
                title: '成功',
                message: '修改个人信息成功',
                type: 'success'
              });
            } else {
              this.$notify.error({
                title: '错误',
                message: '请稍后再尝试'
              });
            }
          }
      )
      this.dialogVisible = false
    },
    async modifyEmail() {
      this.dialogVisible = false
      let userEmail = this.userForm.userEmail.replace(/%40/g, '&')
      await getVerifyCodeE(userEmail).then(
          res => {
            console.log(res.data)
            if (res.data.code == 200) {
              this.$message({
                message: '验证码已发送，请注意查收',
                type: 'success'
              });
            }
          }
      )
      await this.doubleAfter2seconds(60); // 暂停函数
      this.dialogEmailVisible = true
    },
    async commitModifyEmail() {
      let data = {
        uid: this.userForm.userId,
        email: this.newEmail,
        verifyCode: this.verifycode1,
      }
      console.log(data)
      await changeEmail(data).then(
          res => {
            console.log(res)
            if (res.data.code == 200) {
              this.$notify({
                title: '成功',
                message: '修改邮箱成功',
                type: 'success'
              });
              this.userForm.userEmail = this.newEmail
            } else {
              this.$notify.error({
                title: '错误',
                message: '请稍后再尝试'
              });
            }
          }
      )
      this.dialogEmailVisible = false
    },
    async modifyTel() {
      this.dialogVisible = false
      await getVerifyCodeT("+86" + this.userForm.userTel).then(
          res => {
            console.log(res.data)
            this.$message({
              message: '验证码已发送，请注意查收',
              type: 'success'
            });
          }
      )
      await this.doubleAfter2seconds(60); // 暂停函数
      this.dialogTelVisible = true
    },
    async commitModifyTel() {
      let data = {
        uid: this.userForm.userId,
        telNum: this.newTel,
        verifyCode: this.verifycode2,
      }
      // 19946254492
      console.log(data)
      await changePhoneNbr(data).then(
          res => {
            console.log(res)
            if (res.data.code == 200) {
              this.$notify({
                title: '成功',
                message: '修改电话成功',
                type: 'success'
              });
              this.userForm.userTel = this.newTel
            } else {
              this.$notify.error({
                title: '错误',
                message: '请稍后再尝试'
              });
            }
          }
      )
      this.dialogTelVisible = false
    },
    async uploadImg() {
      await getUploadAuth().then(
          res => {
            this.uploadForm.filePath = "profile/" + this.userForm.userId
            this.uploadForm.accessKey = res.data.data.accessKey
            this.uploadForm.signature = res.data.data.signature
            this.uploadForm.policy = res.data.data.policy
          }
      )
      console.log(this.uploadForm)
      this.uploadVisble = true;
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
    doubleAfter2seconds(num) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2 * num)
        }, 2000);
      })
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

/deep/ .el-card__body {
  padding: 10px;
}

/*.el-scrollbar {*/
/*  margin-right: 10px;*/
/*}*/
</style>