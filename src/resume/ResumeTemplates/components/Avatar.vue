<template>
    <div class="box">
        <div class="avatar">
            <!-- <img src="../../../assets/xyj-b.jpg" alt="avatar"> -->
            <MyUpload v-if="avatar === ''" />
            <img :src="avatar" alt="avatar" v-else>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import MyUpload from '../../../components/M-Upload/index.vue'
import store from '../../../store'

export default defineComponent({
  components: {
    MyUpload
  },
  setup() {
    let avatar = computed(() => store.state.ResumeData.base.avatar);

    return {
      avatar
    }
  },
})
</script>


<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  .avatar {
    position: relative;
    height: 100%;
    &:hover {
      .mask {
        display: block;
      }
    }
    img {
      position: absolute;
      top: 14px;
      left: 55px;
      width: 112px;
      height: 152px;
      z-index: 1;
    }
    .mask {
      display: none;
      position: absolute;
      top: 14px;
      left: 55px;
      width: 112px;
      height: 152px;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.7);
    //   :global {
        .btn-change {
          color: #ffffff;
          font-size: 12px;
          margin-top: 50%;
          border-color: #ffffff;
        }
    //   }
    }
  }
}


</style>