<template>
    <div class="text" :style="styleObj">
        text组件
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        styleObj: Object
    },
    setup() {
        
    },
})
</script>


<style lang="less" scoped>
.text {
    display: inline-block;
    height: 35px;
    line-height: 35px;
    letter-spacing: 0px;
    border: 1px solid;
    align-content: center;
    padding: 0 5px;
}
</style>