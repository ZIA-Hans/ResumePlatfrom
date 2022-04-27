<template>
    <div class="win-container">
        <Header 
        :width="reducePX(style.width)" 
        :height="reducePX(style.height)" 
        @changeWidth="changeWidth"
        @changeHeight="changeHeight"
        />

        <div class="drawContent"
        :style="style"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @click="handleBlankArea"
        id="visPdf"
        >
            <Editor />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue'
import store from '@/store/index'
import Editor from '../Editor/Editor.vue'
import Header from './components/Head.vue'
import { reducePX } from '@/utils/componentUtils'
 
export default defineComponent({
    components: {
        Header,
        Editor
    },
    setup() {
        const style = reactive({
            width: '800px',
            height: '600px'
        })

        function changeWidth(width) {
            style.width = `${width}px`;
        }

        function changeHeight(height) {
            style.height = `${height}px`;
        }
        const componentsData = computed(() => store.state.resumeComponentsList);

        const handleDrop = (e) => {
            let { offsetX, offsetY} = e;
            e.preventDefault();
            e.stopPropagation();
            const componentName = e.dataTransfer.getData('componentName');
            const componentInnerText = e.dataTransfer.getData('componentInnerText');
            let componentDomStyle = {};
            componentDomStyle = JSON.parse(e.dataTransfer.getData('compoentStyle'));
            let componentData = {
                componentName,
                componentInnerText,
                style: {
                    ...componentDomStyle,
                    left: `${offsetX}px`,
                    top: `${offsetY}px`,
                    zIndex: componentsData.value.length
                }
            }
            store.commit('addComponent', componentData);
        }

        const handleDragOver = (e) => {
            e.preventDefault()
        }
        
        function handleBlankArea(e) {
            e.preventDefault();
            e.stopPropagation();
            store.commit('clearCurrentComponentStatus');
        }
        return {
            style,
            changeWidth,
            changeHeight,
            componentsData,
            reducePX,
            handleDrop,
            handleDragOver,
            handleBlankArea
        }
    },
})
</script>

<style lang="less" scoped>
.win-container {
    background: #eee;
    width: 1000px;
    min-height: 100vh;
    .drawContent {
        position: relative;
        background-color: #ffffff;
        margin: 48px auto 0;
        box-shadow: 0 4px 12px rgba(40, 120, 255, 0.11), 0 3px 14px rgba(0, 0, 0, 0.11);
    }
}
</style>
