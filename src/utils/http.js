import axios from "axios";
import CONFIG from "@Config";
import {
    httpError
} from "./monitor-error";
/**
 * customize yourself according to business requirements
 * @param {Object} axios:required parameters
 * axios: { method, url, data, params, response}
 * @link: axios
 */
var instance = axios.create({
    baseURL: CONFIG.baseUrl,
    timeout: 60000,
    withCredentials: true,
    method: "post",
    headers: {
        post: {
            "Content-Type": "application/json"
        }
    }
});


//请求返回拦截，把数据返回到页面之前做些什么...
axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default function http() {
      let nowTime = new Date().getTime()
      let loadTime = parseInt(localStorage.getItem('loadExpires'))
      let intTime = localStorage.getItem('expiresIn') * 1000
       //超过一分钟请求 //登陆页不往下执行
    //    console.log(nowTime - loadTime + 60000 , intTime)
       if (nowTime - loadTime + 60000 >= intTime) {
        //    console.log('超时')
                 fetch(CONFIG.baseUrl + "/auth/oauth/token", {
                     method: 'POST',
                     mode: 'cors',
                     credentials: 'include',
                     headers: {
                         'Content-Type': 'application/x-www-form-urlencoded',
                         'Authorization': "Basic " + btoa('web:web')
                     },
                     body: encodeURI("refresh_token=" + localStorage.getItem('refreshToken') + "&grant_type=refresh_token&scope=server")
                 }).then(res => {
                     return res.json()
                 }).then(data => {
                     if (data.errorCode == 100) {
                         //跳转登陆页
                         localStorage.setItem('refreshToken', '')
                         localStorage.setItem("token", '');
                     } else {
                         localStorage.setItem('refreshToken', data.refresh_token)
                         localStorage.setItem("token", data.access_token);
                         localStorage.setItem("expiresIn", data.expires_in);
                         localStorage.setItem("loadExpires", new Date().getTime());
                         instance.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem("token");
                        }
                            window.location.reload()
                     return axiosRequestMiddle(instance).apply(axios, arguments);
                 })
       } else {
        //    console.log('未超时')
           instance.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem("token");
           return axiosRequestMiddle(instance).apply(axios, arguments);
       }
}

/**
 * middleware static resource server
 */
const instanceMiddle = axios.create({
    baseURL: CONFIG.nodeUrl,
    withCredentials: true,
    method: "post",
});
export function middleServer() {
    return axiosRequestMiddle(instanceMiddle).apply(axios, arguments);
}

/**
 * @param {Function} fn: axios构造实例
 * @returns {Promise}
 */
const unauthorizedCode = [401, 402, 403, 41002];

function axiosRequestMiddle(fn) {
    return function (options) {
        return fn({
                method: "post",
                ...options,
                url: detailIEGETRequestCache(options)
            })
            .then(mess => {
                const {
                    errorCode
                } = mess;
                if (unauthorizedCode.indexOf(errorCode) >= 0) {
                    localStorage.removeItem('userId')
                    localStorage.removeItem('token')
                    return (window.location.href = "/");
                }
                return mess.data;
            })
            .catch(error => {
                if(error.response){
                const code = error.response.status;
                if (code == 401) {
                    localStorage.removeItem('userId')
                    localStorage.removeItem('token')
                    return (window.location.href = "/");
                } else if (code == 400) {
                    return {
                        flag: false,
                        errorCode: 400
                    };
                } 
            }
                    httpError(`${fn.defaults.baseURL}${options.url}`, error);
                    return {
                        flag: false,
                        errorCode: 504
                    };
               

            });
    };
}

/**
 * 处理ie下get请求缓存问题
 * @param {Object} options={url, method}
 * @return {String} url
 */
function detailIEGETRequestCache(options) {
    const {
        method,
        url
    } = Object.assign({
        method: "post"
    }, options);
    // 如果ie下请求为get，加上时间戳，防止缓存
    if (method.toUpperCase() === "GET") {
        return url + "?&t=" + new Date().getTime();
    }
    return url;
}