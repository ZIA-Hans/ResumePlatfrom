<template>
  <!-- <el-button type="text" @click="dialogVisible = true"
    >click to open the Dialog</el-button
  > -->

  <el-dialog
    v-model="sExperienceVisible"
    title="Tips"
    width="70%"
    :before-close="handleClose"
    destroy-on-close
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
import Form from '../SchoolExperience/components/Form.vue'
import store from '../../../store'
import adapter from '../WrapperExperience/adapter'
import { hideWindows } from '../../../utils/resumeUtils'

provide('resumeFormKey', 'schoolExperience')

const dataList = computed(() => store.state.ResumeData.schoolExperience);

let sExperienceVisible = computed({
  get() {
    return store.state.form_name.schoolExperience
  },
  
  set() {
    hideWindows('schoolExperience')
  }
});

let experienceList = computed(() => adapter.school(dataList.value));


const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否要关闭当前弹窗？')
    .then(() => {
      hideWindows('schoolExperience')
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
