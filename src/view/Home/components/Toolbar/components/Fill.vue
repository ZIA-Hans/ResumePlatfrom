<template>
    <div class="fill">
        <Title title="填充" />
        <div class="box">
            <Label label="背景色" />
            <div class="wrapper">
                <Input 
                  type="color" 
                  :defaultVal="currentResumeComponent.style.backgroundColor" 
                  updateProp="backgroundColor"
                  @updateInput="onNumChange"
                />
            </div>
        </div>
        <div class="box">
            <Label label="边框(px)" />
            <div class="wrapper">
                <NumberChangeStep 
                  :defaultNum="reducePX(currentResumeComponent.style.borderWidth)"
                  :minNum="minNum"
                  :maxNum="maxNum"
                  updateProp="borderWidth"
                  @numberChange="onNumChange"
                />
            </div>
        </div>
        <div class="box">
            <Label label="圆角(px)" />
            <div class="wrapper">
                <NumberChangeStep 
                  :defaultNum="reducePX(currentResumeComponent.style.borderRadius)"
                  :minNum="minNum"
                  :maxNum="maxNum"
                  updateProp="borderRadius"
                  @numberChange="onNumChange"
                />
            </div>
        </div>
        <div class="box">
            <Label label="边框颜色" />
            <div class="wrapper">
                <Input
                 type="color" 
                 :defaultVal="currentResumeComponent.style.borderColor"
                 updateProp="borderColor"
                 @updateInput="onNumChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Title from '@/common/components/Title.vue'
import Label from '@/common/components/Label.vue'
import NumberChangeStep from '@/common/components/NumberChangeStep.vue'
import Input from '@/common/components/Input.vue'
import store from '@/store'
import { reducePX, onNumChange } from '@/utils/componentUtils'

export default defineComponent({
    components: {
        Title,
        Label,
        NumberChangeStep,
        Input
    },
    setup() {
        const currentResumeComponent = computed(() => store.state.currentResumeComponent);
        const minNum = ref(0);
        const maxNum = ref(1000);

        return {
          currentResumeComponent,
          minNum,
          maxNum,
          reducePX,
          onNumChange,
        }
    },
})
</script>

<style lang="less" scoped>
.fill {
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