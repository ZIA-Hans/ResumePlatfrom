<template>
    <div class="experience-list">
        <div class="experience-item " 
        :class="{'is-select' : index === currentIndex}" 
        v-for="(item, index) in dataList" :key="index"
        @click="changeCurrentItem(item, index)"
        >
            <div class="experience-item-box">
                <div class="experience-item-title">{{item.title}}</div>
                <div class="experience-item-date">{{ standTime(item.beginTime) }}</div>
            </div>
            <div class="experience-item-action">
                <div class="experience-delete">
                  <div>
                    <i class="toutiao toutiao-guanbi"></i>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { ElMessageBox } from 'element-plus'
import store from '../../../../../../store'
import { changeStandTime } from '../../../../../../utils/resumeUtils'

export default defineComponent({
    props: {
        dataList:  {
            type: Array,
            default: []
        },
    },
    setup(props) {

        const currentIndex = computed(() => store.state.currentIndex);
        const editModel = computed(() => store.state.editModel);

        function changeCurrentItem(currentItem, currentIndex) {
          // 更改当前选中的item
          store.commit('changeCurrentChoose', {
            index: currentIndex,
            item: currentItem
          })
          // 判断是否在编辑状态
          if(editModel.value.isEdit) {
            ElMessageBox.confirm('正在编辑内容，需要保存编辑的内容吗')
              .then(() => {
                // 切换item时要写的逻辑，是否将草稿替换到真实数据里，取消编辑状态
                done()
              })
              .catch(() => {
                // 不保存，草稿清空，取消编辑状态
              })
          } 
          store.commit('updateEditContent', currentItem);
        }
        
        function standTime(time) {
          return typeof(time) === 'number' ? changeStandTime(time) : time;
        }
        
        return {
          currentIndex,
          changeCurrentItem,
          changeStandTime,
          standTime
        }
    },
})
</script>

<style lang="less" scoped>
.experience-list {
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #fff;
  transition: all 0.5s ease;
  .experience-item {
    height: 60px;
    color: #464646;
    position: relative;
    padding: 8px 16px 0 12px;
    box-sizing: border-box;
    &:hover {
      .experience-item-action {
        display: block;
      }
    }
    &.is-select {
      border-left: 3px solid #fed634 !important;
    }
    .experience-item-box {
      cursor: pointer;
      height: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #ebebeb;
      .experience-item-title {
        height: 24px;
        font-size: 14px;
        line-height: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 700;
      }
      .experience-item-date {
        position: relative;
        margin-right: 16px;
        width: 100%;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.4);
        line-height: 24px;
      }
    }
    .experience-item-action {
      position: absolute;
      bottom: 2px;
      right: -16px;
      width: 48px;
      display: none;
      img {
        width: 16px;
        height: 16px;
      }
      .experience-edit,
      .experience-delete {
        cursor: pointer;
        margin: 0 8px;
        display: inline-block;
      }
    }
  }
  .empty {
    text-align: center;
    .empty-tips {
      margin-top: 128px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>