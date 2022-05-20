<template>
    <div class="container">
        <div class="main" :class="{active: isActive}">
            <!-- 切换区域 -->
            <div class="switchWrapper flexCenter">
                <div class="btn flexCenter" @click="changeStatus">
                    <div class="text flexCenter">去登录</div>
                    <div class="text flexCenter">去注册</div>
                </div>
            </div>

            <!-- 表单区域 -->
            <div class="outerBox">
                <div class="formContainer flexCenter" >
                    <div class="title">{{title}}</div>
                    <!-- 登录表单 -->
                    <div class="form" v-if="isActive">
                        <el-form
                        ref="loginFormRef"
                        label-position="right"
                        label-width="100px"
                        :model="loginForm"
                        :rules="loginrules"
                        style="max-width: 460px"
                        >
                            <el-form-item label="用户名" prop="name">
                                <el-input v-model="loginForm.name" placeholder="输入您的用户名" />
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="loginForm.password" placeholder="输入您的密码" />
                            </el-form-item>
                            <el-form-item label="tips" v-if="errorMsg !== ''">
                                <span style="color:red">{{errorMsg}}</span>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary"
                                 @click="submitForm(loginFormRef)"
                                 :loading="isLoding"
                                    >登录</el-button
                                >
                                <el-button @click="resetForm(loginFormRef)">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    
                    <!-- 注册表单 -->
                    <div class="form" v-else>
                        <MyScrollBox :maxHeight="350" :style="style">
                            <el-form
                                label-position="right"
                                label-width="100px"
                                :model="registerForm"
                                ref="registerFormRef"
                                style="max-width: 460px"
                                :rules="registerRules"
                            >
                                <el-form-item label="用户名" prop="username">
                                    <el-input v-model="registerForm.username" placeholder="输入注册的用户名" />
                                </el-form-item>
                                <el-form-item label="密码" prop="password">
                                     <el-input type="password" v-model="registerForm.password" placeholder="输入你的密码" />
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                     <el-input v-model="registerForm.email" placeholder="输入你的邮箱" />
                                </el-form-item>
                                <el-divider content-position="right">基础信息
                                    <span style="color:red">（非必填）</span>
                                </el-divider>
                                <el-form-item label="姓名" prop="name">
                                    <el-input v-model="registerForm.base.name" placeholder="你的个人姓名" />
                                </el-form-item>
                                <el-form-item label="手机" prop="phone">
                                    <el-input v-model="registerForm.phone" placeholder="你的手机号码" />
                                </el-form-item>
                                <el-form-item label="居住地" prop="area">
                                    <el-input v-model="registerForm.base.area" placeholder="你现在住在哪？" />
                                </el-form-item>
                                <el-form-item label="学校">
                                    <el-input v-model="registerForm.base.school" placeholder="你的母校是哪？" />
                                </el-form-item>
                                <el-form-item label="专业">
                                    <el-input v-model="registerForm.base.major" placeholder="师傅你是什么的？" />
                                </el-form-item>
                                <el-form-item label="学位">
                                    <el-input v-model="registerForm.base.degree" placeholder="读完硕士再做工" />
                                </el-form-item>
                                <el-form-item label="民族">
                                    <el-input v-model="registerForm.base.hometown" placeholder="56个民族你属于哪个？" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitRegister(registerFormRef)"
                                        >注册</el-button>
                                    <el-button @click="resetForm(registerFormRef)">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </MyScrollBox>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import MyScrollBox from '@C/M-ScrollBox/index.vue'
import router from '@/router';
import store from '@/store';
import httpMethod from '@/utils/axios'
import { createResumeData, formValidateGene, setItem } from '@/utils/resumeUtils'

