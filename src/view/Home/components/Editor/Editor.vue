<template>
    <Shape
     v-for="(item, index) in resumeComponentsList"
    :key="item.id"
    :defaultStyle="item.style"
    :style="getWantProps(item.style, ['width', 'height', 'top', 'left'])"
    :index="index"
    @contextmenu="replaceMenu"
    @click="menuVisiable=false"
    >
        <component 
            :is="item.componentName"
            :styleObj="item.style"       
            :propVal="item.componentInnerText"     
        />
    </Shape>
    

    <ul class="menu" v-if="menuVisiable" :style="menuStyle">
        <li>
            <div >复制</div>
        </li>
        <li>
            <div @click="deleteComponent">删除</div>
        </li>
        <li>
            <div @click="addTopComponent">置顶</div>
        </li>
    </ul>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue'
import * as ComponentsList from '@C/index'
import Shape from './components/Shape.vue'
import store from '@/store/index'
import { reducePX, getWantProps } from '@/utils/componentUtils'

export default defineComponent({
    components: {
        ...ComponentsList,
        Shape
    },
    setup() {
        const menuVisiable = ref(false);
        const resumeComponentsList = computed(() => store.state.resumeComponentsList);
        
        const menuStyle = reactive({
            left: `0px`,
            top: `0px`
        })

        function replaceMenu(e) {
            e.preventDefault();
            menuVisiable.value = true;
            const left = reducePX(getStyle(e.currentTarget, 'left')) + e.offsetX;
            const top = reducePX(getStyle(e.currentTarget, 'top')) + e.offsetY;
            menuStyle.left = `${left}px`;
            menuStyle.top = `${top}px`;
        }

        function getStyle( obj , attr )
        {
            if ( window.getComputedStyle ) {
                return getComputedStyle( obj , null )[attr];
            }else{
                return obj.currentStyle[attr];
            }
        }

        const currentComponentIndex = computed(() => store.state.currentResumeComponentIndex);
        const currentResumeComponent = computed(() => store.state.currentResumeComponent);

        function addTopComponent(e) {

        }

        
        function deleteComponent(e) {
            store.commit('deleteComponent', currentComponentIndex.value);
            store.commit('clearCurrentComponentStatus');
            menuVisiable.value = false;
            
        }

        return {
            menuVisiable,
            resumeComponentsList,
            menuStyle,
            getWantProps,
            replaceMenu,
            addTopComponent,
            deleteComponent
        }
    },
})
</script>

<style lang="less" scoped>
.menu {
    position: absolute;
    text-decoration: none;
    list-style: none;
    border: 1px solid;
    div {
        border: 1px solid;
        padding: 5px 10px;
        cursor: pointer;
        background: grey;
        color: white;
    }
}
</style>