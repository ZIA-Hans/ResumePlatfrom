<template>
    <Header />
    <div class="content">
        <ResumeList />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import ResumeList from './components/ResumeList.vue'

export default defineComponent({
    components: {
        Header,
        ResumeList
    },
    setup() {
        
    },
})
</script>

<style lang="less" scoped>
.content {
    width: 100%;
    height: 100%;
    padding: 50px 100px;
    box-sizing: border-box;
    // display: flex;
    // justify-content: center;
    // align-items: center;
}
</style>