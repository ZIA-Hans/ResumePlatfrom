<template>
    <div class="root">
        <!-- <div class=""></div> -->
        <div class="container">
            <img src="../../assets/label.jpg" alt="GDUPT">
            <div class="title">ResumePlatform</div>
            <div class="tips">
              <span v-if="user">
                欢迎你，{{user.name}}
                <el-button round @click="quitLogin">退出登录</el-button>
              </span>
              <span v-else>
                你还未登录 ——>
                <el-button round @click="gotoLogin">立即登录</el-button>
              </span>
            </div>
            <div class="tips">一个模板简历制作平台, 让你的简历更加出众 ~</div>
            <div class="action">
                <div class="item" v-for="item in option" :key="item.key" @click="onRouterToLink(item.path)">
                    {{item.name}}
                </div>
            </div>

            <div class="copyright">
                <div class="footer">
                    <p class="copyright">
                        Copyright © 2018-{{new Date().getFullYear()}} All Rights Reserved. Copyright By huangzemin
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue'
import router from '@/router/index'
import store from '@/store'

export default defineComponent({
    setup() {
        const user = computed(() => store.state.user);

        let option = [
            {
                path: '/intrdation',
                name: '介绍',
                key: Date.now()
            },
            {
                path: '/TemplateList',
                name: '简历',
                key: Date.now()
            },
            {
                path: '/Home',
                name: '工坊',
                key: Date.now()
            },
            {
                path: '/Coders',
                name: '源码',
                key: Date.now()
            },
            
        ]
        option = reactive(option)
        function onRouterToLink(path) {
            router.push(path)
        }

        function gotoLogin(e) {
          router.push('/Login')
        }
        
        function quitLogin(e) {
          // window.localStorage.removeItem('loginUser');
          store.commit('setToken', null);
        }
        return {
            user,
            option,
            onRouterToLink,
            gotoLogin,
            quitLogin
        }
    },
})
</script>

<style lang="less" scoped>
.root {
  height: 100vh;
  width: 100vw;
  text-align: center;
  background-color: #27292c;
  .container {
    width: 100%;
    color: #ffffff;
    padding-top: calc(8vh + 60px);
    img {
      width: 112px;
      height: 112px;
    }
    .title {
      font-size: 24px;
      line-height: 36px;
      padding-top: 10px;
    }
    .tips {
      font-size: 16px;
      line-height: 24px;
      margin-top: 24px;
    }
    .theme {
      margin: 24px 0;
      height: 30px;
    }
    .action {
      width: 300px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 24px;
      .item {
        width: 25%;
        cursor: pointer;
      }
    }
    .copyright {
      position: fixed;
      bottom: 20px;
      width: 100%;
      text-align: center;
      .footer {
        padding-bottom: 16px;
        padding-top: 16px;
        .copyright {
        //   margin: 0 55px;
          opacity: 0.6;
          font-size: 14px;
          text-align: center;
          line-height: 24px;
        }
      }
    }
  }
}
</style>