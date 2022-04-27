<template>
    <div class="font">
        <Title title="文字" />
        <div class="box">
            <Label label="大小(px)" />
            <div class="wrapper">
                <NumberChangeStep 
                  :defaultNum="reducePX(currentResumeComponent.style.fontSize)"
                  :minNum="minNum"
                  :maxNum="maxNum"
                  updateProp="fontSize"
                  @numberChange="onNumChange"
                />
            </div>
        </div>
        <div class="box">
            <Label label="空间(px)" />
            <div class="wrapper">
                <NumberChangeStep 
                  :defaultNum="reducePX(currentResumeComponent.style.lineHeight)"
                  :minNum="minNum"
                  :maxNum="maxNum"
                  updateProp="lineHeight"
                  @numberChange="onNumChange"
                />
                <NumberChangeStep 
                  :defaultNum="reducePX(currentResumeComponent.style.letterSpacing)"
                  :minNum="minNum"
                  :maxNum="maxNum"
                  updateProp="letterSpacing"
                />
            </div>
            <div class="desc">
                <Desc :descList="descList" />
            </div>
        </div>
        <div class="box">
            <Label label="颜色" />
            <div class="wrapper">
                <Input
                  type="color" 
                  :defaultVal="currentResumeComponent.style.color"
                  updateProp="color"
                  @updateInput="onNumChange"
                /> 
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import Title from '@/common/components/Title.vue'
import Label from '@/common/components/Label.vue'
import Input from '@/common/components/Input.vue'
import Desc from '@/common/components/Desc.vue'
import NumberChangeStep from '@/common/components/NumberChangeStep.vue'
import store from '@/store'
import { reducePX, onNumChange } from '@/utils/componentUtils'


export default defineComponent({
    components: {
        Title,
        Label,
        Input,
        Desc,
        NumberChangeStep
    },
    setup() {
        const currentResumeComponent = computed(() => store.state.currentResumeComponent);
        const descList = ['字间距', '行间距'];
        const minNum = 0;
        const maxNum = 1000;
        
        return {
            currentResumeComponent,
            descList,
            minNum,
            maxNum,
            reducePX,
            onNumChange
        }
    },
})
</script>

<style lang="less" scoped>
.font {
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
      position: relative;
      width: 184px;
      float: left;
      display: inline-flex;
      justify-content: space-between;
      .colorFill {
        position: absolute;
        // :global {
          .color-input {
            width: 38px;
            height: 38px;
            // :global {
              .ant-input {
                width: 38px;
                height: 38px;
                border-radius: 4px;
                padding: 8px;
              }
            // }
          }
        // }
      }
    }
    .desc {
      width: 252px;
      margin-top: 4px;
      float: left;
    }
  }
}

</style>