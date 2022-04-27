<template>
    <!-- <div>我是工具条操作区</div> -->
    <div class="slider">
      <div class="scroll-box">
        <div class="module">
            <div class="title">
                <span class="line">
                    已添加模块
                </span>
            </div>
            <div class="content">
                <div class="box" v-for="(item, index) of Added_Modules" :key="item.key" @click="changeInfo(item)">
                    <div class="info">
                        <i class="toutiao toutiao-zuopin icon" />
                        <div class="text">
                            <div class="name">{{item.name}}</div>
                            <div class="summary">{{item.summary}}</div>
                        </div>
                        <div class="tips" v-if="item.require === true">必选项</div>
                        <div class="action" v-else>
                          <i class="toutiao toutiao-gengduo edit"  />
                          <i
                            class="toutiao toutiao-shanchu delete"
                            @click="deleteModule($event, item, index)"
                          />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="module">
          <div class="title">
                <span class="line">
                    可添加模块
                </span>
            </div>
            <div class="content">
                <div class="box" v-for="(item, index) of UnAdded_Modules" :key="item.key" @click="addToSlider(item, index)">
                    <div class="info">
                        <i class="toutiao toutiao-zuopin icon" />
                        <div class="text">
                            <div class="name">{{item.name}}</div>
                            <div class="summary">{{item.summary}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue'
import store from '@/store/index'

export default defineComponent({
    props: {
      flag: {
        type: Boolean
      }
    },
    setup(props, context) {
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

        const ToolBar_Modules = reactive([
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
                added: false,
                name: '测试用例',
                summary: '测试用例，一键覆盖'
            }
        ])
        


        let Added_Modules = computed(() => ToolBar_Modules.filter((item) => item.added === true))
        let UnAdded_Modules = computed(() => ToolBar_Modules.filter((item) => item.added === false))
        
        const addToSlider = (moduleObj, index) => {
          moduleObj.added = true
          store.commit('addHavenModules', moduleObj.key)
        }
        const deleteModule = (e, module, index) => {
          e.stopPropagation()          
          module.added = false
          store.commit('delHavenModules', module.key)
        }

        const changeInfo = (module) => {
          // let newFlag = !props.flag
          // context.emit("listen", newFlag)
          store.commit('displayWin', module.key)
          // console.log(module.key);
        }

        
        return {
            ToolBar_Modules,
            Added_Modules,
            UnAdded_Modules,
            addToSlider,
            deleteModule,
            changeInfo
        }
    },
})
</script>

<style lang="less" scoped>
.scroll-box {
  height: calc(100vh - 92px);
  overflow: auto;
}
.scroll-box::-webkit-scrollbar{
    display: none;
}

.slider {
  width: 280px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px;
  .module {
    font-size: 14px;
    // margin-top: 15px;
    .title {
      font-size: 14px;
      line-height: 22px;
      color: #505667;
      position: relative;
      padding-left: 12px;
      margin-bottom: 16px;
      &.un-first {
        margin-top: 24px;
      }
      .line {
        position: absolute;
        top: -30px;
        // left: 2;
        // width: 3px;
        // background-color: rgb(39, 41, 44);
        color: rgb(39, 41, 44);
        // height: 14px;
        font-size: 16px;
      }
      &::after {
          position: absolute;
          content: '';
          top: -30px;
          left: -2px;
          width: 5px;
          height: 20px;
          background: rgb(39, 41, 44);
      }
    }
    .content {
        margin-top: 30px;
      .box {
        height: 72px;
        margin-bottom: 12px;
        background-color: #fbfbfb;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 22px;
        border-radius: 8px;
        cursor: pointer;
        position: relative;
        user-select: none;
        &:hover {
          .info {
            .tips {
              display: block;
            }
            .action {
              display: inline-flex;
            }
          }
        }
        .info {
          display: flex;
          .icon {
            width: 16px;
            height: 16px;
            // background: url('../../../../../assets/icon/work.png') no-repeat;
            background-size: cover;
            margin-top: 2px;
            margin-right: 8px;
          }
          .text {
            .name {
              font-size: 14px;
              color: #505667;
            }
            .summary {
              font-size: 12px;
              color: #aeb2bd;
              margin-top: 4px;
              word-break: keep-all;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .tips {
            position: absolute;
            right: 0;
            top: 0;
            width: 60px;
            height: 20px;
            line-height: 20px;
            background-color: #505667;
            font-size: 12px;
            color: #ffffff;
            text-align: center;
            // display: none;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 8px;
          }
          .action {
            position: absolute;
            right: 0;
            top: 18px;
            width: 40px;
            display: none;
            height: 20px;
            .edit {
              width: 16px;
              height: 16px;
              // background: url('../../../../../assets/icon/edit.png') no-repeat;
              background-size: cover;
              margin-right: 8px;
            }
            .delete {
              width: 16px;
              height: 16px;
              // background: url('../../../../../assets/icon/delete.png') no-repeat;
              background-size: cover;
            }
            .add {
              width: 16px;
              height: 16px;
              // background: url('../../../../../assets/icon/add.png') no-repeat;
              background-size: cover;
            }
          }
        }
      }
    }
  }
}
</style>