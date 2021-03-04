

/** 
 * 监听逻辑异常，报错
 */
export default {
  install(Vue) {
    // 处理图片失败异常
    window.addEventListener('error', (msg, url, row, col, error) => {
      if(error) {
        console.log(error)
      }
      return true;
    }, true);
    
    Vue.config.errorHandler = function(err,) {
      console.error('a:' + err.stack);
      // _socket.emit('error_emit', {
      //     name: 'TypeError',
      //     message: err.stack
      // });
    };
  }
};

export function httpError(url, error) {
  // _socket.emit('error_emit', {
  //     title: 'http错误',
  //     url,
  //     date: new Date(),
  //     message: error
  // });
  console.error({
    title: "http异常",
    url,
    date: new Date(),
    message: error,
    navigator: window.navigator.userAgent
  });
}
