<template>
    <button class="es-button"  :class="[
    size ? `es-button-${size}` : `es-button`,
    disabled ? 'es-button-disabled' : '',
    border ? 'es-button-border' : '',
    ]"
    @click="clickEvent()"
    :style="styleObj"
    >
        <slot name="icon"></slot>
        <slot name="content" v-if="propVal === ''">按钮</slot>
        {{propVal}}
    </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        styleObj: Object,
        size: {
          type: String,
          default: 'middle'
        },
        disabled: Boolean,
        border: Boolean,
        propVal: {
          type: String,
          default: ''
        }
    },
    emits: ['clickFn'],
    setup(props, context) {
        // console.log(props.size);
        function clickEvent() {
            // console.log('点击');
            context.emit("clickFn")
            
        }
        return {
            clickEvent
        }
    },
})
</script>

<style lang="less" scoped>
.es-button {
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  user-select: none;
  opacity: 1;
  &:hover {
    opacity: 0.9;
  }
}
.es-button-small {
  width: 64px;
  height: 32px;
  line-height: 30px;
}
.es-button-middle {
  width: 90px;
  height: 36px;
  line-height: 34px;
}
.es-button-big {
  width: 118px;
  height: 42px;
  line-height: 40px;
}
.es-button-disabled {
  cursor: not-allowed;
}
.es-button-border {
  border: 1px solid rgba(0, 0, 0, 0.07);
}
</style>