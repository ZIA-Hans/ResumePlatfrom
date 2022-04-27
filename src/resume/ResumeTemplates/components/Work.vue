<template>
    <div class="content">
        <p class="label">工作经历</p>
        <ul class="list">
            <li class="flex" v-for="(work, index) in workExperience" :key="index">
                <div class="left">
                    <p>{{changeStandTime(work.beginTime)}}-{{changeStandTime(work.endTime)}}</p>
                    <p>{{work.post}}</p>
                </div>
                <div class="right">
                    <p>{{work.department}}</p>
                    <p>{{work.parseContent.join()}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
import { computed, defineComponent } from 'vue'
import store from '../../../store'
import { changeStandTime } from '../../../utils/resumeUtils'

export default defineComponent({
  setup() {
    const workExperience = computed(() => store.state.ResumeData.workExperience) 

    return {
      workExperience,
      changeStandTime
    }
  },
})
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  position: relative;
  .label {
    padding-bottom: 8px;
    color: #01426f;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0px;
    border-bottom: 1px solid #eee;
  }
  .list {
    padding-top: 12px;
    padding-bottom: 32px;
    font-size: 13px;
    p {
      margin-bottom: 0px;
      line-height: 20px;
    }
    .flex {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;
      flex-wrap: wrap;
      .left {
        width: 25%;
        p:first-child {
          margin-bottom: 4px;
          height: 18px;
          line-height: 18px;
          color: #01426f;
          font-weight: bold;
        }
      }
      .right {
        width: 75%;
        p:first-child {
          margin-bottom: 4px;
          height: 18px;
          line-height: 18px;
          color: #01426f;
          font-weight: bold;
        }
      }
    }
  }
}


</style>