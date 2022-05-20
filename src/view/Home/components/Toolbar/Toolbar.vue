<template>
    
    <div class="toolbar">
        <MScrollBox :maxHeight="height" v-if="currentResumeComponent">
            <Frame />
            <Fill />
            <Font v-if="havenTextModule.includes(currentResumeComponent.componentName)" />
            <Content />
            <Code :componentStyle="currentResumeComponent.style" />
        </MScrollBox>

        <div class="empty_status" v-else>
            <el-empty description="暂无选中组件" style="height: 100vh;width: 100%"/>
        </div>
    </div>
    
</template>

<script>
import { computed, defineComponent } from 'vue'
import Frame from './components/Frame.vue'
import Fill from './components/Fill.vue'
import MScrollBox from '@C/M-ScrollBox/index.vue'
import Font from './components/Font.vue'
import Content from './components/Content.vue'
import Code from './components/Code.vue'
import store from '@/store';

export default defineComponent({
    components: {
        MScrollBox,
        Frame,
        Fill,
        Font,
        Content,
        Code
    },
    setup() {
        const havenTextModule = ['Button', 'AText'];
        // havenTextModule.includes
        // const height = document.body.clientHeight;
        const height = window.innerHeight;
        const currentResumeComponent = computed(() => store.state.currentResumeComponent);

        return {
            havenTextModule,
            height,
            currentResumeComponent
        }
    },
})
</script>

<style lang="less" scoped>
// .tool-container {
//     width: 300px;
//     box-shadow: 0 4px 12px rgba(40, 120, 255, 0.11), 0 3px 14px rgba(0, 0, 0, 0.11);
//     overflow-y: auto;
//     .tool-title {
//         padding: 12px;
//         background: rgba(0, 0, 0, 0.1);
//         font-size: 16px;
//     }
// }

.toolbar {
  width: 290px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(40, 120, 255, 0.11), 0 3px 14px rgba(0, 0, 0, 0.11);
  padding-bottom: 16px;

  .empty_status {
      width: 100%;
      height: 100vh;
  }
}

</style>
