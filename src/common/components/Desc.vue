<template>
    <div class="desc">
        <div class="flex">
            <div class="item" v-for="(item, index) in descList" :key="index">
                {{item}}
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        descList: {
            type: Array,
            default: []
        }
    },
    setup() {
        
    },
})
</script>

<style lang="less" scoped>
.desc {
  width: 100%;
  .flex {
    padding-left: 76px;
    display: flex;
    justify-content: space-around;
    flex: 1;
    .item {
      height: 20px;
      color: #757575;
      font-size: 12px;
      line-height: 20px;
    }
  }
}

</style>