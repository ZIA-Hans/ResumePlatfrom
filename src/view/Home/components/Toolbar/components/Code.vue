<template>
    <div class="code">
        <Title title="代码" />
        <div class="block" v-if="componentStyle.length !== 0">
            <p class="property" v-for="(styleName, styleIndex) in Object.keys(componentStyle)" :key="styleIndex">
                <span class="key">{{styleName}}</span>
                <span class="line">：</span>
                <span class="value">{{componentStyle[styleName]}}</span>
                <span class="line">;</span>
            </p>
        </div>
    </div>    
</template>

<script>
import { defineComponent } from 'vue'
import Title from '@/common/components/Title.vue'

export default defineComponent({
    components: {
        Title
    },
    props: {
        componentStyle: {
            type: Object,
            default: {}
        }
    },
    setup(props) {
        

        return {

        }
    },
})
</script>

<style lang="less" scoped>
.code {
  width: 100%;
  .block {
    width: 294px;
    padding: 16px;
    font-size: 12px;
    color: #000000;
    box-sizing: border-box;
    background-color: #f5f2f0;
    &::after {
      content: '';
      display: block;
      clear: both;
    }
    .property {
      margin: 0 0 6px;
      .key {
        color: #905;
      }
      .line {
        color: #999;
      }
      .value {
        color: #000;
      }
    }
  }
}

</style>
