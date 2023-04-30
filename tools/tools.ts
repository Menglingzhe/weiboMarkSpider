import * as fs from "fs";
import * as path from "path";

//简单数据清洗
// 使用replace函数提取中文和数字
export function refreshWord(totalMark: any) {
  const chineseAndNumberRegex = /[\u4e00-\u9fa5]+/g;
  if (totalMark.length != 0 && totalMark != null) {
    totalMark = stripTextBetweenCharacters(totalMark);
    totalMark = totalMark.match(chineseAndNumberRegex);
    if (totalMark == null) {
      return "";
    }
  } else {
    return "";
  }
  return totalMark.join("");
}

//保存为文件
export async function saveWeiboDataToFile(dataStr: string, fileName: string) {
  console.log("=================save file:", fileName);
  const filePath = path.join(__dirname, fileName);
  let data = Buffer.from(dataStr); //这里使用缓冲区(buffer)
  await fs.writeFile(filePath, JSON.stringify(data), { flag: "a" }, (err) => {
    if (err) {
      console.error(`Failed to save data to file ${fileName}: ${err}`);
    } else {
      console.log(`Data saved to file ${fileName}`);
    }
    return;
  });
  return;
}

export async function delayedCrawlPage(ms: number, fn: any, ...args: any[]) {
  await new Promise((resolve) => setTimeout(resolve, ms));
  return await fn(...args);
}

//@的处理
function stripTextBetweenCharacters(text: string) {
  // 构建正则表达式
  const regex1 = new RegExp(">@" + "[^" + "<" + "]*" + "<", "g");
  const regex2 = /(<([^>]+)>)/gi;
  text = text.replace(/【.*?】/g, "");
  text = text.replace(
    /你好你感兴趣的.*?快来与志同道合的小伙伴们一起交流互动吧/g,
    ""
  );
  text = text.replace(/转发微博/g, "");
  // 替换匹配到的文本
  text = text.replace(regex1, ">@" + "<");
  // 替换匹配到的标签
  text = text.replace(regex2, "");
  return text;
}
// const inputText = "<a href='/n/太阳躲猫猫'>@太阳躲猫猫</a> 这是一段中文文本";
// const outputText = stripTextBetweenCharacters(inputText, '>@', '<');
// console.log(outputText); // 输出 "<a href='/n/太阳躲猫猫'></a> 这是一段中文文本"




export function userAgent() {
  let agent_list = [
    // "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    // "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    // "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.0 Safari/532.5",
    "Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/532.9 (KHTML, like Gecko) Chrome/5.0.310.0 Safari/532.9",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.514.0 Safari/534.7",
    "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/534.14 (KHTML, like Gecko) Chrome/9.0.601.0 Safari/534.14",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.14 (KHTML, like Gecko) Chrome/10.0.601.0 Safari/534.14",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.20 (KHTML, like Gecko) Chrome/11.0.672.2 Safari/534.20",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.27 (KHTML, like Gecko) Chrome/12.0.712.0 Safari/534.27",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.24 Safari/535.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.36 Safari/535.7",
    "Mozilla/5.0 (Windows; U; Windows NT 6.0 x64; en-US; rv:1.9pre) Gecko/2008072421 Minefield/3.0.2pre",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.10) Gecko/2009042316 Firefox/3.0.10",
  
  ];

  let random = Math.floor(Math.random() * agent_list.length);
  return agent_list[random];

}