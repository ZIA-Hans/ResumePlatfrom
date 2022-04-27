import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { visualizer } from "rollup-plugin-visualizer"
import viteCompression from 'vite-plugin-compression'
// import OptimizationPersist from 'vite-plugin-optimize-persist'
// import PkgConfig from 'vite-plugin-package-config'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@C": resolve(__dirname, "src/components")
    }
  },
  server: {
    open: true,
    port: 3000,
    hmr: true
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
    // PkgConfig(),
    // OptimizationPersist()
  ],
  optimizeDeps: {
    // exclude: [
    //   'element-plus',
    //   "vue"
    // ],

    include: [
      "element-plus/es/components/divider/style/css",
      "element-plus/es/components/button/style/css",
      "vue",
      "element-plus/es",
      "element-plus/es/components/form/style/css",
      "element-plus/es/components/form-item/style/css",
      "element-plus/es/components/input/style/css",
      "element-plus/es/components/carousel/style/css",
      "element-plus/es/components/carousel-item/style/css",
      "element-plus/es/components/dialog/style/css",
      "element-plus/es/components/empty/style/css",
      "element-plus/es/components/switch/style/css",
      "element-plus/es/components/color-picker/style/css",
      "axios"
    ]
  },
  build: {
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if(id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    chunkSizeWarningLimit: 1024,
  }
})
