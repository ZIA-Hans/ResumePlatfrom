<template>
    <div class="form">
        <div class="left-box">
            <Left :dataList = dataList  />
        </div>
        <div class="right-box">
            <Right v-if="dataList.length">
                <Menu />
                <div class="content">
                    <slot></slot>
                </div>
            </Right>
            <div class="empty" v-else>
                <el-empty description="暂无条目数据" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import Left from './components/Left/index.vue'
import Right from './components/Right/index.vue'
import Menu from './components/Menu/index.vue'
import store from '../../../store'

export default defineComponent({
    components: {
        Left,
        Right,
        Menu
    },
    props : {
        dataList:  {
            type: Array,
            default: []
        },
        
    },
    setup(props) {
        let currentIndex = ref(0);
        let currentItem = ref({});

        currentItem = props.dataList[currentIndex.value];
        onMounted(() => {
            store.commit('changeCurrentChoose', {
                index: currentIndex.value,
                item: currentItem
            })
            store.commit('updateEditContent', currentItem);
        })

        return {

        }
    },
})
</script>

<style lang="less" scoped>
.form {
    display: flex;
    height: 480px;
    .left-box {
        width: 240px;
        height: 100%;
        box-sizing: border-box;
        border-right: 1px solid rgba(0, 0, 0, 0.07);
    }
    .right-box {
        flex: 1;
        height: 100%;
        margin: 0 20px;

        .empty {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
.content {
  padding: 24px 12px 0;
}
</style>
