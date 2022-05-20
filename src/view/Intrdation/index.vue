<template>
    <canvas 
    id="demo" 
    :width="width" 
    :height="height"
    @mousewheel="onWheel"
    @click="showContent"
    ></canvas>

    
    <div class="intrdation"
     :class="[intrdationVisiable ? 'show' : '']"
     >
        <img class="back" src="../../assets/icon/back_blank.png" @click="intrdationVisiable = true" />
        <div class="flexBox">
            <span>项目介绍</span>
            <img src="../../assets/intrdation/img1.jpg" class="showDetail">
        </div>
        <div class="flexBox">
            <span>系统实例</span>
            <img src="../../assets/intrdation/1652344140(1).jpg" class="showDetail">
        </div>
    </div>
</template>

<script>
import ThreeJS from '../../utils/three'
import photo from '../../assets/label.jpg'
import * as THREE from 'three';
import { defineComponent, onMounted, ref, render, watch } from 'vue'
export default defineComponent({
    name: "Intrdation",
    setup() {
        let intrdationVisiable = ref(true);


        let width = window.innerWidth;
        let height = window.innerHeight;
        let distant = ref(5);
        var scene, camera, renderer, cube
        onMounted(() => {
            // new ThreeJS();
            init();
        })
        function init() {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )
            camera.position.z = distant.value;

            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('demo')
            })

            var light = new THREE.PointLight(0xfff00, 2, 100);
            light.position.set(0, 1.5, 2)
            scene.add(light)

            var meshTexture = new THREE.TextureLoader().load(photo)

            cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshBasicMaterial({
                    // color: 0xeeeee,
                    map: meshTexture
                })
            );
            scene.add(cube);
            renderer.render(scene, camera);

            function animation() {
                window.requestAnimationFrame(animation)
                cube.rotation.x += 0.01
                cube.rotation.y += 0.01
                renderer.render(scene, camera);
            }
            animation();

        }

        watch(distant, (val) => {
            camera.position.z = val
            renderer.render(scene, camera);
        })


        function onWheel(e) {
            if(e.wheelDelta < 0) {
                distant.value -= 0.1;
            }
            if(e.wheelDelta > 0) {
                distant.value += 0.1;
            }
        }

        function showContent(e) {
            intrdationVisiable.value = false;
            // console.log(intrdationVisiable.value);
        }


        return {
            intrdationVisiable,
            width,
            height,
            onWheel,
            distant,
            showContent
        }
    }
})
</script>

<style lang="less" scoped>
#demo {
    position: absolute;
}
.intrdation {
    background: #000;
    height: 754px;
    opacity: 0.9;
    transition: all 0.5s ease-in-out;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .back {
        position: absolute;
        width: 60px;
        height: 40px;
        top: 40px;
        left: 50px;
        cursor: pointer;
    }
    .flexBox {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        span {
            color: white;
            font-size: 20px;
            margin-bottom: 20px;
        }
    }
    .showDetail {
        width: 600px;
        height: 500px;
    }
}

.show {
    transform: translateX(100%);
}
</style>


<!-- <template>
        <div className='floating_page' :style="backgroundColor">
        <div id="canvas"></div>
        <input className='color_pick' type="color" onChange={this.handleInputChange} value={this.state.backgroundColor} />
        <button className='pass_button' onClick={this.handleRenderChange}>特效<span className='highlight'>{this.state.renderGlithPass ? '开' : '关'}</span></button>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
// import '../../assets/fonts/helvetiker_regular.typeface.json'

export default defineComponent({
    setup() {
        let backgroundColor = reactive({
            background: '#164CCA'
        });

        onMounted(() => {
            initThree()
        })

        function initThree() {
            const nearDist = 0.1, farDist = 10000
            const canvas = document.getElementById('canvas');
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true})
            renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearAlpha(0);
            canvas.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0xeeeeee, 0, 100);
            const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, nearDist, farDist);
            camera.position.set(-2 * farDist, 0, 780);

            const composer = new EffectComposer(renderer);
            composer.addPass( new RenderPass(scene, camera));
            const glitchPass = new GlitchPass();
            composer.addPass(glitchPass);

            // 页面缩放
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                composer.setSize(window.innerWidth, window.innerHeight);
            }, false);

            const textMesh = new THREE.Mesh();
            const loader = new FontLoader();
            loader.load('./fonts/helvetiker_regular.typeface.json', font => {
                textMesh.geometry = new TextGeometry('@dragonir\nfantastic\nthree.js\nart work', {
                    font: font,
                    size: 100,
                    height: 40,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 30,
                    bevelSize: 8,
                    bevelOffset: 1,
                bevelSegments: 12
                });
                textMesh.material = material;
                textMesh.position.x = 120 * -2;
                textMesh.position.z = 120 * -1;
                scene.add(textMesh);
            });

            // 创建装饰几何体
            const generateRandomMesh = (geometry, material, count) => {
                for (let i = 0; i < count; i++) {
                    let mesh = new THREE.Mesh(geometry, material);
                    let dist = farDist / 3;
                    let distDouble = dist * 2;
                    mesh.position.x = Math.random() * distDouble - dist;
                    mesh.position.y = Math.random() * distDouble - dist;
                    mesh.position.z = Math.random() * distDouble - dist;
                    mesh.rotation.x = Math.random() * 2 * Math.PI;
                    mesh.rotation.y = Math.random() * 2 * Math.PI;
                    mesh.rotation.z = Math.random() * 2 * Math.PI;
                    // 手动控制何时重新计算3D变换以获得更好的性能
                    mesh.matrixAutoUpdate = false;
                    mesh.updateMatrix();
                    group.add(mesh);
                }
            }

            const group = new THREE.Group();
            const octahedronGeometry = new THREE.OctahedronBufferGeometry(80);
            const material = new THREE.MeshNormalMaterial();
            generateRandomMesh(octahedronGeometry, material, 100);
            const torusGeometry = new THREE.TorusBufferGeometry(40, 25, 16, 40);
            generateRandomMesh(torusGeometry, material, 200);
            const coneGeometry = new THREE.ConeBufferGeometry(40, 80, 80);
            generateRandomMesh(coneGeometry, material, 100);
            scene.add(group);

            // 动画
            // const animate = () => {
            //     requestAnimationFrame(animate);
            //     camera.position.x += (mouseX - camera.position.x) * 0.05;
            //     camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
            //     camera.lookAt(scene.position);
            //     const t = Date.now() * 0.001;
            //     const rx = Math.sin(t * 0.7) * 0.5;
            //     const ry = Math.sin(t * 0.3) * 0.5;
            //     const rz = Math.sin(t * 0.2) * 0.5;
            //     group.rotation.x = rx;
            //     group.rotation.y = ry;
            //     group.rotation.z = rz;
            //     textMesh.rotation.x = rx;
            //     textMesh.rotation.y = ry;
            //     textMesh.rotation.z = rx;
            //     renderer.render(scene, camera);
            //     this.state.renderGlithPass && composer.render();
            //     }
            //     animate();
            renderer.render(scene, camera)
        }
        
        return {
            backgroundColor
        }
    },
})
</script>

<style lang="less" scoped>
    
</style> -->