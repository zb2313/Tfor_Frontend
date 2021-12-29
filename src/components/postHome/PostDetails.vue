<template>
  <div>
<el-row>
<el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row :gutter="20" >
<el-col :span="12" style="margin-left: 250px">
  <div class="grid-content bg-purple" >
    <el-card>
      <div style="text-align: left">
       <span style="margin-left: 0px;font-size:28px;font-weight: bolder">{{this.title}}</span>&nbsp;
        <span>50评论/ 50点赞/ 500浏览</span>
        <el-divider></el-divider>
      </div>

      <el-card style="background: #e2e2e2">
          <img :src="this.userImage" height="70" width="70" style="float: left">
          <div style="float: left">
            <span style="font-size:24px;color: #2d8cf0">{{this.posterName}} &nbsp;</span>
            <span style="font-size: 18px">2001-01-21</span>
          </div><br><br><br><br>
         <p style="text-align: left">
           XKULPZX1W0-eyJsaWNlbnNlSWQiOiJYS1VMUFpYMVcwIiwibGljZW5zZWVOYW1lIjoi5rC45LmF5r+A5rS7IHd3d8K3YWppaHVvwrdjb20
           iLCJhc3NpZ25lZU5hbWUiOiIiLCJhc3NpZ25lZUVtYWlsIjoiIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiIiwiY2hlY2tDb25jdXJyZW50V
           XNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJEUE4iLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmRlZCI6ZmFsc2V9LHs
           iY29kZSI6IkRCIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJQUyIsInBhaWRVcFRvIjoiM
           jAyMi0wMS0yMyIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiSUkiLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmRlZCI6ZmF
           sc2V9LHsiY29kZSI6IlJTQyIsInBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJHTyIsInBhaWRVc
           FRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiRE0iLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmR
           lZCI6ZmFsc2V9LHsiY29kZSI6IlJTRiIsInBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJEUyIsI
           nBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUEMiLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJ
           leHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJDIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiO
           iJDTCIsInBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiV1MiLCJwYWlkVXBUbyI6IjIwMjItMDE
           tMjMiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJEIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSUzAiLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJNIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJBQyIsInBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUlNWIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IkRDIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSU1UiLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IkRQIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBEQiIsInBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQV1MiLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUFNJIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBQUyIsInBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQQ1dNUCIsInBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQR08iLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUFBDIiwicGFpZFVwVG8iOiIyMDIyLTAxLTIzIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBSQiIsInBhaWRVcFRvIjoiMjAyMi0wMS0yMyIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQU1ciLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUlMiLCJwYWlkVXBUbyI6IjIwMjItMDEtMjMiLCJleHRlbmRlZCI6dHJ1ZX1dLCJtZXRhZGF0YSI6IjAxMjAyMTEyMjRQUEFNMDAwMDA1IiwiaGFzaCI6IjI5MzcwODkwLzA6MTk3MDcwMjA3OCIsImdyYWNlUGVyaW9kRGF5cyI6NywiYXV0b1Byb2xvbmdhdGVkIjpmYWxzZSwiaXNBdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlfQ==-VRnHWzDqpau+yu1AP9Hqct0TmFi2aoWAFegC43JU3+J+JhLPEyb0pL12tvMXQtIupIgTk6vIW7MmH7rhwznj7rnfO/Ets8vOz2G9hUejK61jluN+dID6FWI7JOUyUcVjN6UPkHlou6PtB4vvIwwlRheu4Y5WoEyHYU2fcupjeeIuhaRo5SYOsOA1UVM2doJMTvcaG/5M/Q0lyH02CnaKVuuXCgG54rSnY+mIksQQRWf2UabB7Q8Ret/9JoGnus4boOHc7elTF5C1A24MO2Pvd2qA4/1TJf6OnKXzu8mWiDXbKc/QZXFuidQ0/yhsbaIfLZ+jg6S+4n1TdgTYA8knlQ==-MIIETDCCAjSgAwIBAgIBDTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTIwMTAxOTA5MDU1M1oXDTIyMTAyMTA5MDU1M1owHzEdMBsGA1UEAwwUcHJvZDJ5LWZyb20tMjAyMDEwMTkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCP4uk4SlVdA5nuA3DQC+NsEnZS9npFnO0zrmMWcz1++q2UWJNuGTh0rwi+3fUJIArfvVh7gNtIp93rxjtrQAuf4/Fa6sySp4c32MeFACfC0q+oUoWebhOIaYTYUxm4LAZ355vzt8YeDPmvWKxA81udqEk4gU9NNAOz1Um5/8LyR8SGsSc4EDBRSjcMWMwMkYSauGqGcEUK8WhfplsyF61lKSOFA6VmfUmeDK15rUWWLbOMKgn2cxFA98A+s74T9Oo96CU7rp/umDXvhnyhAXSukw/qCGOVhwKR8B6aeDtoBWQgjnvMtPgOUPRTPkPGbwPwwDkvAHYiuKJ7Bd2wH7rAgMBAAGjgZkwgZYwCQYDVR0TBAIwADAdBgNVHQ4EFgQUJNoRIpb1hUHAk0foMSNM9MCEAv8wSAYDVR0jBEEwP4AUo562SGdCEjZBvW3gubSgUouX8bOhHKQaMBgxFjAUBgNVBAMMDUpldFByb2ZpbGUgQ0GCCQDSbLGDsoN54TATBgNVHSUEDDAKBggrBgEFBQcDATALBgNVHQ8EBAMCBaAwDQYJKoZIhvcNAQELBQADggIBAB2J1ysRudbkqmkUFK8xqhiZaYPd30TlmCmSAaGJ0eBpvkVeqA2jGYhAQRqFiAlFC63JKvWvRZO1iRuWCEfUMkdqQ9VQPXziE/BlsOIgrL6RlJfuFcEZ8TK3syIfIGQZNCxYhLLUuet2HE6LJYPQ5c0jH4kDooRpcVZ4rBxNwddpctUO2te9UU5/FjhioZQsPvd92qOTsV+8Cyl2fvNhNKD1Uu9ff5AkVIQn4JU23ozdB/R5oUlebwaTE6WZNBs+TA/qPj+5/wi9NH71WRB0hqUoLI2AKKyiPw++FtN4Su1vsdDlrAzDj9ILjpjJKA1ImuVcG329/WTYIKysZ1CWK3zATg9BeCUPAV1pQy8ToXOq+RSYen6winZ2OO93eyHv2Iw5kbn1dqfBw1BuTE29V2FJKicJSu8iEOpfoafwJISXmz1wnnWL3V/0NxTulfWsXugOoLfv0ZIBP1xH9kmf22jjQ2JiHhQZP7ZDsreRrOeIQ/c4yR8IQvMLfC0WKQqrHu5ZzXTH4NO3CwGWSlTY74kE91zXB5mwWAx1jig+UXYc2w4RkVhy0//lOmVya/PEepuuTTI4+UJwC7qbVlh5zfhj8oTNUXgN0AOc+Q0/WFPl1aw5VV/VrO8FCoB15lFVlpKaQ1Yh+DVU8ke+rt9Th0BCHXe0uZOEmH0nOnH/0onD
         </p>
        <img src="https://img2.baidu.com/it/u=2244323656,2206897366&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=326">
        <div style="float: bottom">
          <el-button style="font-size: 16px" type="text" class="el-icon-s-opportunity">点赞</el-button>({{this.likeNum}})
          <el-button style="font-size: 16px" type="text" class="el-icon-tickets">评论</el-button>({{this.commentNum}})
          <el-button style="font-size: 16px" type="text" class="el-icon-star-off">收藏</el-button>({{this.commentNum}})
          <el-button style="font-size: 16px" type="text" class="el-icon-warning-outline">举报</el-button>({{this.commentNum}})
        </div>
      </el-card><br>

      <el-card style="text-align: left">
         <span style="font-size: 20px">高赞评论</span>
      </el-card><br>

      <el-card style="text-align: left">
        <span style="font-size: 20px">全部评论</span>
      </el-card>
    </el-card>
  </div>
</el-col>
<el-col :span="7">
  <div class="grid-content bg-purple-light">
    <el-row>
       <el-card>
         <span>广告招商</span>
       </el-card>
    </el-row><br>
    <el-row>
      <el-card>
        <span>校园热搜热帖</span>
      </el-card>
    </el-row>
  </div>
</el-col>
</el-row>

  </div>
</template>

<script>
export default {
  name: "PostDetails",
  data(){
    return{
      title:"标题",
      commentNum:60,
      posterName:"XZB",
      likeNum:20,
      browserNum:"",
      userImage:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F835b18517ae5b7a2aeea97b1ea9d25938914b5fc.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642906832&t=a2046029eaae51ec5bc6173b8e883bab",
      postTime:"",
      postID:37
    }
  },
  created() {

  }
}
</script>

<style scoped>
.bg-purple-dark {
  background: #bf99ad;
}
.bg-purple {
  background: #1979e3;
}
.bg-purple-light {
  background: #70ac0f;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
