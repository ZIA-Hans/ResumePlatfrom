<template>
    <div class="MyScrollBox_outer" :style="innerStyle">
        <div class="MyScrollBox_hidden_scroll" :style="{'maxHeight': `${maxHeight}px`}">
            <div class="MyScrollBox_inner">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        maxHeight: {
            type: Number,
            default: 500
        },
        style: {
            type: Object,
            default: null
        }
    },
    setup(props) {
        const { style, maxHeight } = props;
        let innerStyle = {};
        if(style) {
            innerStyle = { ...style };
        }
        if(maxHeight) {
            innerStyle = {
                ...innerStyle,
                maxHeight: `${maxHeight}px`
            }
        }

        return {
            innerStyle
        }
    },
})
</script>

<style lang="less" scoped>
.MyScrollBox_outer {
  width: 100%;
  max-height: 200px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  .MyScrollBox_hidden_scroll {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    // width: calc(100% + 17px);
    // margin-right: -17px;
    .MyScrollBox_inner {
      // width: calc(100% - 17px);
      display: inline-block;
      width: -webkit-fill-available;
    }
    // .MyScrollBox_inner::-webkit-scrollbar {
    //     display: none;
    // }
  }
  .MyScrollBox_hidden_scroll::-webkit-scrollbar {
    width: 0 !important; /* remove scrollbar space */
    background: transparent; /* optional: just make scrollbar invisible */
    // display: none;
  }
  /* 兼容IE10+ */
  .MyScrollBox_hidden_scroll {
    -ms-overflow-style: none;
  }

  /* 但是firefox代码无效 */
  .MyScrollBox_hidden_scroll {
    overflow: -moz-scrollbars-none;
  }
}

</style>
