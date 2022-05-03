<template>
  <el-dialog
    v-model="contactVisible"
    title="联系方式"
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
        <el-form-item label="电 话">
            <el-input v-model="formLabelAlign.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱">
            <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideWindows('contact')">取消</el-button>
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

const contact = computed(() => store.state.ResumeData.contact) ;

const contactVisible = computed({
  get() {
    return store.state.form_name.contact
  },
  
  set() {
    hideWindows('contact')
  }
})

const formLabelAlign = reactive({
  phone: contact.value.phone,
  email: contact.value.email
});

function updateResumeData() {
  const key = 'contact';
    const value = formLabelAlign;
    const payload = {
        key,
        value
    }
    store.commit('updateEasyData', payload);
    hideWindows('contact')
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      hideWindows('contact')
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