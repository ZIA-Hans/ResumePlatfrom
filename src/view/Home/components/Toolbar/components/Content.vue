<template>
    <div class="content" v-if="havenTextModule.includes(currentResumeComponent.componentName)">
        <Title title="信息" />
        <div class="box">
            <Label label="内容" />
            <Input 
              :defaultVal="currentResumeComponent.componentInnerText"
              updateProp="componentInnerText"
              @updateContent="updateContent"
            />
        </div>
    </div>

    <div class="content" v-else>
        <Title title="信息" />
        <div class="box">
            <Label label="图片路径" />
            <Input 
             :defaultVal="currentResumeComponent.componentInnerText"
             updateProp="componentInnerText"
             @updateContent="updateContent"
            />
        </div>

        <div class="box">
            <Label label="上传图片" />
            <input type="file" accept="image/*">
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import Title from '@/common/components/Title.vue'
import Label from '@/common/components/Label.vue'
import Input from '@/common/components/Input.vue'
import store from '@/store'

export default defineComponent({
    components: {
        Title,
        Label,
        Input
    },
    setup() {
        const havenTextModule = ['Button', 'AText'];
        const currentResumeComponent = computed(() => store.state.currentResumeComponent);

        function updateContent(changeVal) {
            store.commit('updateComponentInner', changeVal);
        } 
        return {
            havenTextModule,
            currentResumeComponent,
            updateContent
        }
    },
})
</script>

<style lang="less" scoped>
.content {
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
  }
}

</style>