<template>

  <el-dialog
    v-model="isFullDisplay"
    title="Tips"
    width="30%"
    :before-close="handleClose"
    fullscreen="true"
  >
    <div class="container">
      <div class="A4">
        <component 
            v-for="(item, index) in resumeComponentsList"
            :key="index"
            :is="item.componentName"
            :styleObj="item.style"       
            :propVal="item.componentInnerText"  
            style="position:absolute"   
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import * as ComponentsList from '../../../components/index'
import { ElMessageBox } from 'element-plus'
import store from '../../../store'

export default defineComponent({
  components: {
    ...ComponentsList
  },
  setup() {
    const isFullDisplay = computed(() => store.state.isFullDisplay);
    const resumeComponentsList = computed(() => store.state.resumeComponentsList);

    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          store.commit('changeScreenStatus');
          done()
        })
        .catch(() => {
          // catch error
        })
    }

    return {
      isFullDisplay,
      resumeComponentsList,
      handleClose
    }
  }
})
</script>




<style lang="less" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  width: 100%;
  height: 800px;
  .A4 {
    width: 800px;
    height: 600px;
    box-shadow: 0 4px 12px rgb(40 120 255 / 11%), 0 3px 14px rgb(0 0 0 / 11%);
    background-color: #fff;
    position: relative;
  }
}
</style>
