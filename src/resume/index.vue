<template>
    <div class="container">
        <div class="header">
            <Action />
        </div>
        <div class="content">
            <Content :templateName="templateName" />
        </div>
        <div class="toolbar">
            <Toolbar :flag="flag" @listen="listenToChildren"/>
        </div>
    </div>
    <PersonForm />
    <EducationForm />
    <CertificateForm />
    <ContactForm />
    <SkillForm />
    <WorkForm />

    <SExperienceForm />
    <PExperienceForm />
    <WExperienceForm />
</template>

<script>
import { provide, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Action from './ResumeAction/Action.vue'
import Content from './ResumeContent/Content.vue'
import Toolbar from './ResumeToolbar/Toolbar.vue'
import PersonForm from './useForm/PersonalForm.vue'
import EducationForm from './useForm/EducationForm.vue'
import CertificateForm from './useForm/CertificateForm.vue'
import ContactForm from './useForm/ContactForm.vue'
import SkillForm from './useForm/SkillForm.vue'
import WorkForm from './useForm/WorkForm.vue'
import SExperienceForm from './useForm/SchoolExperience/index.vue'
import PExperienceForm from './useForm/ProjectExperience/index.vue'
import WExperienceForm from './useForm/WorkExperience/index.vue'

export default defineComponent({
    components: {
        Action,
        Content,
        Toolbar,
        PersonForm,
        EducationForm,
        CertificateForm,
        ContactForm,
        SkillForm,
        WorkForm,
        SExperienceForm,
        PExperienceForm,
        WExperienceForm
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        let templateName = route.query.templateName;

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
        const ToolBar_Modules = [
            {
                key: Resume_Modules_Keys.personal,
                require: true,
                added: true,
                name: '个人信息',
                summary: '更好介绍自己，机会会更多',
            },
            {
                key: Resume_Modules_Keys.education,
                require: true,
                added: true,
                name: '教育信息',
                summary: '介绍你的学校和专业信息'
            },
            {
                key: Resume_Modules_Keys.contact,
                require: true,
                added: true,
                name: '联系方式',
                summary: '少侠，请留下你的联系方式'
            },
            {
                key: Resume_Modules_Keys.workPrefer,
                require: true,
                added: true,
                name: '工作期望',
                summary: '聊聊你所期望的宜人办公城市'
            },
            {
                key: Resume_Modules_Keys.schoolExperience,
                require: false,
                added: false,
                name: '在校经历',
                summary: '展示在校任职成果和人际关系'
            },
            {
                key: Resume_Modules_Keys.projectExperience,
                require: false,
                added: false,
                name: '项目经历',
                summary: '展示研究过什么优秀项目和成果'
            },
            {
                key: Resume_Modules_Keys.workExperience,
                require: false,
                added: false,
                name: '工作经历',
                summary: '申请岗位的相关经验和能力'
            },
            {
                key: Resume_Modules_Keys.certificate,
                require: false,
                added: false,
                name: '获奖经历',
                summary: '得过什么奖项值得炫耀'
            },
            {
                key: Resume_Modules_Keys.evaluation,
                require: false,
                added: false,
                name: '个人评价',
                summary: '低调夸一夸自己有什么亮点'
            },
            {
                key: Resume_Modules_Keys.skill,
                require: false,
                added: false,
                name: '技能清单',
                summary: '展示具备的技能，突出你的能力'
            },
            {
                key: Resume_Modules_Keys.test,
                require: false,
                added: false,
                name: '测试用例',
                summary: '测试用例，一键覆盖'
            }
        ]
        
        let flag = ref(false)

        ToolBar_Modules.forEach((item) => {
          item.require === true ? store.commit('addHavenModules', item.key) : ''
        })
       
       let listenToChildren = (val) => {
            flag.value = val
        }

        return {
          templateName,  
          flag,
          listenToChildren
        }
    },
})
</script>


<style lang="less" scoped>
.container {
  // min-height: 100vh;
  height: calc(20vh + 1160px);
  min-width: 100vw;
  box-sizing: border-box;
  background-color: #27292c;
  padding-left: 120px;
  // color: #fff;
  .header {
    height: 60px;
    width: 820px;
    padding-top: 16px;
    margin-left: 32px;
  }
  .content {
    margin-left: 32px;
    width: 820px;
    margin-top: 16px;
    height: calc(100vh - 76px - 16px);
  }
  .toolbar {
    width: 280px;
    position: absolute;
    top: 120px;
    left: 1038px;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>