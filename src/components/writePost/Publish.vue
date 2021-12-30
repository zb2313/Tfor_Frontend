<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="发帖子" name="first">
        <el-card class="box-card" style="margin: 0 auto;height: 930px">
          <el-input class="tltleinput"
            placeholder="请输入标题（20字以内）"
            v-model="title"
            clearable>
          </el-input>
          <el-divider></el-divider>
          <div id="wangeditor">
              <div ref="editorElem" style="text-align:left;"></div>
          </div>
          <el-select v-model="value" filterable  clearable visible-change placeholder="请选择分区" style="height:300px;float:left">
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
          <el-form action="https://tfor.obs.cn-east-3.myhuaweicloud.com" method="post" enctype="multipart/form-data">
              <input type="hidden" name="key" :value="picValue" />
              <p/>
              <!-- ACL -->
              <!-- Object ACL -->
              <input type="hidden" name="x-obs-acl" value="public-read" />
              <p/>
              <input type="hidden" name="content-type" value="multipart/form-data" />
              <input type="hidden" name="policy" :value="policy" />
              <input type="hidden" name="AccessKeyId" :value="AccessKeyId" />
              <input type="hidden" name="signature" :value="signature" />
              <input name="picture" style="display:flex" type="file" />
              <input name="submit" style="display:flex" value="Upload" type="submit" class="input_s" @click="confirmed" />
          </el-form>
          <el-card v-for="(item,index) in filelist" :key="index" class="picard" >
              <img :src="filelist[index]" style="width:50px;height:50px;display:flex;flex-direction:row;">
          </el-card>
          <el-button type="primary" style="float: right;margin-top:30px;margin-right:145px" @click="PublishButton">确定发布</el-button>
        </el-card>
   </el-tab-pane>
      <el-tab-pane label="发视频" name="second">
        <!-- 发布视频功能 -->
        <el-card class="box-card">
          <el-form action="https://tfor.obs.cn-east-3.myhuaweicloud.com" method="post" enctype="multipart/form-data">
              <input type="hidden" name="key" :value="picValue" />
              <p/>
              <!-- ACL -->
              <!-- Object ACL -->
              <input type="hidden" name="x-obs-acl" value="public-read" />
              <p/>
              <input type="hidden" name="content-type" value="multipart/form-data" />
              <input type="hidden" name="policy" :value="policy" />
              <input type="hidden" name="AccessKeyId" :value="AccessKeyId" />
              <input type="hidden" name="signature" :value="signature" />
              <input name="file" style="display:flex" type="file" />
              <input name="submit" style="display:flex" value="Upload" type="submit" class="input_s" @click="confirmed" />
          </el-form>
        </el-card>
      </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
