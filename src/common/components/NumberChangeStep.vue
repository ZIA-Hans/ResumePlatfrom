<template>
    <div class="operator">
        <div class="btn left svg-icon" @click="onMinusNum">
            -
        </div>
        <input 
         :value="defaultNum"
         type="number"
         class="input"
         @blur="onInputBlur"
         @change="onInputChange"
         @keypress="onKeyPress"
         :disabled="maxNum === 0"
        />
        <div class="btn right svg-icon" @click="onPlusNum">
            +
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, toRefs, defineEmits } from 'vue'
import store from '../../store';

export default defineComponent({
    props: {
        defaultNum: {
            type: Number,
            default: 0
        },
        minNum: {
            type: Number,
            default: 0
        },
        maxNum: {
            type: Number,
            default: 0
        },
        updateProp: {
            type: String,
            default: '',
            // require
        }
    },
    setup(props, context) {
        const { minNum, maxNum, defaultNum } = toRefs(props);
        const { updateProp } = props
        let currentNum = ref(0);
        currentNum = defaultNum;

        function onMinusNum(e) {
            if(currentNum.value > minNum.value) {
                context.emit('numberChange', {
                    [ updateProp ]: `${currentNum.value - 1}px`
                });
            }
        }

        function onPlusNum(e) {
            if(currentNum.value < maxNum.value) {
                context.emit('numberChange', {
                    [ updateProp ]: `${currentNum.value + 1}px`
                })
            }
        }

        function onInputBlur(e) {
            const num = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
            let result = num;
            if(typeof num === 'number') {
                if(num < minNum.value) {
                    result = minNum;
                }
                if(num > maxNum.value) {
                    result = maxNum;
                }
            }
            context.emit('numberChange', {
                [ updateProp ]: `${result}px`
            })
        }

        function onInputChange(e) {
            const num = parseInt(e.target.value, 10);
            e.target.value = '';
            context.emit('numberChange', {
                [ updateProp ]: `${num}px`
            })
        }

        function onKeyPress(e) {
            const invalidChars = ['-', '+', 'e', '.', 'E'];
            if (invalidChars.indexOf(e.key) !== -1) {
            e.preventDefault();
            }
        } 

        return {
            currentNum,
            onMinusNum,
            onPlusNum,
            onInputBlur,
            onInputChange,
            onKeyPress
        }
    },
})
</script>

<style lang="less" scoped>
.operator {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 88px;
    position: relative;
    cursor: pointer;
    .btn {
        opacity: 1;
    }

    &:hover {
        .svg-icon {
            visibility: visible;
        }
    }

    &:focus-within {
        .btn {
            opacity: 1;
        }
    }
    .svg-icon {
        position: absolute;
        width: 20px;
        height: 20px;
        font-size: 20px;
        cursor: pointer;
        text-align: center;
        background: transparent;
        visibility: hidden;
    }

    .left {
        left: 0;
        top: 2px;
    }
    .right {
        right: 0;
        top: 2px;
    }

    .input {
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }
    input:disabled {
        color: #ccc;
    }
}
</style>