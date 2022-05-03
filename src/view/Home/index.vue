<template>
    <div class="container">
            <Material />
            <WinCenter />
            <Toolbar />
    </div>
    <FullScreen />
</template>

<script>
import { defineComponent } from 'vue'
import Material from './components/Material.vue'
import WinCenter from './components/WinCenter/WinCenter.vue'
import Toolbar from './components/Toolbar/Toolbar.vue'
import FullScreen from './components/FullScreen.vue'

export default defineComponent({
    components: {
        Material,
        WinCenter,
        Toolbar,
        FullScreen,
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