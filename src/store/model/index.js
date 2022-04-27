export const form_name = {
    personal: false,
    contact: false,
    education: false,
    workPrefer: false,
    schoolExperience: false,
    projectExperience: false,
    certificate: false,
    skill: false,
    workExperience: false
  }

export const userResume = {
    base: {
      name: '',
      avatar: '',
      username: '黄泽敏',
      area: '广东·揭阳',
      school: '广东石油化工学院',
      major: '物联网工程',
      degree: '本科',
      hometown: '汉族',
      hobby: '篮球、爬山、健身、吉他、街舞',
      onSchoolTime: {
        beginTime: '2018.09',
        endTime: '2022.06',
      },
    },
    contact: {
      phone: '136****3903',
      email: '1025013204@qq.com',
      github: 'https://github.com/PDKSophia',
      juejin: 'https://juejin.cn/user/1838039171075352',
    },
    work: {
      job: '前端工程师',
      city: '广州｜深圳',
      cityList: ['广州', '深圳'],
    },
    
      skill: '熟悉 Vue.js，了解数据双向绑定原理、阅读过 NextTick 源码｜熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码，开发 rc-redux-model 中间件｜阅读过 Antd 部分优秀组件源码，并参考借鉴，开发组内 UI 组件库｜了解 Vscode，开发组内项目辅助工具 vscode-beehive-extension 插件｜了解 Webpack 编译原理，了解 babel 转码原理，编写过 babel 插件｜了解 Electron，了解 Node.js 以及 Git 团队协作开发工具｜了解设计模式，对于特定场景，能采用合适的设计模式进行解决｜了解 MYSQL，了解数据库优化常用方法｜了解基于微信公众号应用开发，采用 Taro 开发微信小程序，具备良好的网络基础知识',
      skillList: [
        '熟悉 Vue.js，了解数据双向绑定原理、阅读过 NextTick 源码',
        '熟悉 React，了解并使用 Hooks 特性，阅读过 redux 源码，开发 rc-redux-model 中间件',
        '阅读过 Antd 部分优秀组件源码，并参考借鉴，开发组内 UI 组件库',
        '了解 Vscode，开发组内项目辅助工具 vscode-beehive-extension 插件',
        '了解 Webpack 编译原理，了解 babel 转码原理，编写过 babel 插件',
        '了解 Electron，了解 Node.js 以及 Git 团队协作开发工具',
        '了解设计模式，对于特定场景，能采用合适的设计模式进行解决',
        '了解 MYSQL，了解数据库优化常用方法',
        '了解基于微信公众号应用开发，采用 Taro 开发微信小程序，具备良好的网络基础知识',
      ],
  
    evaluation: '总结一个词——牛逼',
    evaluationList: [
      '投身开源，rc-redux-model 库作者，SugarTurboS Club 开源组织负责人',
      '掘金 lv3 博主，掘金文章 10w+ 阅读量，github blog 300+ star',
      '具备良好语言表达能力和沟通能力，能快速融入团队，适应新环境。',
      '具有代码洁癖，前后端分离，自我学习能力强，对新技术具有钻研精神',
    ],
    certificate: '广州第一届喝酒大赛参与奖',
    certificateList: ['广州第一届喝酒大赛参与奖'],
    schoolExperience: [
      {
        beginTime: '2016.09',
        endTime: '2017.09',
        post: '文艺部会长',
        department: '校团委学生会',
        content: '计划、组织、协调各年级学生组织的文艺和文化娱乐活动｜承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        parseContent: [
          '计划、组织、协调各年级学生组织的文艺和文化娱乐活动',
          '承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        ],
      },
    ],
    workExperience: [
      {
        beginTime: 1504195200000,
        endTime: 1559318400000,
        post: '前端工程师',
        department: '湖南瞎说大学网络中心',
        content: '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用｜任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        parseContent: [
          '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用',
          '任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        ],
      },
      {
        beginTime: '2021.4.01',
        endTime: '2021.7.01',
        post: '前端工程师',
        department: '青廷科技',
        content: '',
        parseContent: []
      }
    ],
    projectExperience: [
      {
        beginTime: '2021.03',
        endTime: '2021.05',
        projectName: 'visResumeMook 可视化简历平台',
        post: '前端工程师',
        content:
          'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版｜通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档｜通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        parseContent: [
          'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版',
          '通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档',
          '通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        ],
        date: 1621145137865,
      },
    ],
  };

  export const initComponentStyleStore = {
    Base: {
      opacity: 1,
      width: 0,
      height: 0,
      position: 'relative',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      cursor: 'default',
      zIndex: 0,
      padding: 0
    },
    Button: {
      textAlign: 'left',
      backgroundColor: '#ffffff',
      color: '#000000',
      fontSize: 14,
      lineHeight: 22,
      letterSpacing: 0,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 12
    },
    AText: {
      textAlign: 'left',
      backgroundColor: '#ffffff',
      color: '#000000',
      fontSize: 14,
      lineHeight: 22,
      letterSpacing: 0,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 12
    },
    Cover: {
      backgroundColor: '#ffffff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 12
    }
  }