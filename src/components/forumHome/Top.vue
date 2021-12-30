<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="margin-left: 40px; padding: 5px 0">
      <img src="../../assets/logo/TFOR.png" style=" width: 112px; height: 56px; "/>
    </div>


    <div id="navbarBasicExample" class="navbar-menu" style="margin-left: 5%">
      <div class="navbar-start">
        <a class="navbar-item" style="color: #FF9607" @click="chooseZone(1,0)">推荐</a>
        <a class="navbar-item " style="color: #F1403C">
          <el-dropdown trigger="click" style="font-size: 16px!important; color: #F1403C;">
              <span class="el-dropdown-link">
            热榜<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="chooseZone(2,3)" style="font-size: 16px!important; color: #A42B28;">3日内
              </el-dropdown-item>
              <el-dropdown-item @click.native="chooseZone(2,7)" style="font-size: 16px!important; color: #F1403C;">7日内
              </el-dropdown-item>
              <el-dropdown-item @click.native="chooseZone(2,15)" style="font-size: 16px!important; color: #FF763F;">
                15日内
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>
        <a class="navbar-item" @click="chooseZone(3,4)">表白墙</a>
        <a class="navbar-item" @click="chooseZone(3,3)">二手市场</a>

        <a class="navbar-item">
          <el-dropdown trigger="click" style="font-size: 16px!important;">
              <span class="el-dropdown-link">
            全部分区<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in this.zoneinfo" :key="item.zoneId" style="font-size: 16px!important;"
                                @click.native="chooseZone(3, item.zoneId)">
                {{ item.zoneName }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>

        <div class="level-left">
          <el-input placeholder="请输入查找关键字" v-model="inputSearchInfo" class="searchClass">
            <el-button slot="append" icon="el-icon-search" @click="passSearchInfoToFather"></el-button>
          </el-input>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="$store.state.isLogin">
          <div class="buttons">
            <b-button type="is-info" outlined @click="register">注册</b-button>
            <div class="navbar-menu">
              <div class="navbar-end">
                <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
                  <a class="navbar-item" slot="trigger" role="button">
                    <b-button type="is-info" outlined>登录</b-button>
                  </a>

                  <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
                    <div class="modal-card" style="width:300px;">
                      <section class="modal-card-body">
                        <b-field label="Email">
                          <b-input type="email" v-model="email" placeholder="Your email" required></b-input>
                        </b-field>

                        <b-field label="密码">
                          <b-input
                              type="password"
                              password-reveal
                              placeholder="Your password"
                              required
                              v-model="password"
                          ></b-input>
                        </b-field>

                        <b-checkbox>记住我</b-checkbox>
                      </section>
                      <footer class="modal-card-foot">
                        <button class="button is-primary" @click="login">登录</button>
                      </footer>
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!isLogin" style="padding: 10px 10px">
          <el-button size="medium" @click="login">
            登录
          </el-button>
        </div>
        <div v-show="isLogin" style="padding: 10px 10px">
          <el-button icon="el-icon-edit" size="medium" @click="writePost">
            发布帖子
          </el-button>
        </div>
        <div v-show="isLogin" style="padding: 5px 5px 0px 0px;" @click="userInfo">
            <el-dropdown>
              <el-avatar :src="userImg" :size="50" fit="cover"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-right">
                  <el-button @click="logout">
                    登出
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.searchClass {
  border: 1px solid #c5c5c5;
  border-radius: 20px;
  background: #f4f4f4;
  width: 400px;
}

.searchClass .el-input-group__prepend {
  border: none;
  background-color: transparent;
  padding: 0 10px 0 30px;
}

.searchClass .el-input-group__append {
  border: none;
  background-color: transparent;
}

.searchClass .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: none;
  background-color: transparent;
}

.searchClass .el-icon-search {
  font-size: 16px;
}

.searchClass .centerClass {
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
}

.searchClass .line {
  width: 1px;
  height: 26px;
  background-color: #c5c5c5;
  margin-left: 14px;
}

.searchClass:hover {
  border: 1px solid #D5E3E8;
  background: #fff;
}

.searchClass:hover .line {
  background-color: #D5E3E8;
}

.searchClass:hover .el-icon-search {
  color: #409eff;
  font-size: 16px;
}

.el-avatar:hover {
  background-color: #D5E3E837;
}

.el-avatar {
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 63px;
  background: #333;
  border-radius: 50%;
  font-size: 30px;
  color: #666;
  transition: .5s;
}

.el-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #22DC80;
  transition: .5s;
  transform: scale(.9);
  z-index: -1;
}

.el-avatar:hover::before {
  transform: scale(1.1);
  box-shadow: 0 0 15px #22DC80;
}

.el-avatar:hover {
  color: #22DC80;
  box-shadow: 0 0 5px #22DC80;
  text-shadow: 0 0 5px #22DC80;
}


</style>

<script>
import {getAllZone} from "@/api/zoneApi"
import {getUserImg} from "@/api/UserInfo"

export default {
  props: {
    zoneInfo1: Number,
    zoneInfo2: Number,
    searchInfo: String,
  },
  // watch: {
  //   zoneInfo1(newVal) {
  //     this.zoneInfo1 = newVal
  //   }// 监控父组件中值的变化
  // },
  data() {
    return {
      childZoneInfo1: this.zoneInfo1,
      childZoneInfo2: this.zoneInfo2,
      childSearchInfo: this.searchInfo,
      email: "",
      password: "",
      zoneinfo: [],
      inputSearchInfo: '',
      userImg: "",
      userId: "2",
      isLogin:false,
    };
  },
  created() {
    this.userId = window.localStorage.getItem('username')

    if (this.userId){
      this.isLogin = true
    }

    // 预先获取所有分区信息 展示在下拉菜单中
    console.log(this.childSearchInfo)
    getAllZone().then(
        res => {
          for (var i in res.data.data) {
            this.zoneinfo.push(res.data.data[i])
          }
          // console.log(this.zoneinfo)
        }
    )

    getUserImg(this.userId).then(
        res => {
          console.log(res.data.data)
          // this.userImg = "https://tfor.obs.cn-east-3.myhuaweicloud.com/profile/2?AccessKeyId=JDOPVQVKTYEJUXZXODLK&Expires=1640487882&Signature=PbRFpQULBBx0WZnsRa21BdGhYLI%3D"
          this.userImg = res.data.data
        }
    )


  },

  methods: {
    // 将选择分区的信息传递给father
    chooseZone: function (param1, param2) {
      this.$emit('chooseZone', param1, param2)
    },
    // 将输入的查找信息传递给father
    passSearchInfoToFather: function () {
      this.$emit('passSearchInfo', this.inputSearchInfo)
    },
    logout() {
      window.localStorage.clear()
      this.$router.push("/login");
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/registerhome");
    },
    userInfo() {
      // this.$router.push("/userhome");
      this.$router.push({
        path: `/userhome`,
        query:{id:43},
      })
    },
    writePost() {
      this.$router.push("/writePost")
    }
  }
};
</script>
