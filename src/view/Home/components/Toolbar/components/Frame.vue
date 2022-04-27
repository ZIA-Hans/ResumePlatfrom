<template>
    <div class="layout">
        <Title title="宽高" />
        <div class="box">
            <Label label="大小(px)" />
            <div class="wrapper">
                <NumberChangeStep 
                :defaultNum="reducePX(currentComponent.style.width)"
                :minNum="minNum"
                :maxNum="maxNum"
                updateProp="width"
                @numberChange="onNumChange"
                />
                <NumberChangeStep 
                :defaultNum="reducePX(currentComponent.style.height)"
                :minNum="minNum"
                :maxNum="maxNum"
                updateProp="height"
                @numberChange="onNumChange"
                />
            </div>
            <div class="desc">
                <Desc :descList= descList />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, reactive } from 'vue'
import Title from '@/common/components/Title.vue'
import Label from '@/common/components/Label.vue'
import NumberChangeStep from '@/common/components/NumberChangeStep.vue'
import Desc from '@/common/components/Desc.vue'
import { reducePX, onNumChange } from '@/utils/componentUtils'
import store from '@/store'

export default defineComponent({
    components: {
        Title,
        Label,
        NumberChangeStep,
        Desc
    },
    setup() {
        const minNum = ref(0);
        const maxNum = ref(1000);
        const descList = reactive(['宽度', '高度'])
        const currentComponent = computed(() => store.state.currentResumeComponent);

        // function onNumChange(numProp) {
        //     store.commit('updateComponentProps', {
        //         ...currentComponent.value.style,
        //         ...numProp
        //     })
        // }

        return {
            minNum,
            maxNum,
            currentComponent,
            descList,
            reducePX,
            onNumChange
        }
    },
})
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  .box {
      width: 100%;
      padding-left: 16px;
      margin: 16px 0;
      position: relative;
      box-sizing: border-box;
      &::after {
          content: '';
          display: block;
          clear: both;
      }
      .wrapper {
          width: 184px;
          float: left;
          display: inline-flex;
          justify-content: space-between;
      }
      .desc {
          width: 252px;
          margin-top: 4px;
          float: left;
      }
  }
}

</style>