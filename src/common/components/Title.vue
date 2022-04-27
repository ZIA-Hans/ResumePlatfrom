<template>
    <h3 class="title">{{title}}</h3>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    setup() {

    }
})
</script>

<style lang="less" scoped>
.title {
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  padding: 0 16px;
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
  background-color: #f4f7fd;
}
</style>