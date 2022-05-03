<template>

  <el-dialog
    v-model="personalVisible"
    title="个人信息"
    width="40%"
    :before-close="handleClose"
    destroy-on-close
  >
    <!-- <span>This is a message</span> -->
    <el-form
    label-position="left"
    label-width="100px"
    :model="formLabelAlign"
    >
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="formLabelAlign.area" placeholder="请输入籍贯"></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input v-model="formLabelAlign.hobby" placeholder="你有什么爱好呢?"></el-input>
        </el-form-item>
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideWindows('personal')">取消</el-button>
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
import { getItem, hideWindows, setItem } from '../../utils/resumeUtils'

const base = computed(() => store.state.ResumeData.base);

const personalVisible = computed({
  get() {
    return store.state.form_name.personal
  },
  set() {
    hideWindows('personal');
  }
})


const formLabelAlign = reactive({
  username: base.value.username,
  area: base.value.area,
  hobby: base.value.hobby,
})

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      hideWindows('personal')
      done()
    })
    .catch(() => {
      // catch error
    })
}

function updateResumeData() {
    const key = 'base';
    const value = formLabelAlign;
    const payload = {
        key,
        value
    }

    store.commit('updateEasyData', payload);
    hideWindows('personal');
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>