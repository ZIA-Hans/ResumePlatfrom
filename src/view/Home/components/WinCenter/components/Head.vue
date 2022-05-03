<template>
    <div class="operationBar">
            <el-button plain @click="goback">返回</el-button>
            <el-switch
                v-model="isFullDisplay"
                class="mb-2"
                inactive-text="全屏显示"
            />
            <div class="sizeBox">
                <span>宽度</span>
                <input type="text" placeholder="Please Input" class="input" :value="width" @change="changeWidth">
            </div>
            <div class="sizeBox">
                <span>高度</span>
                <input type="text" placeholder="Please Input" class="input" :value="height" @change="changeHeight">
            </div>
            <el-button plain @click="clearAllEditor" :disabled="editorComponentsList.length === 0">清空画布</el-button>
            <el-button plain  :disabled="editorComponentsList.length === 0" @click="saveComData">保存</el-button>
            <el-button plain @click="exportComJSON">导出画布数据</el-button>
    </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import router from '@/router';
import store from '@/store';
import { ElMessage, ElMessageBox } from 'element-plus'
import { setItem } from '../../../../../utils/resumeUtils';

export default defineComponent({
    props: {
        width: {
            type: Number,
            default: 700
        },
        height: {
            type: Number,
            default: 500
        }
    },
    setup(props, ctx) {
        // const isReapeat = ref(false);
        const isFullDisplay = computed({
            get() {
                return store.state.isFullDisplay
            },
            set() {
                store.commit('changeScreenStatus')
            }
        });
        
        function goback(e) {
            router.go(-1);
        }

        function changeWidth(e) {
            let currentWidth = e.target.value;
            ctx.emit('changeWidth', currentWidth);
        }

        function changeHeight(e) {
            let currentHeight = e.target.value;
            ctx.emit('changeHeight', currentHeight);
        }
        
        const editorComponentsList = computed(() => store.state.resumeComponentsList);

        function clearAllEditor(e) {
            store.commit('clearComponentList');
        }
        const currentComponentIndex = computed(() => store.state.currentResumeComponentIndex);
        const currentResumeComponent = computed(() => store.state.currentResumeComponent);
        
        function deleteComponent(e) {
            store.commit('deleteComponent', currentComponentIndex.value);
            store.commit('clearCurrentComponentStatus');
        }
        const resumeComponentsList = store.state.resumeComponentsList;

        function saveComData(e) {
            setItem('resumeComponentsData', resumeComponentsList);
            ElMessage({
                message: '页面组件数据成功保存',
                type: 'success',
            })
        }
        
        function exportComJSON(e) {
        ElMessageBox.alert(`画布数据：${JSON.stringify(resumeComponentsList)}`, 'Title', {
            confirmButtonText: 'OK',
            callback: (action) => {
            ElMessage({
                type: 'info',
                message: `画布数据已负责到剪切板`,
            })
            },
        })

        }
        return {
            isFullDisplay,
            goback,
            changeWidth,
            changeHeight,
            editorComponentsList,
            clearAllEditor,
            currentResumeComponent,
            deleteComponent,
            saveComData,
            exportComJSON
        }
    },
})
</script>


<style lang="less" scoped>
.operationBar {
        width: 100%;
        min-height: 50px;
        background: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 5px 10px;
        box-sizing: border-box;

        .sizeBox {
            display: flex;
            // padding: 0 10px;
            justify-content: space-around;
            align-items: center;

            .input {
                width: 100%;
                height: 30px;
                border-radius: 4px;
                background: #f4f7fd;
                text-align: center;
                direction: ltr;
                outline: none;
                border: none;
                transition: all ease-in-out 0.1s; 
            }
            .input:focus {
                box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
                border: 2px solid #40a9ff;
            }
        }
    }
</style>