// Local Registration
import axios from "axios";
import E from "wangeditor";
axios.defaults.baseURL = "";
import {getUploadAuth} from "@/api/obsApi"
export default {
  name: "pulishNav",
  props: ['catchData'], // 接收父组件的方法
  data() {
    return {
      // 上传必要的参数
      AccessKeyId:"",
      signature:"",
      policy:"",
      upload_video_url:"",
      value:'', //是否选择了专区
      activeName:'first',
      editor: null,
      editorContent: '',
      title:'',
      day:"",
      month:"",
      year:"",
      seconds:"",
      minutes:"",
      hours:"",
      contentId:'',
      count:1,
      picValue:'',
      userId:'',
      // 图片列表
      filelist:[],
       options: [{
          label: '热门分区',
          options: [{
            value: 1,
            label: '考研专区'
          }, {
            value: 3,
            label: '二手市场'
          }]
        }, {
          label: '分区目录',
          options: [{
            value: 2,
            label: '吃喝玩乐'
          }, {
            value: 4,
            label: '表白墙'
          }]
        }],
    };
  },
  components:{

  },
  methods:{
    confirmed(){
      this.count++;
      this.picValue="comment/"+this.contentId+this.count.toString()
      console.log("p:",this.picValue)
      this.prewiew()
    },
    prewiew(){
      this.$axios
      .get('http://121.5.137.205:8081/api/obs/getPostImageUrls?contentId='+this.contentId)
      .then((res)=>{
        for(var i in res.data.data)
        {
          this.filelist[i]=res.data.data[i]
        }
      })
    },
    gettime() {
      let date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.hours=date.getHours();
      this.minutes=date.getHours();
      this.seconds=date.getSeconds();
      let timestamp3 = date.getTime();
      this.contentId=timestamp3;
    },
    async PublishButton() {
      this.editorContent=this.editor.txt.text()
      console.log("md",this.editorContent)
      console.log("time:",this.contentId)
      if(this.title!='')
      {
        if(this.editorContent!='')
        {
          if(this.value!='')
          {
            //都有数据，正式发送
            await this.$axios
            .post('http://121.5.137.205:8081/api/post/postContent',
            {
              contentId:this.contentId,
              likeNum: 0,
              postTitle: this.title,
              reportNum: 0,
              text: this.editorContent,
              userId: this.userId,
            })

            await this.$axios
                .post('http://121.5.137.205:8081/api/post/EnterZone',
                    {
                      contentId:this.contentId,
                      zoneId:this.value,
                    }
                ).then((res)=>{
              if(res.status==200)
              {
                this.$message({type:'success',message:"发布成功"})
              }
              else
              {
                this.$message({type:'error',message:"发布失败"})
              }
            })
            this.editor.txt.clear()//最后清空输入框
          }
          else
          {
            this.$message({type:'warning',message:'请选择一个分区'})
          }
        }
        else
        {
          this.$message({type:'warning',message:'文章内容不能为空'})
        }
      }
      else
      {
        this.$message({type:'warning',message:"请输入文章标题"})
      }
    },
    handleClick(tab, event) {
        console.log(tab, event);
      },
  },
  created() {
    this.userId = window.localStorage.getItem('username')
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    this.editor.config.showMenuTooltips = true
    this.editor.config.showFullScreen = false//禁用全屏
    this.editor.config.menuTooltipPosition = 'down'
    this.editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']
    this.editor.config.fontSizes = {
    'x-small': { name: '10px', value: '1' },
    'small': { name: '13px', value: '2' },
    'normal': { name: '16px', value: '3' },
    'large': { name: '18px', value: '4' },
    'x-large': { name: '24px', value: '5' },
    'xx-large': { name: '32px', value: '6' },
    'xxx-large': { name: '48px', value: '7' },
    }
    this.editor.config.menus = [
        'bold',//粗体
        'head',//标题
        'list',//列表
        'italic',//斜体
        'underline',//下划线
        'fontSize', // 字号
        'fontName', // 字体
        'table', // 表格
        'undo', // 撤销
        'redo',// 重复
        'justify', // 对齐方式
        'emoticon', // 表情
        'lineHeight',
    ]
    this.editor.create(); // 创建富文本实例
    // this.$axios
    // .get('http://121.5.137.205:8081/api/obs/getUploadAuth')
    // .then((res)=>{
    //   console.log("rs:",res.data)
    //   this.AccessKeyId=res.data.data.accessKey
    //   this.policy=res.data.data.policy
    //   this.signature=res.data.data.signature
    //   console.log("A:",this.AccessKeyId)
    // })
    getUploadAuth().then(
        res => {
          console.log(res.data)
          this.AccessKeyId = res.data.data.accessKey
          this.signature = res.data.data.signature
          this.policy = res.data.data.policy
        }
    )
    this.gettime()
  },
}
</script>
<style scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 480px;
  /* min-height: 400px; */
}
.picard{
  width: 90px;
  height: 90px;
  float:left
}
.input_s{
  margin: 0 auto;
  padding: 0 10px;
  width: 536px;
  height: 34px;
  border: 1px solid rgba(255,255,255,.8);
  border-radius: 2px;
  color: #fff;
  background: rgba(14, 103, 204, 0.15);
}
.upload-video{
  margin-top:16%
}
.tltleinput{
  font-size: 20px;
  font-family: "微软雅黑";
}
.PublishHead button{
  display: block;
  float: right;
  justify-content: center;
  align-content: center;
  margin-top: 10px;
}
.box-card{
  position: relative;
  outline: none;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 18px;
  line-height: 30px;
  min-height: 400px;
  width:800px;
  margin-left: 16%;
}
</style>
