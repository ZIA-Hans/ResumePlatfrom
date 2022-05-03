<template>

  <el-dialog
    v-model="wExperienceVisible"
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
import { computed, provide, reactive, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import Wrapper from '../WrapperExperience/index.vue'
import Form from '../WorkExperience/components/Form.vue'
import store from '../../../store'
import adapter from '../WrapperExperience/adapter'
import { hideWindows } from '../../../utils/resumeUtils'

provide('resumeFormKey', 'workExperience')


let wExperienceVisible = computed({
  get() {
    return store.state.form_name.workExperience
  },
  set() {
    hideWindows('workExperience');
  }
})

const dataList =  computed(() => store.state.ResumeData.workExperience) 

let experienceList = computed(() => adapter.work(dataList.value)) ;

const editModel = computed(() => store.state.editModel);


const handleClose = (done: () => void) => {
  if(editModel.value.isEdit) {
    ElMessageBox.confirm('正在编辑内容，需要保存编辑的内容吗')
      .then(() => {
        hideWindows('workExperience');
        done()
      })
      .catch(() => {

      })
  } 
  else {
    ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      hideWindows('workExperience');
      done()
    })
    .catch(() => {
      // catch error
    })
  } 
}

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
