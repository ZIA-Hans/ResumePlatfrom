import store from '../store/index'
export function composeComponentData( componentName, style) {
    let composeObj = {
        id: Date.now(),
        name: componentName,
        componentStyle: style
    };
    return composeObj;
}

/**
 * @description 转换成16进制的格式
 * @param {*} color 
 * @returns 
 */
export function formatRgbaTo16Color(color) {
    var values = color
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
  
    const opacity = values[3] ? parseFloat(values[3]) : 1;
    const red = Math.floor(opacity * parseInt(values[0]) + (1 - opacity) * 255);
    const green = Math.floor(opacity * parseInt(values[1]) + (1 - opacity) * 255);
    const blue = Math.floor(opacity * parseInt(values[2]) + (1 - opacity) * 255);
  
    return (
      '#' +
      ('0' + red.toString(16)).slice(-2) +
      ('0' + green.toString(16)).slice(-2) +
      ('0' + blue.toString(16)).slice(-2)
    );
  }

export function getDomStyle(componentRef, initStyles) {
    if(componentRef) {
        let resultStyle = {};
        const computedStyle = window.getComputedStyle(componentRef);

        Object.keys(initStyles).forEach((styleName) => {
            if(!resultStyle[styleName]) {
                const styleValue = computedStyle[styleName];
                if(/color/i.test(styleName)) {
                    if(!/#/.test(styleValue)) {
                        resultStyle[styleName] = formatRgbaTo16Color(styleValue);
                    } else {
                        resultStyle[styleName] = styleValue;
                    }
                } else {
                    resultStyle[styleName] = styleValue;
                }
            }
        });
        return resultStyle;
    }
    return {}
}

export function reducePX(value) {
    if(!value) return '';
    const _value = String(value);
    return Number(_value.replace('px', ''));
}

export function onNumChange(numProp) {
    const style = store.state.currentResumeComponent.style;
    store.commit('updateComponentProps', {
        ...style,
        ...numProp
    });
}

export function getWantProps(base, wantArr) {
    const result = {};
    wantArr.forEach((attr) => {
        result[attr] = base[attr];
    })
    return result;
}