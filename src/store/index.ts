import { createStore } from 'vuex'
import { form_name, userResume } from './model'
import { getItem, setItem } from '../utils/resumeUtils'
import { useLocalStorage } from '../utils/tools'

const userKey = 'loginUser';

const defaultState = {
  userId: getItem('userId'),
  user: getItem(userKey),
  havenToolBarModules: [],
  // @desc: form_name表示展示弹窗的变量
  form_name: form_name,
  // @desc 表示简历数据
  // ResumeData: userResume,
  ResumeData: getItem(`userResume_${getItem('userId')}`),
  // @desc 打开弹窗当前位置和元素，默认为第一个
  currentIndex: -1,
  currentItem: {},
  editModel: {
    isEdit: false,
    draft: {}
  },
  // @desc 表示拖拽进画布里的组件信息
  resumeComponentsList: getItem('resumeComponentsData') ||  [],
  // 选中画布组件中的下标
  currentResumeComponentIndex: -1,
  // 选中画布组件对象的属性
  currentResumeComponent: null,
  isFullDisplay: false
}

export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    setUserId(state: typeof defaultState, userId: number) {
      state.userId = userId;
      userId !== null ? setItem('userId', userId) : window.localStorage.removeItem('userId');
      // sessionStorage.setItem('userId', `${userId}`);
    },
    setToken(state: typeof defaultState, userInfo: any) {
      state.user = userInfo;
      userInfo !== null ? setItem(userKey, state.user) : window.localStorage.removeItem(userKey);
    },
    setUserResumeData(state: typeof defaultState) {
      // state.ResumeData = getItem(`userResume_${state.userId}`);
      state.ResumeData = useLocalStorage(`userResume_${state.userId}`);
    },
    /**
     * @description 用于控制各个弹窗的显隐
     * @param state vuex参数中心
     * @param key 控制弹窗对象里相对应弹窗的key
     */
    displayWin(state: typeof defaultState, key: any) {
       state.form_name[key] = true;
    },
    visibleWin(state: typeof defaultState, key: any) {
      state.form_name[key] = false
    },
    /**
     * @description 改变当前选中的下标
     * @param state --
     * @param changeObj 改变对象，包含下标和对应对象，点击事件触发改变下标
     */
    changeCurrentChoose(state: typeof defaultState, changeObj: any) {
      state.currentIndex = changeObj.index;
      state.currentItem = changeObj.item;
    },
    /**
     * @description 修改简单信息
     * @param state --
     * @param payload 修改对象，包括相应的key和对应的值，与源对象进行合并
     */
    updateEasyData(state: typeof defaultState, payload: any) {
      const updateValue = payload.value;

      typeof updateValue === 'object' ? 
      state.ResumeData[payload.key] = {
        ...state.ResumeData[payload.key],
        ...updateValue
      }
      : state.ResumeData[payload.key] = updateValue;
    },
    /**
     * @description 添加一条复杂数据
     * @param state --
     * @param payload 包含相应的复杂数据的key和已经添加了新数据的数组
     */
    addComplexData(state: typeof defaultState, payload: any) {
      state.ResumeData[payload.resumeFormKey] = payload.currentArr
    },
    /**
     * @description 把草稿更新到放置内容的数据里
     * @param state --
     * @param payload 包含相应的Key和修改草稿的内容
     */
    updateComplexData(state: typeof defaultState, payload: any) {
      let updateResumeData = state.ResumeData[payload.resumeFormKey];
      updateResumeData[state.currentIndex] = payload.value;
    },
    /**
     * @description 变更是否在编辑状态下
     * @param state 
     * @param payload 
     */
    updateEditStatus(state: typeof defaultState, payload: any) {
      state.editModel = {
        ...state.editModel,
        ...payload
      }
    },
    /**
     * @description 更新草稿内容
     * @param state 
     * @param payload 
     */
    updateEditContent(state: typeof defaultState, payload: any) {
      state.editModel.draft = {
        ...state.editModel.draft,
        ...payload
      }
    },
    // 添加简历模块
    addHavenModules(state: typeof defaultState, key: String) {
      state.havenToolBarModules.push(key)
    },
    // 删除简历模块
    delHavenModules(state: typeof defaultState, key: any) {
      const index = state.havenToolBarModules.indexOf(key);
      state.havenToolBarModules.splice(index, 1);
    },
    /******************************************************************************************** */
    // 拖拽内容使用的vuex方法
    
    // 画布添加组件
    addComponent(state: typeof defaultState, component: any) {
      state.resumeComponentsList.push(component);
    },
    clearComponentList(state: typeof defaultState) {
      state.resumeComponentsList = [];
    },
    addTopComponent(state: typeof defaultState) {

    },
    deleteComponent(state: typeof defaultState, index: number) {
      const resumeComponentsList = state.resumeComponentsList;
      resumeComponentsList.splice(index, 1);
      
    },
    // 更新组件位置
    updateComponentPosition(state: typeof defaultState, payload: any) {
      const { currentComponentIndex, updateStyle } = payload;
      const moveComponent = {
        ...state.resumeComponentsList[currentComponentIndex],
        style: updateStyle
      };
      state.resumeComponentsList[currentComponentIndex] = moveComponent;
    },
    // 更新组件的样式内容
    updateComponentProps(state: typeof defaultState, componentStyle: any) {
      state.currentResumeComponent.style = componentStyle;
    },
    updateComponentInner(state: typeof defaultState, innerContent: string) {
      state.currentResumeComponent.componentInnerText = innerContent;
    },
    // 清除当前选中组件
    clearCurrentComponentStatus(state: typeof defaultState) {
      state.currentResumeComponentIndex = -1;
      state.currentResumeComponent = null
    },
    // 选中当前选中组件
    setCurrentComponentStatus(state: typeof defaultState, componentIndex: number) {
      state.currentResumeComponentIndex = componentIndex;
      state.currentResumeComponent = state.resumeComponentsList[componentIndex];
    },
    changeScreenStatus(state: typeof defaultState) {
      let flag = state.isFullDisplay;
      state.isFullDisplay = !flag;
    }
  },
})
