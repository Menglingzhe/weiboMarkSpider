const spiderInfo = require("./tools/spiderInfo.js")
const baseUrl = spiderInfo.baseUrl;
const api = require("./api/reqt")


// 获取微博主贴的详细信息和评论内容 comment ==false
async function getPostInfo(postId, callback) {
  let url = `${baseUrl}/comments/hotflow?id=${postId}&mid=${postId}&max_id_type=0`;
  let max_id = '0'
  let totalMark = ''

  while (max_id !== 0) {
    url = `${url}&max_id=${max_id}`
    const response = await api.commentsHotflow(url)

    if (response.ok === 0) {
      console.log(`${postId}no mark`)
      break
    } else if (response.ok !== 1) {
      callback(new Error(`${postId} :mark response.ok !== 1`), null);
      break;
    } else if (response.data.total_number === 0 || response.data.length == 0) {
      console.log(`${postId}no mark`)
      break;
    }
    console.log(`${postId}畅通`)

    let markList = response.data.data
    max_id = response.data.max_id
    // console.log(max_id , response.data.max_id)
    markList.forEach(item => {
      totalMark += item.text
      if (item.comments !== false) {
        for (let i = 0; i < item.comments.length; i++) {
          totalMark += item.comments[i].text
        }
      }
    });
  }

  return totalMark
}


exports.getPostInfo = getPostInfo