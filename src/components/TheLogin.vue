<template>
  <div id="login-page">
    <!-- 登录界面 -->
    <div v-show="showLogin" class="login-panel">
      <div class="panelhead">
        <h3>用户登录</h3>
      </div>
      <div class="panelbody">
        <Form :model="loginMsg" :rules="ruleValidate" :label-width="60">
          <FormItem label="用户名" prop='username'>
            <Input v-model="loginMsg.username" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop='password'>
            <Input
              v-model="loginMsg.password"
              placeholder="请输入密码"
              type="password"
              password
              @keyup.enter.native="handleLogin"
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleLogin">登录</Button>
            <Button @click="toggleLogin" style="margin-left: 8px">没有账户？</Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <!-- 注册页面 -->
    <div v-show="!showLogin" class="login-panel">
      <div class="panelhead">
        <h3>用户注册</h3>
      </div>
      <div class="panelbody">
        <!-- 用户名 -->
        <Form ref="formValidate" :model="registMsg" :rules="ruleValidate" :label-width="60">
          <FormItem label="用户名" prop="username">
            <Input v-model="registMsg.username" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input v-model="registMsg.password" placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleRegist('formValidate')">注册</Button>
            <Button @click="toggleLogin" style="margin-left: 8px">已有账户？</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheLogin",
  data() {
    return {
      showLogin: true,
      loginMsg: {
        username: "",
        password: ""
      },
      registMsg: {
        username: "",
        password: "",
        sex: "female",
        dept: "1",
        remark: "1",
        email: "1",
        userType: "1",
        RPEMN_ID: "1"
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 切换登录与注册页面
    toggleLogin() {
      this.showLogin = !this.showLogin;
      this.$router.push('/')
    },
    // 登录处理
    handleLogin() {
      this.$axios
        .post(
          "api/BjMapping/servlet/LoginServlet",
          this.$qs.stringify(this.loginMsg)
        )
        .then(res => {
          console.log(res);

          if (res.status === 200) {
            // 拿到返回结果中的 token
            let idx = res.data.lastIndexOf(":");
            let length = res.data.length;
            const token = res.data.substring(idx + 1, length);
            console.log(token);
            // console.log(res.data.split(",")[0])
            if (token === "error") {
              this.$Message.error("用户名或密码错误!");
              this.loginMsg.username = "";
              this.loginMsg.password = "";
            } else {
              this.$Message.success("登录成功!");
              // 在 store 里存储的数据,当页面刷新时会丢失,所以将登录信息保存在 sessionStorage 中
              window.sessionStorage.setItem("isLogin", "true");
              window.sessionStorage.setItem("token", token);
              window.sessionStorage.setItem("username", this.loginMsg.username);
              console.log(this)
              this.$store.state.isLogin = true;
              this.$router.push("/");
            }
          }
        });
    },
    // 注册处理
    handleRegist(name) {
      if (this.registMsg.username == "" || this.registMsg.password == "") {
        this.$Message.error("用户名和密码均不能为空！");
      } else if (
        this.registMsg.username.indexOf(" ") !== -1 ||
        this.registMsg.password.indexOf(" ") !== -1
      ) {
        this.$Message.error("用户名或密码不合法，请输入字母，数字或下划线！");
        this.registMsg.username = "";
        this.registMsg.password = "";
      } else {
        // this.$refs[name].validate(valid => {
        // if (valid) {
        this.$axios
          .post(
            "api/BjMapping/servlet/UserRegisterServlet",
            this.$qs.stringify(this.registMsg)
          )
          .then(res => {
            console.log(res);
            if (res.status === 200 && res.data === "success register") {
              this.$Message.success("注册成功!");
              this.registMsg.username = "";
              this.registMsg.password = "";
              this.toggleLogin();
            } else if (
              res.status === 200 &&
              res.data === "the user already exists"
            ) {
              this.$Message.error("该用户已存在！");
            }
          });
      }
    }
  }
};
</script>

<style scoped lang='less'>
#login-page {
  width: 450px;
  margin: 150px auto;
  .login-panel {
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 10px 10px 8px rgba(0, 0, 0, 0.5);
    .panelhead {
      border-bottom: solid 2px #cccccc;
      h3 {
        margin: 10px 0;
        display: inline-block;
        border-bottom: 3px solid blue;
        padding-bottom: 5px;
      }
    }
    .panelbody {
      padding-top: 10px;
      font-size:18px;
    }
  }
}

/* 切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
