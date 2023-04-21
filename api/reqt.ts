const axios = require('axios');
const cookie = require('../tools/cookie-para');
const spiderInfo = require("../tools/spiderInfo")
/**
 * 发起列表链接
 **/
async function getIndex(url) {
  const response = await axios.get(url, {
    headers: {
      Cookie: cookie,
      Referer: `https://m.weibo.cn/u/${spiderInfo.uid}`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'X-Requested-With': 'XMLHttpRequest',
    },
  }).catch(function (error) {
    console.log('getIndex err')
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
    return null
  });
  console.log('getindex api is run（抓了一列id）')
  return response.data
}

//评论抓取
async function commentsHotflow(url) {
  const response = await axios.get(url, {
    headers: {
      Cookie: cookie,
      Referer: `https://m.weibo.cn/u/${spiderInfo.uid}`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'X-Requested-With': 'XMLHttpRequest',
    },
  }).catch(function (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
    return null
  });
  console.log('getArticle api is run（抓了一列评论）')
  return response.data
}


exports.commentsHotflow = commentsHotflow
exports.getIndex = getIndex