<template>
    <div class="wrapper"
     :class="{active : isActive}"
     @click="selectComponent"
     @mousedown="mouseDown"
    >
        <div 
            class="points" 
            v-for="point in (isActive ? points : [])" 
            :key="point"
            :style="getPointPosition(point)"
            @mousedown="mouseDownPoint(point, $event)"
        />
        <slot></slot>
    </div>
</template>

<script>
import { computed, defineComponent, ref, toRefs } from 'vue'
import store from '@/store';
import { reducePX } from '@/utils/componentUtils'

export default defineComponent({
    props: {
        index: {
            type: Number
        },
        defaultStyle: {
            type: Object,
            default: {}
        }
    },
    setup(props, ctx) {
        const { defaultStyle } = toRefs(props)
        const resumeComponentsList = computed(() => store.state.resumeComponentsList);
        const currentResumeIndex = computed(() => store.state.currentResumeComponentIndex);
        const currentResumeComponent = computed(() => store.state.currentResumeComponent);

        const width = computed(() => reducePX(defaultStyle.value.width));
        const height = computed(() => reducePX(defaultStyle.value.height));
        
        const points = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'];
        const cursor = {
            lt: 'nw',
            t: 'n',
            rt: 'ne',
            r: 'e',
            rb: 'se',
            b: 's',
            lb: 'sw',
            l: 'w'
        }

        const isActive = computed(() => props.index === currentResumeIndex.value);

        function getPointPosition(point) {

            const hasT = /t/.test(point);
            const hasB = /b/.test(point);
            const hasL = /l/.test(point);
            const hasR = /r/.test(point);

            let offsetX = 0;
            let offsetY = 0;

            if(point.length === 2) {
                offsetX = hasL ? 0 : width.value;
                offsetY = hasT ? 0 : height.value;
            } else {
                // 上下两点居中，高度是0或者height
                if(hasT || hasB) {
                    offsetX = width.value / 2;
                    offsetY = hasT ? 0 : height.value;
                }

                // 左右两点计算
                if(hasL || hasR) {
                    offsetX = hasL ? 0 : width.value;
                    offsetY = Math.floor(height.value / 2);
                }
            }

            return {
                marginLeft: '-4px',
                marginTop: '-4px',
                left: `${offsetX}px`,
                top: `${offsetY}px`,
                cursor: `${cursor[point]}-resize`
            }
        }

        function selectComponent(e) {
            const currentComponentIndex = props.index;
            e.stopPropagation();
            // 设置当前选中组件
            store.commit('setCurrentComponentStatus', currentComponentIndex);
        }

        function mouseDown(e) {
            e.stopPropagation();
            e.preventDefault();
            const currentComponentIndex = props.index;
            const currentComponent = resumeComponentsList.value[currentComponentIndex];

            // 屏蔽除左键以外的按键
            if(e.button !== 0) {
                return
            }

            // 鼠标按下去记录初始距离视口的距离
            const x = e.clientX;
            const y = e.clientY;

            // 获得未移动前，组件与画布的距离

            const left = reducePX(currentComponent.style.left) || 0;
            const top = reducePX(currentComponent.style.top) || 0;

            // 改变手势
            const cursor = 'move';

            // 移动事件
            const mouseMove = (e) => {

                // 获得移动过程与视口的距离
                const currentX = e.clientX;
                const currentY = e.clientY;

                // 把原先的组件样式与新移动的位置进行合并
                const updateStyle = {
                    ...currentComponent.style,
                    top: `${currentY - y + top}px`,
                    left: `${currentX - x + left}px`,
                    cursor
                }
                store.commit('updateComponentPosition', {
                    currentComponentIndex,
                    updateStyle
                });
            }

            const mouseUp = () => {
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp)
            }
            
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp)
        }

        function mouseDownPoint(point, e) {
            e.stopPropagation();
            e.preventDefault();

            if(e.button !== 0) {
                return
            }

            const x = e.clientX;
            const y = e.clientY;

            const left = reducePX(currentResumeComponent.value.style.left);
            const top = reducePX(currentResumeComponent.value.style.top);

            const width = reducePX(currentResumeComponent.value.style.width);
            const height = reducePX(currentResumeComponent.value.style.height);

            const hasT = /t/.test(point);
            const hasB = /b/.test(point);
            const hasL = /l/.test(point);
            const hasR = /r/.test(point);
            
            const movePointPos = (e) => {
                const currentX = e.clientX;
                const currentY = e.clientY;

                let incrementX = currentX - x;
                let incrementY = currentY - y;
                store.commit('updateComponentProps', {
                    ...currentResumeComponent.value.style,
                    width: `${width + (hasL ? - incrementX : hasR ? incrementX : 0)}px`,
                    height: `${height + (hasT ? -incrementY : hasB ? incrementY : 0)}px` ,
                    left: `${left + (hasL ? incrementX : 0)}px`,
                    top: `${top + (hasT ? incrementY : 0)}px`
                });
            }

            const pointMouseUp = (e) => {
                document.removeEventListener('mousemove', movePointPos);
                document.removeEventListener('mouseup', pointMouseUp);
            }

            document.addEventListener('mousemove', movePointPos);
            document.addEventListener('mouseup', pointMouseUp);
        }

        return {
            points,
            currentResumeIndex,
            isActive,
            selectComponent,
            getPointPosition,
            reducePX,
            mouseDown,
            mouseDownPoint
        }
    },
})
</script>

<style lang="less" scoped>
.wrapper {
    position: absolute;
    // left: 50px;
    .points {
        position: absolute;
        background: #fff;
        border: 1px solid #59c7f9;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        z-index: 1;
    }
    
}

.active {
        outline: 1px solid #70c0ff;
        user-select: none;
        // border: 1px solid #70c0ff;
    }

</style>