<template>
  <div>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left;"></div>
    </div>
    <el-button type="primary" style="float: right;margin-top:30px;margin-right:145px" @click="PublishButton">确定发布</el-button>
</div>
</template>

<script>
// Local Registration
import axios from "axios";
import E from "wangeditor";
axios.defaults.baseURL = "";
import VDistpicker from 'v-distpicker'
import VueMarkdown from 'vue-markdown'
export default {
  name: "Nav",
  data() {
    return {
      editor: null,
      editorContent: '',
      day:"",
      month:"",
      year:"",
      seconds:"",
      minutes:"",
      hours:"",
    };
  },
  components:{
    VueMarkdown,
    VDistpicker
  },
  methods:{
    gettime() {
      let date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this,day = date.getDate();
      this.hours=date.getHours();
      this.minutes=date.getHours();
      this.seconds=date.getSeconds(); 
    },
    PublishButton() {
      this.editorContent=this.editor.txt.text()
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