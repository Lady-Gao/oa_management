module.exports={
    chainWebpack: config => {
        config.when(true, baseConfig);
        config.when(process.env.NODE_ENV === "development", developmentConfig);
        config.when(process.env.NODE_ENV === "production", productionConfig);
      }
}
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
  }
/**
 * 线上
 * 覆盖config.js
 */
function productionConfig(config){
  
  }
  function developmentConfig (config){
     
  }
 function baseConfig (config){
      //别名配置
        config.resolve.alias
        // .set("@src", resolve("src"))
        .set("@Config", resolve(`src/utils/config.js`))
  }
  