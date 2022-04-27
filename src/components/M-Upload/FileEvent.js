class FileEvent {
    constructor(file) {
      this.file = file;
      this.uuid = Date.now();
      const types = file.type.split('/') || [];
      this.fileType = types.length ? types[0] : '';
      this.base64URL = window.URL.createObjectURL(file); // 本地预览地址
    }
  
    // 释放创建过的URL，不然会存在性能问题
    // 详情可见 : https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
    revokeFileBase64URL(base64URL) {
      window.URL.revokeObjectURL(base64URL);
    }
  
    // 上传/取消上传/重试
    upload() {}
    cancel() {}
    retry() {}
  }
  
  export default FileEvent;