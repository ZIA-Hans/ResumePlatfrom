<template>
    <div class="my_input_image_upload_wrapper">
        <div class="my_input_image_upload_input">
            <input type="file" accept="image/*" style="width: 112px; height: 152px" @change="onChange"/>
        </div>
        
        <div className="my_input_image_upload_box">
            <i class="toutiao toutiao-wode my_input_image_upload__icon"></i>
            <p>{{text}}</p>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import store from '../../store'
import FileEvent from './FileEvent'
export default defineComponent({
    props: {
        text: {
            type: String,
            default: '上传图片'
        }
    },
    setup(props, ctx) {

        let onChange = (e) => {
            const fileList = e.target.files || [];
            // console.log(fileList);
            if (e.target.value === '') {
                return;
            }
            let instance = []
            for(let file of fileList) {
                instance.push(new FileEvent(file))
            }

            onAfterChange && onAfterChange(instance)
        }

        function onAfterChange(instance) {
          // console.log(instance[0].base64URL);
          const imgURL = instance[0].base64URL;
          store.commit('updateEasyData', {
            key: 'base',
            value: {
              avatar: imgURL
            }
          })
          // ctx.emit('myEvent', instance[0].base64URL);
          // store.commit('')
          // 拿到change事件内部的文件数组，给当前方法处理
          // 调用vuex的方法修改base里的avatar信息，组件根据avatar信息去渲染图片或者上传组件
        }

        
        return {
            onChange,
            onAfterChange
        }
    },
})
</script>


<style lang="less" scoped>

  .my_input_selector {
    height: 32px;
    width: 120px;
    cursor: pointer;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.65);
    border-color: #d9d9d9;
    border: 1px solid transparent;
    background-color: #ffffff;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    &:hover {
      color: #40a9ff;
      border-color: #40a9ff;
    }

  .my_input_selector_hidden {
    visibility: hidden;
  }
  .my_input_selector_visible {
    visibility: visible;
  }
}

.my_input_image_upload_wrapper {
    width: 112px;
    height: 152px;
    margin: 14px auto;
    position: relative;
    display: inline-block;
    vertical-align: text-bottom;
    
    &:hover {
      .my_input_image_upload_box {
        .my_input_image_upload__icon {
          transform: scale(1.2);
        }
      }
    }

    .my_input_image_upload_input {
      position: absolute;
      opacity: 0;
      z-index: 2;
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
    .my_input_image_upload_box {
      position: absolute;
      z-index: 1;
      display: flex;
      height: 100%;
      width: 100%;
      cursor: pointer;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      font-size: 12px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
      border: 1px dashed #ddd;
      .my_input_image_upload__icon {
        color: #bec1c5;
        width: 24px;
        height: 24px;
        margin-bottom: 8px;
      }
    }
  }

</style>