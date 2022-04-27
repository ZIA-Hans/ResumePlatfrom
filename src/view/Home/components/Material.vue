<template>
    <div class="material">
            <div class="logo">
                物料库
            </div>
            <div class="flex">
                <component
                    class="item" 
                    v-for="renderComponent in componentsData"
                    :key="renderComponent.id"
                    :is="renderComponent.name"
                    draggable="true"
                    @dragstart="handleDragStart"
                    :data-name="renderComponent.name"
                />
            </div>
    </div>
</template>

<script>
import { defineComponent , reactive } from 'vue'
import * as ComponentsList from '@C/index'
import { initComponentStyleStore } from '@/store/model/index'
import { getDomStyle } from '@/utils/componentUtils'

export default defineComponent({

    components: ComponentsList,
    setup() {
        // 将获得物料组件对象进行转换的方法
        const componentsData = Object.keys(ComponentsList).map((componentName, index) => {
            const renderComponent = {};
            renderComponent.name = componentName;
            renderComponent.id = `${componentName}_${index}`;
            return renderComponent
        })
    
        // 组件开始移动执行
        const handleDragStart = (e) => {
            const componentRef = e.target;
            let { name: componentName } = e.target.dataset;
            e.dataTransfer.setData('componentName', componentName);
            if(componentRef) {
                const compoentStore = {
                    ...initComponentStyleStore.Base,
                    ...initComponentStyleStore[componentName]
                }
                const styles = getDomStyle(componentRef, compoentStore);
                e.dataTransfer.setData('componentInnerText', componentRef.innerText || componentRef.children[0].src);
                e.dataTransfer.setData('compoentStyle', JSON.stringify(styles));
            }
        }

        return {
            componentsData,
            handleDragStart
        }
    },
})
</script>

<style lang="less" scoped>
.material {
    // height: 100vh;
    width: 250px;
    // flex-grow: 1;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(40, 120, 255, 0.11), 0 3px 14px rgba(0, 0, 0, 0.11);
    z-index: 2;
    .logo {
        height: 48px;
        line-height: 48px;
        padding-left: 12px;
        background: rgba(0, 0, 0, 0.1);
        font-size: 16px;
    }
    .wl-container {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 5px;
    }

    .flex {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        padding: 12px;
        justify-content: space-around;
        .item {
            margin-bottom: 12px;
            // margin-top: 12px;
        }
    }
}
</style>