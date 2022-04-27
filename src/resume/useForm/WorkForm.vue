<template>
  <el-dialog
    v-model="workVisible"
    title="工作期望"
    width="40%"
    :before-close="handleClose"
  >
    <!-- <span>This is a message</span> -->
    <el-form
    label-position="left"
    label-width="100px"
    :model="formLabelAlign"
    >
        <el-form-item label="职 位">
            <el-input v-model="formLabelAlign.job" placeholder="求职岗位"></el-input>
        </el-form-item>
        <el-form-item label="城 市">
            <el-input v-model="formLabelAlign.city" placeholder="请输入意愿城市"></el-input>
        </el-form-item>
        <el-form-item label="tips">
            <div style="color: red">* 多个地点以｜分割</div>
        </el-form-item>
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideWindows('workPrefer')">取消</el-button>
        <el-button type="primary" @click="updateResumeData('workPrefer', 'work', formLabelAlign)"
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
import { hideWindows, updateResumeData }  from '../../utils/resumeUtils'

const work = store.state.ResumeData.work;

const workVisible = computed({
  get() {
    return store.state.form_name.workPrefer
  },
  set() {
    hideWindows('workPrefer');
  }
})

const formLabelAlign = reactive({
  job: work.job,
  city: work.city
})

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      hideWindows('workPrefer');
      done()
    })
    .catch(() => {
      // catch error
    })
}
// function updateResumeData() {
//   const key = 'work';
//   const value = formLabelAlign;
//   const payload = {
//     key,
//     value
//   }
//   store.commit('updateEasyData', payload);
//   hideWindows('workPrefer');
// }


</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>