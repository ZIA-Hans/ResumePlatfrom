<template>
    <div class="L-container">
        <p class="title">基本信息</p>
        <ul class="content">
            <li>院校：{{base.school}}</li>
            <li>专业：{{base.major}}</li>
            <li>学历：{{base.degree}}</li>
            <li>学年：{{base.onSchoolTime.beginTime}} - {{base.onSchoolTime.endTime}}</li>
            <li>籍贯：{{base.area}}</li>
        </ul>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import store from '../../../store'
// import '../index.less';

export default defineComponent({
  setup() {
    const base = computed(() => store.state.ResumeData.base) 

    return {
      base
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