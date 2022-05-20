<template>
    <!-- <div>我是简历操作头部区</div> -->
    <div class="actions">
        <div class="back" @click="onBack" >返回</div>
        <MButton size="middle" class="export-btn" @click="exportPDF">
            <template v-slot:content>导出PDF</template>
        </MButton>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import MButton from '@C/M-button/index.vue'
import router from '@/router';
import { toPrintPdf } from '@/utils/htmlToPdf'

export default defineComponent({
    components: {
        MButton
    },
    setup() {
        const onBack = () => {
            router.go(-1);
        }
        
        const exportPDF = () => {
            ElMessageBox.prompt('导出简历名称为：')
            .then(({value}) => {
                value === '' ? toPrintPdf() : toPrintPdf(value);
                ElMessage({
                    type: 'success',
                    message: `导出名称为${value ? value : '未命名'}的简历`
                })
            })
            .catch(() => {

            })
        }
        return {
            onBack,
            exportPDF
        }
    },
})
</script>

<style lang="less" scoped>
.actions {
  box-sizing: border-box;
  padding: 12px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  .back {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    cursor: pointer;
  }
//   :global {
    .export-btn {
      text-align: center;
      background-color: #27292c;
      color: #ffffff;
    }
//   }
}
</style>