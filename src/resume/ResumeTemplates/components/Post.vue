<template>
    <div class="content">
        <p class="label">在校经历</p>
        <ul class="list">
            <li class="flex" v-for="(experience, index) in schoolExperience" :key="index">
                <div class="left">
                    <p>{{changeStandTime(experience.beginTime)}} - {{changeStandTime(experience.endTime)}}</p>
                    <p>{{experience.post}}</p>
                </div>
                <div class="right">
                    <p>{{experience.department}}</p>
                    <p>
                        <!-- {{experience.parseContent.join(',')}} -->
                        {{experience.content}}
                    </p>
                </div>
            </li>

            <!-- <li class="flex">
                <div class="left">
                    <p>2021.03-2021.06</p>
                    <p>前端工程师</p>
                </div>
                <div class="right">
                    <p>亚信科技广州节点</p>
                    <p>
                        担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用，任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理
                    </p>
                </div>
            </li> -->
        </ul>
    </div>
</template>


<script>
import { computed, defineComponent } from 'vue'
import store from '../../../store'
import { changeStandTime } from '../../../utils/resumeUtils'

export default defineComponent({
  setup() {
    const schoolExperience = computed(() => store.state.ResumeData.schoolExperience);
    return {
      schoolExperience,
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
      line-height: 22px;
    }
    .flex {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .left {
      width: 25%;
      color: rgba(0, 0, 0, 0.8);
      font-size: 13px;
      p:first-child {
        margin-bottom: 4px;
        // height: 18px;
        line-height: 18px;
        color: #01426f;
        font-weight: bold;
      }
    }
    .right {
      width: 75%;
      color: rgba(0, 0, 0, 0.8);
      font-size: 13px;
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


</style>