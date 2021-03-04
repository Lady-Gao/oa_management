export default {
    // baseUrl: 'http://10.10.11.192:18000',
    baseUrl:  localStorage.getItem("dev-Api")||'http://web2.test.cvtsp.com/api/',//调试用
    socketUrl: "http://web2.test.cvtsp.com", //http://10.10.11.141:9099,
    staticServer: "https://fs.cvtsp.com", //"http://118.25.24.162:4000/uploads",
    nodeUrl: "http://118.25.24.162:4000", //开发环境用到(118.25.24.162) 10.10.12.207
    nodeSocketUrl: "http://10.10.12.207:3000", // 开发环境用到
    switch: "shihang",
    title: "上海势航网络科技有限公司",
    loginText: "势航车联网服务平台",
    loginEnglish: "",
    isAndroid: true,
    isPc: true,
    HomePage: '/monitor/bigDataShow',//登陆后跳转的页面
    ocxLib: 'https://lib.cvtsp.com/video/OcxSetup2_0 _2.CAB#version=2,0,2',
    ICPbeiAn:"沪ICP 备16025594号-6",
    publicSecurity:"沪公网安备 31011802003619号"
};