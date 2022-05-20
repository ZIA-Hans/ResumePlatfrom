import { reactive, ref, watch, watchEffect } from 'vue'
import { getItem, setItem } from './resumeUtils';

const useLocalStorage = (name, value = {}) => {
    // const localData = ref(JSON.parse(localStorage.getItem(name)) || value);
    const localData = reactive(getItem(name) || value);

    // watchEffect(() => {
    //     // 监听本地localstorage数据对应的响应式变量更改
    //     // localStorage.setItem(name, JSON.stringify(localData.value));
    //     setItem(name, value);
    // })

    watch(localData, (val) => {
        console.log(val);
        setItem(name, val);
        console.log(name, val);
    })
    return localData;
}

export {
     useLocalStorage
}