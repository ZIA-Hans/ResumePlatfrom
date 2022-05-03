<template>
    <div class="my-input">
        <el-color-picker v-model="color" size="small" v-if="type === 'color'" @change="ChangeVal" />
        <input type="text" placeholder="Please Input" class="input" v-model="color" @change="changeContent">
    </div>
</template>

<script>
import { defineComponent, ref, toRefs } from 'vue'

export default defineComponent({
    props: {
        defaultVal: {
            type: String,
            default: '#ffffff'
        },
        type: {
            type: String,
            default: 'text'
        },
        updateProp: {
            type: String,
            default: ''
        }
    },
    setup(props, context) {
        const { defaultVal } = toRefs(props);
        const { updateProp } = props
        const color = defaultVal;

        function ChangeVal(msg) {
            console.log(msg);
            context.emit('updateInput', {
                [updateProp]: msg
            });
        }

        function changeContent(e) {
            // console.log(e.target.value);
            context.emit('updateContent', e.target.value)
        }
        return {
            color,
            ChangeVal,
            changeContent
        }
    },
})
</script>

<style lang="less" scoped>
.my-input {
    width: 184px;
    height: 38px;
    background: #f4f7fd;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    // .my-input:focus {
    //     // border-color: #40a9ff;
    // }

    .input {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background: #f4f7fd;
        text-align: center;
        direction: ltr;
        outline: none;
        border: none;
        transition: all ease-in-out 0.1s; 
    }
    .input:focus {
        box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
        border: 2px solid #40a9ff;
    }

    .ant-input {
      width: 100%;
      height: 38px;
      border: 0;
      outline: none;
      display: block;
      font-size: 14px;
      line-height: 38px;
      text-align: center;
      padding: 0 20px;
      box-sizing: border-box;
      background: #f4f7fd;
      border: none;
      border-radius: 4px;
      outline: none;
    }
}

</style>
