import axios from "axios";
import { checkCookie } from "../tools/cookie-para";
// import { cookie } from "../tools/cookie-para";
import { userAgent } from "../tools/tools";

/**
 * 发起列表链接
 **/
export async function getIndex(url: string, uid: string) {
  // console.log('getIndexurl:',url)
  const cookie: string = checkCookie();
  const response: any = await axios
    .get(url, {
      headers: {
        Cookie: cookie,
        Referer: `https://m.weibo.cn/u/${uid}`,
        "User-Agent": userAgent(),
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .catch(function (error) {
      console.log("getIndexAPI err");
      if (error.response) {
        console.log(
          "// 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围"
        );
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log("error.response.data", error.response.data);
        console.log("error.response.status", error.response.status);
        console.log("response.headers", error.response.headers);
      } else if (error.request) {
        console.log("// 请求已经成功发起，但没有收到响应");
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log("request:", error.request);
      } else {
        // 发送请求时出了点问题
        console.log("Error", error.message);
      }
      console.log("config", error.config);
      console.log("url:", url);
      return null;
    });
  console.log("getindex api is run（成功抓了一列id）");
  if (!response.data) console.log("response.data=null");

  return response.data ? response.data : null;
}

//评论抓取
export async function commentsHotflow(url: string, uid: string) {
  // console.log("commentsHotflow:", url);
  const cookie: string = checkCookie();
  const response: any = await axios
    .get(url, {
      headers: {
        Cookie: cookie,
        Referer: `https://m.weibo.cn/u/${uid}`,
        "User-Agent": userAgent(),
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .catch(function (error) {
      console.log("commentsHotflowAPI err");
      if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(
          "// 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围"
        );
        console.log("error.response.data", error.response.data);
        console.log("error.response.status", error.response.status);
        console.log("response.headers", error.response.headers);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log("request:", error.request);
      } else {
        // 发送请求时出了点问题
        console.log("Error", error.message);
      }
      console.log("config", error.config);
      return null;
    });
  console.log("getArticle api is run（成功抓了一列评论）");
  return response.data ? response.data : null;
}
