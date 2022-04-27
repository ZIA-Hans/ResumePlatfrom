<template>
    <div class="container">
            <Material />
            <WinCenter />
            <Toolbar />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Material from './components/Material.vue'
import WinCenter from './components/WinCenter/WinCenter.vue'
import Toolbar from './components/Toolbar/Toolbar.vue'

export default defineComponent({
    components: {
        Material,
        WinCenter,
        Toolbar,
    },
    setup() {
        
    },
})
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    display: flex;
}
</style>