<template>
    <div class="L-container">
        <p class="title">荣誉奖励</p>
        <ul class="content">
            <li v-for="(item, index) in certificateArr" :key="index">
              {{item}}
            </li>
            <!-- <li>CET4</li>
            <li>计算机二级证书</li> -->
        </ul>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import store from '../../../store'

export default defineComponent({
  setup() {
    const certificate = computed(() => store.state.ResumeData.certificate);
    let certificateArr = computed(() => certificate.value.split('|'));
    return {
      certificateArr
    }
  },
})
</script>

<style lang="less" scoped>
p,
ul {
  margin: 0;
}
ul {
  list-style-type: none;
  margin: 0;
  display: block;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
.L-container {
  padding-top: 48px;
  p.title {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin: 0;
  }
  .content {
    padding: 0 16px 0 20px;
    padding-top: 2rem;
    font-size: 13px;
    li {
      padding-bottom: 12px;
    }
  }
}
</style>