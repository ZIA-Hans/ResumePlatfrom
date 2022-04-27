<template>
  <!-- <el-button type="text" @click="dialogVisible = true"
    >click to open the Dialog</el-button
  > -->

  <el-dialog
    v-model="pExperienceVisible"
    title="Tips"
    width="70%"
    :before-close="handleClose"
  >

    <Wrapper :dataList = experienceList>
      <Form />
    </Wrapper>

  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import Wrapper from '../WrapperExperience/index.vue'
import Form from '../ProjectExperience/components/Form.vue'
import store from '../../../store'
import adapter from '../WrapperExperience/adapter'
import { hideWindows } from '../../../utils/resumeUtils'

provide('resumeFormKey', 'projectExperience');

let pExperienceVisible = computed({
  get() {
    return store.state.form_name.projectExperience
  },
  
  set() {
    hideWindows('projectExperience')
  }
});

const dataList = computed(() => store.state.ResumeData.projectExperience);

const experienceList = computed(() => adapter.project(dataList.value)) ;


const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      hideWindows('projectExperience')
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
