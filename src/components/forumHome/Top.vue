<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="margin-left: 40px">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
      </a>

      <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" style="margin-left: 5%">
      <div class="navbar-start">
        <a class="navbar-item" style="color: #FF9607">推荐</a>

        <a class="navbar-item " style="color: #F1403C">热榜</a>

        <a class="navbar-item">表白墙</a>

        <a class="navbar-item">二手市场</a>

        <!--        <div class="navbar-item has-dropdown is-hoverable">-->
        <!--          <a class="navbar-link">全部分区</a>-->

        <!--          <div class="navbar-dropdown">-->
        <!--            <a class="navbar-item" @click="userhome">个人主页</a>-->
        <!--            <a class="navbar-item">全部板块</a>-->
        <!--            <a class="navbar-item">全部帖子</a>-->
        <!--            <hr class="navbar-divider"/>-->
        <!--            <a class="navbar-item">Report an issue</a>-->
        <!--          </div>-->
        <!--        </div>-->
        <a class="navbar-item">
          <el-dropdown   trigger="click" style="font-size: 16px!important;">
              <span class="el-dropdown-link" >
            全部分区<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item v-for="item in this.zoneinfo" :key="item.zoneId" style="font-size: 16px!important;">{{item.zoneName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </a>

        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5"></p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Find a post"/>
              </p>
              <p class="control">
                <button class="button">搜索</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="navbar-end" v-if="!$store.state.isLogin">
        <div class="navbar-item">
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
      </div>
      <div v-else-if="$store.state.isLogin">
        <div>
          <i class="far fa-address-card">{{ $store.state.user.userName }}</i>
        </div>
        <div @click="logout">
          <i class="fas fa-sign-out-alt">登出</i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {userLogin} from "@/api";
import {getAllZone} from "@/api/zoneApi";

export default {
  data() {
    return {
      email: "",
      password: "",
      zoneinfo: [],
    };
  },
  created() {
    // 预先获取所有分区信息
    getAllZone().then(
        res => {
          console.log(res.data)
          for (var i in res.data) {
            this.zoneinfo.push(res.data[i])
          }
          console.log(this.zoneinfo)
        }
    )
  },

  methods: {
    logout() {
      this.$store.commit("logout");
    },
    userhome() {
      this.$router.push("/userhome");
    },
    login() {
      userLogin(this.email, this.password)
          .then(res => {
            const {data} = res;
            this.user = data;
            console.log(data);
            if (data != null) {
              this.$store.dispatch("aLogin", {
                user: data,
                message: "牛逼",
                success: () => {
                  console.log("欢迎您");
                }
              });
            } else {
              alert("该用户不存在");
            }
          })
          .catch(() => {
          });
    },
    register() {
      this.$router.push("/registerhome");
    }
  }
};
</script>
