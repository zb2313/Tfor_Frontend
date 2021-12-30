<template>
  <div>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left;width: 660px;height: 320px"></div>
    </div>
    <el-button type="primary" style="float: bottom;margin-top:30px;margin-right:145px" @click="PublishButton">确定发布</el-button>
</div>
</template>

<script>
// Local Registration
import axios from "axios";
import E from "wangeditor";
import {postComment} from "../../api/postApi";
axios.defaults.baseURL = "";
export default {
  name: "Nav",
  props:{
    fatherId:[String,Number],
    userId:[String,Number],
    fathertype:[String,Number]
  },
  data() {
    return {
      editor: null,
      editorContent: '',
      day:"",
      month:"",
      year:"",
      seconds:"",
      minutes:"",
      hours:""
    };
  },
  components:{
  },
  methods:{
    gettime() {
      let date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.hours=date.getHours();
      this.minutes=date.getHours();
      this.seconds=date.getSeconds();
    },
    PublishButton() {
      this.editorContent=this.editor.txt.text()
      //let date = new Date();
      //let timestamp3 = date.getTime();
      let uid=localStorage.getItem("username");
      if(uid==''){
        this.$message.warning('请先登录！！！');
        return
      }
      let dt={
        commentNum: 0,
        contentId: 12,
        fatherContentId: 14,
        fatherType: 1,
        label: "",
        likeNum: 0,
        picture: "",
        reportNum: 0,
        reviewState: "",
        text: this.editorContent,
        userId: 5
      }
      postComment(dt).then(
          res=>{
            console.log(res.status)
          }
      );
      console.log("md",this.editorContent)
      },
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    this.editor.config.showMenuTooltips = true
    this.editor.config.showFullScreen = false//禁用全屏
    this.editor.config.menuTooltipPosition = 'down'
    this.editor.config.menus = [
        'emoticon', // 表情
    ]
    this.editor.create(); // 创建富文本实例
  },
}
</script>
