<template>
  <div style="margin-top: 15px">
    <el-page-header :icon="ArrowLeft">
      <template #content>
        <span class="text-large font-600 mr-3"> 参会信息管理中心 </span>
      </template>
    </el-page-header>
  </div>
  <el-divider/>
    <el-menu default-active="1" style="position: absolute;top: 10%;width: 10%">
      <el-menu-item index="1">会议信息展示</el-menu-item>
      <el-menu-item index="2" @click="addUser">参会信息录入</el-menu-item>
    </el-menu>
  <div style="position: absolute;left: 15%;top: 15%">
    <el-input placeholder="请输入人员吗" style="width:30%;"></el-input>
    <el-button type="primary" size="mini" style="margin-left: 10px" >查询</el-button>
    <el-button type="primary" size="mini" @click="dialogVisible = true">新增</el-button>
    <el-table :data="tableData" border="true" stripe="true" style="width: 600px" >
      <el-table-column  label="会议号" width="150px">{{ this.meetingId }}</el-table-column>
      <el-table-column prop="userName" label="与会者姓名" width="150px"></el-table-column>
      <el-table-column prop="userPhone" label="与会者联系方式" width="150px"></el-table-column>
      <el-table-column  label="签到状态" width="150px">未签到</el-table-column>
    </el-table>
  </div>
</template>

<script>
import  {ArrowLeft,Location,Document} from '@element-plus/icons-vue'
import Cookies from "js-cookie";
import AddUserView from "@/views/HomeView/addUserView";
import router from "@/router";
import addUserView from "@/views/HomeView/addUserView";
export default {
  name: "MangerView",
  components: {AddUserView},
  data(){
    return {
      active:false,
      dialogVisible:false,
      meetingId:"",
      tableData:[]
    }
  },
  methods:{
    addUser() {
      router.push('/add')
    }
  },

  created() {
    this.meetingId = Cookies.get("meetingId")
  }

}

</script>

<style scoped>

</style>