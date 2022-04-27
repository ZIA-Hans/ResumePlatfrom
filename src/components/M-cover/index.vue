<template>
    <div class="cover" :style="styleObj">
        <img :src="propVal">
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        propVal: {
            type: String,
            default: 'https://woai3c.github.io/visual-drag-demo/img/title.ac55a42f.jpg'
        },
        styleObj: Object
    },
    setup() {
        
    },
})
</script>

<style lang="less" scoped>
.cover {
  width: 242px;
  height: 130px;
  background-color: #ffffff;
  display: inline-block;
  position: relative;
//   overflow: hidden;
  &:hover&:after {
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    text-align: center;
    background-color: transparent;
    // background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    /*这里显示的内容为title属性对应的值*/
    content: attr(title);
    z-index: 2;
    width: 100%;
  }

  img {
    // width: 100%;
    // height: 100%;
    width: 242px;
    height: 130px;
  }
}
img {
    // width: 100%;
    // height: 100%;
    width: 242px;
    height: 130px;
  }
</style>