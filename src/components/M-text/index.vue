<template>
    <div class="text" :style="styleObj">
        {{propVal}}
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        styleObj: Object,
        propVal: {
            type: String,
            default: '文本内容'
        }
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
    // padding: 0 5px;
}
</style>