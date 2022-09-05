<style>
*{
  margin: 0;
  padding: 0;
}
#background{
  width: 100%;
  height: 100%;
  position: fixed;
  background: linear-gradient(to right,dodgerblue,skyblue,white,lightskyblue,blue);
  background-size: 100% 100%;
}
</style>
<template>
<div id="background">
  <el-card style="position:absolute;left: 15%;top: 13%;width: 70%;height: 80%;background: linear-gradient(to top,dodgerblue,whitesmoke,lightskyblue);">
    <span style="position: relative;left: 5%;top: 240px;font-weight: bolder;font-size: 25px;background: linear-gradient(to bottom,dodgerblue,deepskyblue,skyblue,lightskyblue);-webkit-text-fill-color: transparent;-webkit-background-clip: text;">Welcome to</span>
  <div style="position:relative;left: 5%;top:250px;font-size: 50px;background: linear-gradient(to bottom,blueviolet,deepskyblue,antiquewhite);-webkit-text-fill-color: transparent;-webkit-background-clip: text;font-weight: bold;">123会议</div>
      <el-form style="width: 270px;position: relative;left: 68%;;top: 100px">
          <el-form-item>
            <el-input type="text" placeholder="请输入账号" v-model="userId" id="userId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="text" placeholder="请输入密码" v-model="password" show-password></el-input>
          </el-form-item>
        <el-form-item>
          <span @click="dia1=true" style="cursor: pointer">忘记密码</span><span style="margin-left: 150px;cursor: pointer" @click="dia=true">注册账号</span>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 268px;" type="success" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</div>
  <el-dialog title="请输入信息" v-model="dia">
    <el-form>
      <el-form-item>
        <el-input type="text" placeholder="请输入用户名" v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="text" placeholder="请输入账号" v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="text" placeholder="请输入密码" v-model="form.userPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="text" placeholder="请输入密保" v-model="form.userProtection"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="dia=false">取消</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog title="请输入信息" v-model="dia1">
    <el-form>
      <el-form-item>
        <el-input type="text" placeholder="请输入账号" v-model="userId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="text" placeholder="请输入密保信息" v-model="protection"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="dia1=false">取消</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="forget">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import Cookies from "js-cookie"


export default {
  name: "index",
  data() {
    return {
      form: {
        userId: "",
        userName:"",
        userPassword: "",
        userProtection:""
      },
      userId:"",
      password:"",
      protection:"",
      dia:false,
      dia1:false
    }
  },
  methods:{
    login() {
      axios.get("/api/user/login?userId="+this.userId+"&password="+this.password).then(res =>{
        let userName = res.data.userName
        if (res.data){
          Cookies.set("userName",userName)
          Cookies.set("userId",this.userId)
          this.$router.push("/home")
          ElMessage({
            type: 'success',
            message: "登录成功"
          })
        }
        else {
          ElMessage.error("登录失败，请检查账号和密码")
        }
      })
    },
    forget() {

    },
    register() {
        axios.post("/api/user/register",this.form).then(res =>{
            console.log(res);
            if (res.data) {
              ElMessage({
                type: 'success',
                message: "注册成功"
              });
              this.dia=false
              document.getElementById("userId").innerHTML=this.userId
            }
            else {
              ElMessage.error("账号重复，请重新注册");
            }
        })
    }
  }
}
</script>

<style scoped>

</style>