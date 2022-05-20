<template>
    <div class="content">
        <div class="label">项目经历</div>
        <ul class="list">
            <li class="flex" v-for="(item, index) in projectExperience" :key="index">
                <div class="left">
                    <p>
                        <span>{{changeStandTime(item.beginTime)}} - {{changeStandTime(item.endTime)}}</span>
                    </p>
                </div>
                <div class="right">
                    <p>
                        <span>{{item.projectName}} - {{item.post}}</span>
                    </p>
                </div>
                <div class="text">
                    <ul class="item-box">
                        <!-- <li class="item-content" v-for="(content, cIndex) in item.parseContent" :key="cIndex">
                          <span>{{content}}</span>
                        </li> -->
                        <p>{{item.content}}</p>
                    </ul>
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
    const projectExperience = computed(() => store.state.ResumeData.projectExperience) 
    return {
      projectExperience,
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
    .flex {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;
      flex-wrap: wrap;

      .left {
        width: 25%;
        font-size: 13px;
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
      .text {
        width: 100%;
        ul.item-box {
          line-height: 20px;
          li.item-content {
            list-style: outside;
            margin-left: 18px;
            color: #345975;
            span {
              color: rgba(0, 0, 0, 0.8);
            }
          }
        }
      }
    }
    p {
      margin-bottom: 0px;
    }
  }
}


</style>