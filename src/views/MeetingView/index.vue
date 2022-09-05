<template>
  <h1>
    Zego RTC Video Call
  </h1>
  <div class="video-wrapper">
    <h4>Local video</h4>
    <h4>Remote video</h4>
    <div id="local-video"></div>
    <div id="remote-video"></div>
  </div>
  <el-button type="primary" @click="startZEGO">启动ZEGO服务</el-button>
</template>
<script>
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "Zego",
  data() {
    return {
      token:"",
      userId:"",
      roomId:""
    }
  },
  mounted() {
    this.startZEGOServer()
  },
 created() {
    this.token =Cookies.get("token");
    this.userId =Cookies.get("userId");
    this.roomId =Cookies.get("roomId");
 },
  methods: {
    startZEGOServer() {
      // 项目唯一标识 AppID，Number 类型，请从 ZEGO 控制台获取
      const appID = 602618791
      // 接入服务器地址 Server，String 类型，请从 ZEGO 控制台获取（获取方式请参考上文“前提条件”）
      const server = "24c0b4f0d29cdfd502d87b5b99d7d7ce"

      // 初始化实例
      const zg = new ZegoExpressEngine(appID, server);
      zg.on('roomStateChanged', (roomID, reason, errorCode, extendedData) => {
        if (reason === 'LOGINING') {
          console.log("登录ing")
        } else if (reason === 'LOGINED') {
          console.log("登录成功")
          //只有当房间状态是登录成功或重连成功时，推流（startPublishingStream）、拉流（startPlayingStream）才能正常收发音视频
          //将自己的音视频流推送到 ZEGO 音视频云
        } else if (reason === 'LOGIN_FAILED') {
          console.log("登录失败")
        } else if (reason === 'RECONNECTING') {
          console.log("重连ing")
        } else if (reason === 'RECONNECTED') {
          console.log("重连成功")
        } else if (reason === 'RECONNECT_FAILED') {
          console.log("重连失败")
        } else if (reason === 'KICKOUT') {
          console.log("踢出房间")
        } else if (reason === 'LOGOUT') {
          console.log("退出成功")
        } else if (reason === 'LOGOUT_FAILED') {
          console.log("退出失败")
        }
      });
      zg.on('roomUserUpdate', (roomID, updateType, userList) => {
        if (updateType === 'ADD') {
          for (var i = 0; i < userList.length; i++) {
            console.log(userList[i]['userID'], '加入房间：', roomID)
          }
        } else if (updateType === 'DELETE') {
          for (var j = 0; j < userList.length; j++) {
            console.log(userList[i]['userID'], '退出房间', roomID)
          }
        }
      });
      // 登录房间，成功则返回 true
      // userUpdate 设置为 true 才能收到 roomUserUpdate 回调。

      let userID = this.userId;
      let userName = "Gu";
      let roomID = this.roomId;
      let token = this.token;
      // 为避免错过任何通知，您需要在登录房间前先监听用户加入/退出房间、房间连接状态变更、推流状态变更等回调。
      zg.on('roomStateChanged', async (roomID, reason, errorCode, extendedData) => {

      })
      // 此处在登录房间成功后，立即进行推流。在实现具体业务时，您可选择其他时机进行推流，只要保证当前房间连接状态是连接成功的即可。

      zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true }).then(async result => {
        if (result === true) {
          console.log("login success")
          // 创建流、预览
          // 调用 createStream 接口后，需要等待 ZEGO 服务器返回流媒体对象才能执行后续操作
          const localStream = await zg.createStream();

          // 创建媒体流播放组件对象，用于预览本地流
          const localView = zg.createLocalStreamView(localStream);
          // 将播放组件挂载到页面，"local-video" 为组件容器 DOM 元素的 id 。
          localView.play("local-video");

          // 开始推流，将自己的音视频流推送到 ZEGO 音视频云
          let streamID = new Date().getTime().toString();
          zg.startPublishingStream(streamID, localStream)
        }
      });
      // 流状态更新回调
      //房间内其他用户推送的音视频流新增/减少的通知
      //自己推送的流不能在这里接收到通知
      zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
        if (updateType === 'ADD') {
          // 流新增
          for (var i = 0; i < streamList.length; i++) {
            var streamID = streamList[i].streamID
            // streamList 中有对应流的 streamID
            var remoteStream = await zg.startPlayingStream(streamID);
            console.log('房间',roomID,'内新增了流：', streamList[i]['streamID'])
          }
          // 创建媒体流播放组件对象，用于播放远端媒体流 。
          const remoteView = zg.createRemoteStreamView(remoteStream);
          // 将播放组件挂载到页面，"remote-video" 为组件容器 DOM 元素的 id 。
          remoteView.play("remote-video");
          const message = "其他用户的视频流streamID: " + streamID.toString();
        } else if (updateType === 'DELETE') {
          // 流删除
          for (var j = 0; j < streamList.length; j++) {
            console.log('房间',roomID,'内减少了流：', streamList[i]['streamID'])
          }
        }
      });
    },
  }
}
</script>
<style>
h1,
h4 {
  text-align: center;
}

.video-wrapper {
  width: 610px;
  margin: 0 auto;
}

.video-wrapper h4 {
  width: 300px;
  display: inline-block;
  position: relative;
}
#remote-video, #local-video {
  width: 300px;
  height: 270px;
  display: inline-block;
  position: relative;
}

.video-wrapper video {
  height: auto;
}
</style>
<style scoped>

</style>