<template>
    <span class="text">{{label}}</span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    setup() {
        
    }
})
</script>

<style lang="less" scoped>
.text {
  width: 76px;
  float: left;
  line-height: 38px;
  height: 38px;
  font-size: 14px;
  color: #6e747d;
}
</style>