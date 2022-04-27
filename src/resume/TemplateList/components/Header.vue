<template>
    <div class="header">
        <div class="back" @click="goback">
            返回
        </div>
        <p class="title">简历模板仓库</p>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import router from '@/router'

export default defineComponent({
  setup() {
    function goback() {
      router.go(-1)
    }

    return {
      goback
    }
  },
})
</script>


<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  color: #ffffff;
  background-color: #27292c;
  .back {
    font-size: 16px;
    cursor: pointer;
    padding-left: 20px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 23px;
      width: 14px;
      height: 14px;
      background-size: cover;
      background-image: url('../../../assets/icon/back_blank.png');
      background-repeat: no-repeat;
    }
  }
  .title {
    flex: 1;
    font-size: 16px;
    text-align: center;
    margin-left: -52px;
  }
}
</style>