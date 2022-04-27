<template>
    <div class="wrapper">
      <div class="flex">
        <div class="left">
          <span class="require">*</span>公司 ：
        </div>
        <div class="right">
          <el-input 
            v-model="itemInfo.department" 
            :disabled="!editModel.isEdit"
            placeholder="请输入之前就职的公司"
            clearable 
            @change="updateDraft"
         />
        </div>
      </div>
      <div class="flex">
        <div class="left">
          <span class="require">*</span>职 位 ：
        </div>
        <div class="right">
          <el-input 
            v-model="itemInfo.post" 
            :disabled="!editModel.isEdit"
            placeholder="期间担任什么职位"
            clearable 
            @change="updateDraft"
         />
        </div>
      </div>
      <div class="flex">
        <div class="left">
          <span class="require">*</span>时 间 ：
        </div>
        <div class="right">
          <el-input 
            v-model="itemInfo.beginTime" 
            :disabled="!editModel.isEdit"
            placeholder="2015.09.01"
            clearable
            style="width: 280px"
            @change="updateDraft"
           />
          <span class="line">-</span>
          <el-input 
            v-model="itemInfo.endTime" 
            :disabled="!editModel.isEdit"
            placeholder="2015.09.01"
            clearable 
            style="width: 280px"
            @change="updateDraft"
        />
        </div>
      </div>
      <div class="flex">
        <div class="left">
          <span class="require">*</span>内 容 ：
        </div>
        <div class="right">
          <el-input 
            type="textarea"
            v-model="itemInfo.content" 
            :disabled="!editModel.isEdit"
            placeholder="任职期间主要工作是什么呢？"
            :autosize="{ minRows: 10, maxRows: 10 }"
            clearable 
            @change="updateDraft"
          />
        </div>
      </div>
    </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'
import store from '../../../../store';

export default defineComponent({
  setup(props) {
    const resumeFormKey = inject('resumeFormKey');
    const currentItem = computed(() => store.state.currentItem);
    const editModel = computed(() => store.state.editModel);

    let itemInfo = {
      // title: '',
      department: '',
      post: '',
      beginTime: '',
      endTime: '',
      content: ''
    };
    itemInfo = currentItem;
    

    function updateDraft(e) {
      store.commit('updateEditContent', itemInfo.value);
    }

    return {
      itemInfo,
      editModel,
      updateDraft
    }
  },
})
</script>

<style lang="less" scoped>
.wrapper {
  .flex {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 12px;
    font-size: 14px;
    .left {
      width: 80px;
      margin-top: 12px;
      color: rgba(0, 0, 0, 0.6);
      span.require {
        color: rgb(240, 70, 70);
        margin-right: 6px;
      }
    }
    .right {
      flex: 1;
      span.line {
        margin: 0 12px 0 11px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>