<template>
  <el-dialog
    v-model="certificateVisible"
    title="荣誉证书"
    width="40%"
    :before-close="handleClose"
  >
    <!-- <span>This is a message</span> -->
    <el-form
    label-position="left"
    label-width="100px"
    :model="formLabelAlign"
    >
        <el-form-item label="证 书">
            <el-input v-model="formLabelAlign.name" placeholder="互联网+大赛一等奖｜掘金大学骰王｜互联网喝酒大赛进步奖"></el-input>
        </el-form-item>
        <el-form-item label="tips">
            <div style="color: red">* 多个证书以 | 分割</div>
        </el-form-item>
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideWindows('certificate')">取消</el-button>
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
import { getItem, hideWindows } from '../../utils/resumeUtils'

const certificate = computed(() => store.state.ResumeData.certificate); 

const certificateVisible = computed({
  get() {
    return store.state.form_name.certificate
  },
  set() {
    hideWindows('certificate')
  }
})


const formLabelAlign = reactive({
  name: certificate.value,
})


function updateResumeData() {
  const key = 'certificate';
  const value = formLabelAlign.name;
  const payload = {
        key,
        value
    }
  store.commit('updateEasyData', payload);
  hideWindows('certificate')

}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      hideWindows('certificate')
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