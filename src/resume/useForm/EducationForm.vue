<template>
  <el-dialog
    v-model="educationVisible"
    title="教育信息"
    width="40%"
    :before-close="handleClose"
  >
    <!-- <span>This is a message</span> -->
    <el-form
    label-position="left"
    label-width="100px"
    :model="formLabelAlign"
    >
        <el-form-item label="学 校">
            <el-input v-model="formLabelAlign.name" placeholder="请输入你所就读的学校"></el-input>
        </el-form-item>
        <el-form-item label="专 业">
            <el-input v-model="formLabelAlign.major" placeholder="请输入你所就读的专业"></el-input>
        </el-form-item>
        <el-form-item label="学 位">
            <el-input v-model="formLabelAlign.degree" placeholder="学士？硕士？博士？"></el-input>
        </el-form-item>
        <el-form-item label="学 年">
            <el-input v-model="formLabelAlign.years" placeholder="入学时间 - 结业时间"></el-input>
        </el-form-item>
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideWindows('education')">取消</el-button>
        <el-button type="primary" @click="updateResumeData"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import store from '../../store'
import { hideWindows } from '../../utils/resumeUtils'

const base = computed(() => store.state.ResumeData.base) ;

const educationVisible = computed({
  get() {
    return store.state.form_name.education
  },
  
  set() {
    hideWindows('education');
  }
})

const formLabelAlign = reactive({
  name: base.value.school,
  major: base.value.major,
  degree: base.value.degree,
  years: base.value.onSchoolTime.beginTime + '-' + base.value.onSchoolTime.endTime
})

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      hideWindows('education')
      done()
    })
    .catch(() => {
      // catch error
    })
}

function updateResumeData() {
    const key = 'base';
    const years = formLabelAlign.years.split('-');
    const value = {
      school: formLabelAlign.name,
      major: formLabelAlign.major,
      degree: formLabelAlign.degree,
      onSchoolTime: {
        beginTime: years[0],
        endTime: years[1]
      }
    };
    
    const payload = {
        key,
        value
    }
    store.commit('updateEasyData', payload);
    hideWindows('education')
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>