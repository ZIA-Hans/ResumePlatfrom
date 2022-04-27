<template>
    <MButton size="big" @clickFn="onClick" @click="onClick">
        <template v-slot:content >选择</template>
    </MButton>
    <MInput :value="content"></MInput>
    <MUpload v-if="avatar.length === 0" @myEvent="changeImg"/>
    <img :src="avatar" alt="" id="img">
    <!-- <Shape>
        <div class="temp">
            我是插槽内容
        </div>
    </Shape> -->
    <div>{{msg}}</div>
    <div v-html="msg"></div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import MButton from '../../components/M-button/index.vue'
import MInput from '../../components/M-input/index.vue'
import MUpload from '../../components/M-Upload/index.vue'
import { useRoute } from 'vue-router'
import Shape from '../Home/components/Editor/components/Shape.vue'

export default defineComponent({
    components: {
        MButton,
        MInput,
        MUpload,
        Shape
    },
    setup() {
        const route = useRoute();

        let avatar = ref('');
        let content = ref('')
        let isLongText = ref(false)

        const onClick = (e) => {
            alert('点击')
        }

        let changeImg = (imgSrc) => {
            avatar = imgSrc
            let img = document.getElementById('img');
            img.src = imgSrc
        }

        
        onMounted(() => {
            console.log(route.query.key);
        })

        const msg = ref('<span style="color: #228bec">Hello Vue</span>')

        
        return {
            content,
            isLongText,
            avatar,
            onClick,
            changeImg,
            msg
        }
    },
})
</script>

<style lang="less" scoped>
.temp {
    width: 100px;
    height: 100px;
    border: 1px solid;
    // align-content: center;
    line-height: 100px;
    // margin-left: 50px;
}
</style>