export default defineComponent({
    components: {
        MyScrollBox
    },
    setup() {
        const loginFormRef = ref(null);
        const registerFormRef = ref(null);
        let isActive = ref(false);
        let title = ref('注册界面');

        function changeStatus(e) {
            isActive.value = !isActive.value;
            title.value = isActive.value ? '登录界面' : '注册界面'
        }


        const style = {
            width: '100%',
            hight: '100%'
        }
        
        const loginForm = reactive({
            name: '',
            password: '',
        });

        const loginrules = reactive({
            name: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 5, message: '用户名长度在2-5之间', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在6-20个字符之间', trigger: 'blur' },
            ],
        })
        

        const errorMsg = ref('');
        let isLoding = ref(false);
        async function submitForm(loginFormRef) {
            try {
                if(!loginFormRef) return;
                await loginFormRef.validate((valid, fields) => {
                    if(valid) {
                        console.log('submit!');
                    } else {
                        console.log('error submit', fields);
                    }
                })
                
                isLoding.value = true;
                const {data} = await httpMethod.post('/auth/login', loginForm);
                isLoding.value = false;
                store.commit('setUserId', data.id);
                setItem('userId', data.id);
                store.commit('setToken', {
                    token: data.token,
                    name: data.name
                })
                store.commit('setUserResumeData');
                router.push('/'); 

            } catch (error) {
                console.log(error);
                const { message } = error.response.data
                errorMsg.value = message;
                isLoding.value = false;
            }
        }


        function resetForm(formRef) {
            if(!formRef) return;
            formRef.resetFields()
        }


        const registerForm = reactive({
            username: '',
            password: '',
            email: '',
            base: {
                name: '',
                area: '',
                school: '',
                major: '',
                degree: '',
                hometown: '',
            },
            phone: ''
        })
        
        const registerRules = reactive({
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 5, message: '用户名长度在2-5之间', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在6-20个字符之间', trigger: 'blur' },
            ],
            email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                {
                    validator: formValidateGene('validateEmail', '邮箱格式不正确')
                },
            ],
            // name: [{
            //     validator: formValidateGene('validateUsername', '姓名由2-10位汉字组成'),
            //     trigger: blur
            // }],
            // phone: [{
            //     validator: formValidateGene('validateMobile', '手机号由以1开头的11位数字组成'),
            //     trigger: blur
            // }]
        });

        async function submitRegister(formRef) {
            try {
                if(!formRef) return;
                formRef.validate((valid) => {
                    if (valid) {
                        console.log('submit!')
                    } else {
                        console.log('error submit!')
                        return false
                    }
                })
                isLoding.value = true;
                const { data } = await httpMethod.post('/auth/register', registerForm);
                isLoding.value = false;
                const resumeData = createResumeData();
                resumeData.base = {
                    ...resumeData.base,
                    ...registerForm.base
                }
                setItem(`userResume_${data.id}`, resumeData);
                isActive.value = true;
                loginForm.name = registerForm.username;      
            } catch (error) {
                
            }         
        }

        return {
            loginFormRef,
            registerFormRef,
            isActive,
            changeStatus,
            style,
            loginForm,
            loginrules,
            title,
            errorMsg,
            isLoding,
            submitForm,
            resetForm,
            registerRules,
            registerForm,
            submitRegister
        }
    },
})
</script>

<style lang="less" scoped>
.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
    background-color: #ededed;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    // background-image: url(../../../../../src/assets/sh.jpg);
    // background-repeat: no-repeat;
    // background-size: 100% 100%;

    .main {
        position: relative;
        width: 900px;
        height: 550px;
        margin: auto;
        overflow: hidden;
        border: 1px solid;

        .switchWrapper {
            position: absolute;
            z-index: 99;
            left: 0;
            overflow: hidden;
            width: 32%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.4);
            transition: transform 1s ease-in-out;
            
            &::after {
                content: '';
                display: block;
                background-image: url(@/assets/head.jpg);
                background-size: 900px 550px;
                background-position: top left;
                width: 100%;
                height: 100%;
                overflow: hidden;
                transition: all 1s ease-in-out;
            }

            .btn {
                position: absolute;
                width: 90px;
                height: 36px;
                color: #fffffe;
                background-color: #ff8906;
                font-size: 15px;
                border-radius: 30px;
                cursor: pointer;
                flex-wrap: wrap;
                overflow: hidden;
            }
            .text {
                width: 100%;
                height: 100%;
                transition: all 1s ease-in-out;
            }    
        }
        
        .outerBox {
            position: absolute;
            z-index: 9;
            left: 32%;
            overflow: hidden;
            width: 68%;
            height: 100%;
            transition: all 1s ease-in-out;

            .formContainer {
                flex-direction: column;
                justify-content: space-evenly;
                width: 100%;
                height: 100%;
                background-color: #fffffe;

                .title {
                    font-size: 20px;
                    color: #1d2129;
                    font-weight: 500;
                    transition: all 1s ease-in-out;
                }

                .form {
                    width: 80%;
                    border: 5px solid #ff8906;
                    padding: 40px 20px;
                    max-height: 450px;
                }
            }
        }
    }
    .active {
        .switchWrapper{
            transform: translateX(calc(900px - 100%));
            &::after {
                background-position: top right;
            }
        }
        .text:first-child {
            margin-top: -100%;
        }
        .outerBox {
            transform: translateX(calc(-900px + 100%));
            .title {
                transform: rotateZ(360deg);
            }
        }

    }
}

</style>
