<template>
  <div
    class="bgc"
    :style="{
      backgroundImage: 'url(' + coverImgUrl + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <div class="main">
      <div class="dashboard-container">
        <div class="title"><h1>注册</h1></div>
        <br />
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item prop="user_NAME" label="用户昵称">
            <el-input style="width: 380px" v-model="form.user_NAME" />
          </el-form-item>
          <el-form-item label="密码" prop="Password">
            <el-input
              type="password"
              style="width: 380px"
              v-model="form.Password"
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input
              type="password"
              style="width: 380px"
              v-model="form.checkPassword"
            />
          </el-form-item>
          <el-form-item label="手机号" prop="tele_NUMBER">
            <el-input
              style="width: 300px"
              v-model="form.tele_NUMBER"
            ></el-input>
            <el-button style="width: 100px" @click="sendVerificode"
              >发送验证码</el-button
            >
          </el-form-item>
          <el-form-item label="手机验证码" v-if="verifiVisible">
            <el-input style="width: 380px" v-model="form.verifycode"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input style="width: 380px" v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="form.Gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <div style="text-align: center; margin-top: 40px">
            <el-button type="primary" @click="onSubmit">注册</el-button>
            <el-button @click="goBack">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog
      :visible="dialogVisible"
      title="注意"
      style="margin:0 auto;width: 600px"
    >
      <el-button type="text" @click="dialogVisible = false">关闭</el-button>
      <p>您的用户ID为：{{ userId }} 请小心保存</p>
    </el-dialog>
  </div>
</template>

<script>
//email 后加发送验证码按钮和输入框
//
import {checkVerifyCode, getVerifyCodeT, userRegister} from "../api/UserInfo";
export default {
  name: "Register",
  userList: {},
  computed: {},
  //用户id在注册完后生成
  data() {
    return {
      form: {
        email: "",
        user_NAME: "", //用户名
        Password: "", //密码
        user_ID: "", //用户编号
        id_number: "",
        Gender: "", //性别
        desc: "",
        tele_NUMBER: "", //电话号码
        dState: true,
        verifycode: "",
        checkPassword: ""
      },
      rules: {
        Password: [
          { required: "true", message: "密码不能为空", trigger: "blur" }
        ],
        checkPassword: [
          { required: "true", message: "请重复输入密码", trigger: "blur" }
        ],
        user_NAME: [
          { required: "true", message: "用户名不能为空", trigger: "blur" }
        ],
        tele_NUMBER: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "长度不符合要求", trigger: "blur" }
        ]
      },
      coverImgUrl: require("../assets/imgs/login-bg.jpg"),
      testInfo: "",
      //省市区
      province: "aaaaa",
      city: "",
      area: "",
      location: "",
      show: false,
      mailVerifyStatus: false,
      phoneVerifyStatus: false,
      registerType: "1",
      verifiVisible: false,
      dialogVisible: false,

      userId: ""
    };
  },
  methods: {
    sendVerificode(){
       this.verifiVisible=true
       getVerifyCodeT(this.form.tele_NUMBER).then(
        res=>{
          console.log(res.data)
        }
       )
    },
    returnToLogin() {
      this.$router.push("/Login");
    },
    setUserID() {
      let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let ID = "";
      for (let i = 0; i < 10; i++) {
        let id = Math.ceil(Math.random() * 9);
        ID += chars[id];
      }
      this.form.user_ID = ID;
    },
    setMailBoxID() {},
    goBack() {
      this.$router.push("/Login");
    },
    onSubmit() {
      checkVerifyCode(this.form.verifycode).then(
          res=>{
            console.log('判断验证码',res.data)
            if(res.data.code!='200'){return}
          }
      )
      let data = {
        userEmail: this.form.email,
        userFollowingNum: 0,
        userFollowedNum: 0,
        userGender: this.form.Gender,
        userImage: " ",
        userName: this.form.user_NAME,
        userPwd: this.form.Password,
        userTel: this.form.tele_NUMBER
      };
      userRegister(data).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.$message({
            message: "注册成功，您的账号Id为" + res.data.data,
            type: "success",
            duration: 0,
            showClose: true
          });
          this.$router.push("/Login");
        }
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      }),
        this.$router.push("/Login");
    }
  },
  created() {
    this.setUserID();
    this.setMailBoxID();
  },
  mounted: function() {}
};
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 0;
}
.bgc {
  position: absolute;
  height: 100%;
  width: 100%;
}
.main {
  height: 100%;
  width: 650px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.dashboard-container {
  padding-top: 10px;
  width: 550px;
  height: 650px;
  margin: 0px auto;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}
.title {
  text-align: center;
  color: #2d8cf0;
}
.el-form /deep/ .el-form-item__label {
  color: #2d8cf0;
}
.el-form /deep/ .el-radio__label {
  color: #2d8cf0;
}
/*省市区三级联动*/
.divwrap {
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
}

/*外部*/
.divwrap > .distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
}

/*头部*/
.divwrap >>> .address-header {
  background: #000;
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 50%;
  height: 0.5rem;
  font-size: 0.2rem;
}

/*头部内容*/
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}

/*选择过省市区的头部*/
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: 0.05rem solid #666;
}

/*内容部分*/
.divwrap >>> .address-container {
  overflow: scroll;
  height: 100%;
}

/*点过的地区内容*/
.divwrap >>> .address-container .active {
  color: red;
}
</style>
