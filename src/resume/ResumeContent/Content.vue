<template>
        <!-- <Resume /> -->
        <component :is="templateName" />
</template>

<script>
import { defineComponent, inject, onMounted } from 'vue'
import Resume1 from '../ResumeTemplates/index.vue'
import MyScrollBox from '@C/M-ScrollBox/index.vue'


export default defineComponent({
    components: {
        Resume1,
        MyScrollBox
    },
    props: {
        templateName: {
            type: String,
            default: 'Resume1'
        }
    },
    setup() {
        
    },
})
</script>
