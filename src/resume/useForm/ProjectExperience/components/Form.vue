<template>
    <div class="wrapper">
      <div class="flex">
        <div class="left">
          <span class="require">*</span>项目名 ：
        </div>
        <div class="right">
            <el-input 
                v-model="itemObj.projectName" 
                :disabled="!editModel.isEdit"
                placeholder="请输入项目名"
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
                v-model="itemObj.post" 
                :disabled="!editModel.isEdit"
                placeholder="在项目中担任什么职位"
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
                 v-model="itemObj.beginTime" 
                :disabled="!editModel.isEdit"
                placeholder="2015.09.01"
                clearable
                style="width: 280px"
                @change="updateDraft"
            />
            <span class="line">-</span>

            <el-input 
                v-model="itemObj.endTime" 
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
            v-model="itemObj.content" 
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
import { computed, defineComponent, reactive } from 'vue'
import store from '../../../../store';

export default defineComponent({
    setup() {
        const currentItem = computed(() =>  store.state.currentItem );
        const editModel = computed(() => store.state.editModel)

        let itemObj = reactive({});
        itemObj = currentItem;

        function updateDraft(e) {
            store.commit('updateEditContent', itemObj.value);
        }
        
        return {
          itemObj,
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