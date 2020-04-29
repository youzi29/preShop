<template>
    <div class="emoji-pluy">
      <div v-model="activeIndex">
        <div  v-for="(emojiGroup, category) in emojis" :key="category" :label="category" :name="category">
            <div class="iconItem">
              <span v-for="(emoji, emojiName) in emojiGroup" :key="emojiName" @click="insert(emoji)" :title="emojiName">{{ emoji }}</span>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import emojiData from '../data/emojis.js' ;
export default {
  data(){
    return{
      emojis:{},
      activeIndex:'默认'
    }
  },
  created(){
    this.emojis=emojiData;
  },
  methods:{
    insert(emoji) {
      try{
        this.$emit("select",emoji);
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>

<style  scoped>
.emoji-pluy .iconItem{
      height: auto;
      overflow: hidden;
      padding: 0 5px;
  }
.emoji-pluy .iconItem  span{
    height: auto;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    line-height: 20px;
    float: left;
  }
</style>
