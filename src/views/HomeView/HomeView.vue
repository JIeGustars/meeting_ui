<style>
*{
  margin: 0;
  padding: 0;
}
#HomeBackground{
  width: 100%;
  height: 100%;
  background: url("../../assets/images/img_7.png");
  background-size: 100% 100%;
  position: fixed;
}
</style>
<template>
  <div id="HomeBackground">
  <el-menu mode="horizontal" style="background: rgb(206, 206, 206)">
    <el-menu-item index="1">主界面</el-menu-item>
    <el-menu-item index="2">第二界面</el-menu-item>
  </el-menu>
  <el-dropdown style="position: absolute;top: 3%;right: 3%;display: inline;">
    <span>{{userName}}</span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>会员开通</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-card style="position: relative;left:20%;top: 5%;width: 60%;height: 80%;background: rgb(244, 240, 237)">
    <el-button @click="dialogVisible2=true">加入会议</el-button>
    <el-button @click="dialogVisible=true">预约会议</el-button>
    <el-button>快速入会</el-button>
    <div style="width: 450px;height: 70px;float: left;">
      <el-input  v-model="meetingNo" style="width: 200px;margin-top: 30px"></el-input><el-button type="primary" @click="manger">进入会议</el-button>
      <el-table :data="tableData" border="true" stripe="true" style="width: 450px;margin-top: 20px" >
        <el-table-column prop="meetingId" label="会议号" width="130px"></el-table-column>
        <el-table-column prop="meetingStartDate" label="开始时间" width="160px"></el-table-column>
        <el-table-column prop="meetingEndDate" label="结束时间" width="160px"></el-table-column>
      </el-table>
    </div>
  </el-card>

  </div>
  <el-dialog title="请输入信息" v-model="dialogVisible" width="500px">
    <el-form style="margin-left: 100px">
      <el-form-item label="申请人姓名">
        {{userName}}
      </el-form-item>
      <el-form-item label="申请人账号">
        {{ form.userId }}
      </el-form-item>
      <el-form-item label="开始时间">
        <div class="block">
          <el-date-picker v-model="form.createTime" type="datetime" placeholder="选择开始时间">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="结束时间">
        <div class="block">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item style="margin-top: 30px">
        <el-button type="danger" @click="this.dialogVisible=false">取消创建</el-button>
        <el-button type="success" @click="createMeeting" style="margin-left: 100px">确认创建</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog  v-model="dialogVisible1">
    <el-descriptions title="会议信息">
      <el-descriptions-item label="申请人姓名">{{userName}}</el-descriptions-item>
      <el-descriptions-item label="申请人账号">{{form.userId}}</el-descriptions-item>
      <el-descriptions-item label="会议号">{{meetingId}}</el-descriptions-item>
      <el-descriptions-item label="会议开始时间">{{form.createTime}}</el-descriptions-item>
      <el-descriptions-item label="会议结束时间">{{form.endTime}}</el-descriptions-item>
    </el-descriptions>
    <el-button @click = "end()" style="float: right">确定</el-button>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" width="400px">
    <el-input type="text" placeholder="请输入会议号" v-model="meetingId"></el-input>
    <el-button @click="inMeeting" type="primary" style="margin-top: 10px;">进入会议</el-button>
  </el-dialog>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie"
import {ElMessage} from "element-plus";
import router from "@/router";
export default {
  name: "Home",
  data() {
    return {
      userName:"",
      dialogVisible:false,
      dialogVisible1:false,
      dialogVisible2:false,
      form:{
        userId:"",
        createTime:"",
        endTime:""
      },
      meetingId:""
    }
  },
  created() {
    this.userName = Cookies.get("userName")
    this.form.userId = Cookies.get("userId")
  },
  methods: {
    createMeeting() {
      this.dialogVisible = false
      axios.post("/api/user/create",this.form).then(res =>{
        if (res.data != null) {
          this.meetingId = res.data.meetingId
          this.form.createTime = res.data.createTime.replace("T"," ")
          this.form.endTime = res.data.endTime.replace("T"," ")
          ElMessage({
            type: 'success',
            message: "创建成功"
          });
          this.dialogVisible1 = true
          Cookies.set("meetingId",this.meetingId)
          router.push("/manger")
        }
        else {
          ElMessage.error("创建失败");
        }
      })
    },
    end() {
      this.meetingId = ""
      this.dialogVisible1 = false
    },
    inMeeting() {
      axios.get("/api/user/checkMeetingId?meetingId="+this.meetingId).then(res =>{
        if (res.data) {
          this.$router.push("/recognition")
        }
        else {
          ElMessage.error("进入失败，请检查后重新输入")
        }
      })
    }
  }
}
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>
