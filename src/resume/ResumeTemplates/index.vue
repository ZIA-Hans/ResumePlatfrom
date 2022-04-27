<template>
    <div class="a4-box">
        <div class="flex container" id="visPdf">
            <div class="left">
                <div class="avatar">
                    <Avatar />
                </div>
                <div class="fillColor"></div>
                <div class="baseData">
                    <BaseInfo />
                    <Contact v-if="havenModules.includes(Resume_Modules_Keys.contact)" />
                    <Job v-if="havenModules.includes(Resume_Modules_Keys.workPrefer)"/>
                    <Certificate v-if="havenModules.includes(Resume_Modules_Keys.certificate)" />
                </div>
            </div>
                <!-- 内容 -->
            <div class="center">
                <Synopsis v-if="havenModules.includes(Resume_Modules_Keys.evaluation)" />
                <div class="listData">
                    <Skill v-if="havenModules.includes(Resume_Modules_Keys.skill)" />
                    <Post v-if="havenModules.includes(Resume_Modules_Keys.schoolExperience)" />
                    <Project v-if="havenModules.includes(Resume_Modules_Keys.projectExperience)" />
                    <Work v-if="havenModules.includes(Resume_Modules_Keys.workExperience)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import $store from '@/store/index'
import Avatar from './components/Avatar.vue'
import BaseInfo from './components/BaseInfo.vue'
import Certificate from './components/Certificate.vue'
import Contact from './components/Contact.vue'
import Job from './components/Job.vue'
import Post from './components/Post.vue'
import Project from './components/Project.vue'
import Skill from './components/Skill.vue'
import Synopsis from './components/Synopsis.vue'
import Work from './components/Work.vue'


export default defineComponent({
    components: {
      Avatar,
      BaseInfo,
      Certificate,
      Contact,
      Job,
      Post,
      Project,
      Skill,
      Synopsis,
      Work
    },
    setup() {
      const Resume_Modules_Keys = {
            personal: 'personal', // 个人信息
            contact: 'contact', // 联系方式
            education: 'education', // 教育信息
            workPrefer: 'workPrefer', // 工作期望
            schoolExperience: 'schoolExperience', // 在校经历
            projectExperience: 'projectExperience', // 项目经验
            workExperience: 'workExperience', // 工作经历
            certificate: 'certificate', // 获奖证书
            evaluation: 'evaluation', // 个人评价
            skill: 'skill', // 技能清单
            test: 'test', // 测试用例
      }

      let havenModules = $store.state.havenToolBarModules

      return {
        Resume_Modules_Keys,
        havenModules,
      }
    },
})
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  flex-direction: row;
}
.a4-box {
  width: 820px;
  height: 1160px;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid black;

  .container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    .left {
      width: 27%;
      .avatar {
        width: 100%;
        height: 180px;
        text-align: center;
        background-color: #eee;
      }
      .fillColor {
        width: 100%;
        height: 32px;
        background-color: rgb(250, 225, 4);
      }
      .baseData {
        width: 100%;
        height: calc(100% - 180px - 32px);
        // height: 820px;
        color: #fff;
        background-color: #01426f;
      }
    }
    /* 内容区域 */
    .center {
      width: 72%;
      padding: 0 20px;
      box-sizing: border-box;
      .listData {
        margin-top: 32px;
      }
    }
  }
}
</style>