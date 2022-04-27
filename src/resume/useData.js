export const Resume_Modules_Keys = {
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

export const ToolBar_Modules = [
    {
        key: Resume_Modules_Keys.personal,
        require: true,
        added: true,
        name: '个人信息',
        summary: '更好介绍自己，机会会更多'
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
        added: true,
        name: '测试用例',
        summary: '测试用例，一键覆盖'
    }
]