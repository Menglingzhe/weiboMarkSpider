import * as fs from "fs";
import * as path from "path";
const chineseAndNumberRegex = /[\u4e00-\u9fa5]+/g;

//简单数据清洗
// 使用replace函数提取中文和数字
export function refreshWord(totalMark:any) {
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
export function saveWeiboDataToFile(data:any, fileName:string) {
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

export async function delayedCrawlPage(ms:number, fn:any, ...args:any[]) {
  await new Promise(resolve => setTimeout(resolve, ms));
  return await fn(...args);
}


export function saveToSql(Item:any[]) {
  
}
