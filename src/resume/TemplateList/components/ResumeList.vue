<template>
	<div class="imgSlider">
		<el-carousel  type="card" height="600px">
			<el-carousel-item v-for="(item, index) in imgArr" :key="index" @click="gotoResume(item.template)">
				<img :src="item.src" alt="">
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import img1 from '@/assets/template/template1.jpg'
import img2 from '@/assets/template/template2.jpg'
import img3 from '@/assets/resumeImg/q.jpeg'
import img4 from '@/assets/resumeImg/w.jpg'
import img5 from '@/assets/resumeImg/z.png'
import router from '../../../router'

export default defineComponent({
    setup() {
		const imgArr = [
			{
				template: 'Resume1',
				src: img1
			},
			{
				template: 'Resume2',
				src: img2
			},
			{
				template: 'Resume3',
				src: img3
			},
			{
				template: 'Resume4',
				src: img4
			},
			{
				template: 'Resume5',
				src: img5
			}
		]

		function gotoResume(templateName) {
			router.push({
				path: `/Resume`,
				query: {
					templateName
				}
			})
		}
		return {
			imgArr,
			gotoResume
		}
    },
})
</script>

<style lang="less" scoped>
.imgSlider {
	border: 5px solid;
	padding: 30px;
	background-color: aliceblue;
	border-radius: 30px;
}
.el-carousel__item {
	h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
		text-align: center;
	}
	img {
		width: 668px;
		height: 600px;
	}

	// &:nth-child(2n) {
	// 	background-color: #d3dce6;
	// }

	// &:nth-child(2n + 1) {
	// 	background-color: #d3dce6;
	// }
}
</style>