<template>
  <el-dialog
    v-model="skillVisible"
    title="技能清单"
    width="40%"
    :before-close="handleClose"
  >
    <!-- <span>This is a message</span> -->
    <el-form
    label-position="left"
    label-width="100px"
    :model="formLabelAlign"
    >
        <el-form-item label="技能清单">
            <el-input v-model="formLabelAlign.skill" placeholder="例如 Vue、React"></el-input>
        </el-form-item>
        <el-form-item label="tips">
            <div style="color: red">* 多个技能以 | 分割</div>
        </el-form-item>
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hideWindows('skill')">取消</el-button>
        <el-button type="primary" @click="updateResumeData('skill', 'skill', formLabelAlign)"
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
import { hideWindows, updateResumeData } from '../../utils/resumeUtils'

const skill = computed(() => store.state.ResumeData.skill.skills);


const skillVisible = computed({
  get() {
    return store.state.form_name.skill
  },
  set() {
    hideWindows('skill')
  }
})

const formLabelAlign = reactive({
  skill: skill.value
})

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      hideWindows('skill')
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