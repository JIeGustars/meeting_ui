<template>
  <div style="margin-top: 15px">
    <el-page-header :icon="ArrowLeft">
      <template #content>
        <span class="text-large font-600 mr-3"> 参会信息管理中心 </span>
      </template>
    </el-page-header>
  </div>
  <el-divider/>
  <el-menu default-active="2" style="position: absolute;top: 10%;width: 10%">
    <el-menu-item index="1" @click="info">会议信息展示</el-menu-item>
    <el-menu-item index="2">参会信息录入</el-menu-item>
  </el-menu>
  <div style="position:absolute;width: 300px;left: 20%">
    <el-steps :active="active" finish-status="success">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
    <el-form>
      <el-form-item label="参会人姓名">
        <el-input type="text" placeholder="请输入姓名" v-model="Form.userName"></el-input>
      </el-form-item>
      <el-form-item label="参会人手机号">
        <el-input type="text" placeholder="请输入手机号" v-model="Form.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="人脸照片">
        <el-upload
            action="/api/user/addUser"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeProductUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  </div>
</template>

<script>
import router from "@/router";
import {ElMessage} from "element-plus";

export default {
  name: "addUserView",
  data() {
    return{
      active:0,
      Form: {
        userName:"",
        imageurl:[],
        userPhone:"",
      },
      dialogImageUrl: '',

    }
  },
  methods: {
    next(){
      if (this.active<3){
        this.active = this.active+1
      }
    },
    info() {
      router.push('/manger')
    },
    handleRemove(file, fileList) {
      //移除图片
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //图片预览
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeProductUpload(file){
      console.log("转化成功")
      const _this = this;
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.readAsDataURL(file)// 这里是最关键的一步，转换成base64
        reader.onload = function(event) {
          _this.Form.imageurl.push(event.target.result) //定义参数获取图片路径
        }
      })

    },
    submit(){
      console.log("传递成功")
      console.log(this.Form.imageurl)
      let form = {
        userName: this.Form.name,
        meetingId: this.meetingId,
        userPhone: this.Form.contact,
        userState:0,
        userdataPath: this.Form.imageurl[0],
      };
      axios.post('/api/user/addUser',form).then(res=>{
        console.log(res.data)
        ElMessage({
          message: '上传成功!',
          type: 'success',
        })
        console.log('上传成功')
        this.dialogVisible=false
        this.load()
      })
      console.log("上传失败")
    },
  }
}
</script>

<style scoped>

</style>