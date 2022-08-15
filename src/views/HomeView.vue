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
</template>
<script>
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
export default {
  name: "Test",
  mounted() {
    this.test()
  },
  methods: {
    test() {
      // 项目唯一标识 AppID，Number 类型，请从 ZEGO 控制台获取
      let appID = 602618791
      // 接入服务器地址 Server，String 类型，请从 ZEGO 控制台获取（获取方式请参考上文“前提条件”）
      let server = "24c0b4f0d29cdfd502d87b5b99d7d7ce"

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
        if (updateType == 'ADD') {
          for (var i = 0; i < userList.length; i++) {
            console.log(userList[i]['userID'], '加入房间：', roomID)
          }
        } else if (updateType == 'DELETE') {
          for (var i = 0; i < userList.length; i++) {
            console.log(userList[i]['userID'], '退出房间', roomID)
          }
        }
      });
      zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
        // 房间内其他用户音视频流变化的通知
      });
      // 登录房间，成功则返回 true
// userUpdate 设置为 true 才能收到 roomUserUpdate 回调。

      let userID = Util.getBrow() + '_' + new Date().getTime();
      let userName = "user0001";
      let roomID = "0001";
      let token = awit;
// 为避免错过任何通知，您需要在登录房间前先监听用户加入/退出房间、房间连接状态变更、推流状态变更等回调。
      zg.on('roomStateChanged', async (roomID, reason, errorCode, extendedData) => {

      })
      zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true }).then(result => {
        if (result == true) {
          console.log("login success")
        }
      });
    }
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
