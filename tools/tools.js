const fs = require('fs');
const path = require('path');
const chineseAndNumberRegex = /[\u4e00-\u9fa5]+/g;

//简单数据清洗
// 使用replace函数提取中文和数字
function refreshWord(totalMark) {
  if (totalMark.length != 0 && totalMark != null) {
    totalMark = totalMark.match(chineseAndNumberRegex)
    if (totalMark == null) {
      return ''
    }
  } else {
    return ''
  }
  return totalMark.join('')
}

//保存为文件
function saveWeiboDataToFile(data, fileName) {
  console.log('=================save file:', fileName)
  const filePath = path.join(__dirname, fileName);
  fs.writeFile(filePath, JSON.stringify(data), err => {
    if (err) {
      console.error(`Failed to save data to file ${fileName}: ${err}`);
    } else {
      console.log(`Data saved to file ${fileName}`);
    }
  });
}

// 定义一个延时函数，用于延时执行抓取页面内容的函数
function delayedCrawlPage(crawlPage) {
  const delay = 5000; // 延时时间，单位为毫秒
  setTimeout(() => {
    crawlPage();
  }, delay);
}

exports.saveWeiboDataToFile = saveWeiboDataToFile
exports.refreshWord = refreshWord
exports.delayedCrawlPage = delayedCrawlPage