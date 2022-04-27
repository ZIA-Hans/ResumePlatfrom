<template>
    <div class="layout-left">
        <div v-if="dataList.length !== 0">
            <div class="scroll-box">
                <List :dataList = dataList />
            </div>
            <div class="action">
                <MyButton size="middle" @click="addExperienceItem">
                    <template v-slot:content>添加条目</template>
                </MyButton>
            </div>
        </div>


            <div class="empty" v-else>
                <div class="empty-tips">还没有内容，快添加一下吧~</div>
                <div class="empty-action">
                    <MyButton size="middle" @click="addExperienceItem">
                        <template v-slot:content>添加条目</template>
                    </MyButton>
                </div>
            </div>
    </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import MyButton from '../../../../../components/M-button/index.vue'
import store from '../../../../../store'
import List from '../Left/List/index.vue'
import adapter from '../../adapter'

export default defineComponent({
    components: {
        MyButton,
        List
    },
    props: {
        dataList:  {
            type: Array,
            default: []
        },
    },
    setup(props) {
        const resumeFormKey = inject('resumeFormKey');
        
        function addExperienceItem() {
            const currentArr = [...props.dataList];
            let index = 0;
            let addItem = {
                title: '未命名项目',
                [resumeFormKey === 'projectExperience' ? 'projectName' : 'department']: '未命名项目',
                beginTime: -1,
                endTime: Date.now(),
                post: '',
                content: '',
                parseContent: [],
            }
            currentArr.unshift(addItem);
            let item = currentArr[index];
            store.commit('addComplexData', {
                currentArr,
                resumeFormKey
            });
            store.commit('changeCurrentChoose', {
                index,
                // item: resumeFormKey === 'projectExperience' ? adapter.project(item) : 
                // resumeFormKey === 'workExperience' ? adapter.work(item) : adapter.school(item)
                item
            })
        }

        return {
            addExperienceItem
        }
    },
})
</script>

<style lang="less" scoped>
.layout-left {
  position: relative;
  height: 100%;

  .scroll-box {
      height: 420px;  
  }
  .scroll-box::-webkit-scrollbar{
        display: none;
    }
    
  .action {
    height: 60px;
    line-height: 60px;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
  .empty {
    text-align: center;
    .empty-tips {
      margin-top: 128px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.4);
    }
    .empty-action {
      margin-top: 12px;
      text-align: center;
    }
  }
}
</style>