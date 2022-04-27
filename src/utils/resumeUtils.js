import store from "../store";
import * as Validates from './validates'

export function hideWindows(key) {
    store.commit('visibleWin', key);
}

export function updateResumeData(winKey, key, value) {
    const payload = {
        key,
        value
    }
    store.commit('updateEasyData', payload);
    hideWindows(winKey);
}

export let changeStandTime = (time) => {
    if(typeof time === 'string') return time;
    var unixTime = new Date(time);
    var standTime =  unixTime.getFullYear() + '.' + (unixTime.getMonth() + 1) + '.' + unixTime.getDate()
    return standTime
}

export function changeEditStatus(status) {
    var editObject = {
      isEdit: status
    }
    store.commit('updateEditStatus', editObject);
  }


export const setItem = (key, value) => {
    if(typeof value === 'object') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
}

export const getItem = key => {
    const data = window.localStorage.getItem(key);
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
}

/* 生成表格自定义校验函数 */
export const formValidateGene = (key, msg) => (rule, value, cb) => {
    if (Validates[key](value)) {
        cb()
    } else {
        cb(new Error(msg))
    }
}

export const createResumeData = () => {
    return {
        base: {
          name: '',
          avatar: '',
          username: '',
          area: '',
          school: '',
          major: '',
          degree: '',
          hometown: '',
          hobby: '',
          onSchoolTime: {
            beginTime: '2018.09',
            endTime: '2022.06',
          },
        },
        contact: {
          phone: '',
          email: '',
          github: 'https://github.com/PDKSophia',
          juejin: 'https://juejin.cn/user/1838039171075352',
        },
        work: {
          job: '',
          city: '',
          cityList: [],
        },
        
          skill: '',
          skillList: [

          ],
      
        evaluation: '',
        evaluationList: [
          
        ],
        certificate: '',
        certificateList: [],
        schoolExperience: [
        //   {
        //     beginTime: '2016.09',
        //     endTime: '2017.09',
        //     post: '文艺部会长',
        //     department: '校团委学生会',
        //     content: '计划、组织、协调各年级学生组织的文艺和文化娱乐活动｜承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        //     parseContent: [
        //       '计划、组织、协调各年级学生组织的文艺和文化娱乐活动',
        //       '承办好学生会部的学生文艺晚会。有效地与社团部开展合作项目',
        //     ],
        //   },
        ],
        workExperience: [
        //   {
        //     beginTime: 1504195200000,
        //     endTime: 1559318400000,
        //     post: '前端工程师',
        //     department: '湖南瞎说大学网络中心',
        //     content: '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用｜任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        //     parseContent: [
        //       '担任TickNet工作室前端工程师，与湖南瞎说大学网络中心合作，围绕微信企业号开发或主导多个应用',
        //       '任职期间基于微信企业号开发校内闲余市场，采用Vue.js主导开发，并与湖南xxx科技有限公司合作，主导开发该公司官网及后台管理',
        //     ],
        //   },
        //   {
        //     beginTime: '2021.4.01',
        //     endTime: '2021.7.01',
        //     post: '前端工程师',
        //     department: '青廷科技',
        //     content: '',
        //     parseContent: []
        //   }
        ],
        projectExperience: [
        //   {
        //     beginTime: '2021.03',
        //     endTime: '2021.05',
        //     projectName: 'visResumeMook 可视化简历平台',
        //     post: '前端工程师',
        //     content:
        //       'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版｜通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档｜通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        //     parseContent: [
        //       'Electron + React Hooks 打造简历平台，只需输入一次信息，套用多份模版',
        //       '通过 jsonfile 方式实现主题换肤，支持导出 PDF 简历文档',
        //       '通过 indexDB 方式实现历史简历缓存，通过可视化拖拽形式，自定义组件模版',
        //     ],
        //     date: 1621145137865,
        //   },
        ],
      };
}