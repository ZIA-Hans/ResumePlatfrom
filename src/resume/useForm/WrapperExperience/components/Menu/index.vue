<template>
    <div class="menu">
        <div class="left">
            <h2 class="title">{{ currentItem?.title || '没有存在条目' }}</h2>
        </div>
        <div class="right">
            <div v-if="editModel.isEdit">
                <div class="btn cancel" @click="changeEditStatus(false)">
                    取消
                </div>
                <div class="btn save" @click="saveEditContent">
                    保存
                </div>
            </div>

            <div v-else>
                <div class="btn cancel" @click="changeEditStatus(true)">
                    编辑
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'
import store from '../../../../../store'
import { changeEditStatus } from '../../../../../utils/resumeUtils' 

export default defineComponent({
    setup() {
        const resumeFormKey = inject('resumeFormKey');
        const currentItem = computed(() => store.state.currentItem) ;
        // const dataList = computed(() => store.state.ResumeData)
        // const currentIndex = computed(() => store.state.currentIndex);
        const editModel = computed(() => store.state.editModel);

        function saveEditContent() {
          store.commit('updateComplexData', {
            resumeFormKey,
            value: editModel.value.draft
          });
          changeEditStatus(false);
        }

        return {
          currentItem,
          editModel,
          changeEditStatus,
          saveEditContent
        }
    },
})
</script>

<style lang="less" scoped>
.menu {
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  position: relative;
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  .left {
    .title {
      width: 420px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .right {
    .btn {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      width: 60px;
      border-radius: 24px;
      text-align: center;
      display: inline-block;
      margin-right: 12px;
      cursor: pointer;
      &:last-child {
        margin-right: 0px;
      }
    }
    .save {
      background-color: #fed634;
      &:hover {
        background-color: #fbdc5d;
      }
    }
    .cancel {
      border: 1px solid rgba(0, 0, 0, 0.07);
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
}
</style>