const { Worker } = require("worker_threads");
import { saveWeiboDataToFile } from "../tools/tools";
import { uidList } from "../tools/spiderInfo";
// import { childThread } from "./childThread";
// import * as express from "express";
const express = require("express");

export async function thread(num: number) {
  const app = express();
  const port = 9000;

  for (let i = 0; i < uidList.length; i++) {
    console.log("进入线程");
    try {
      const seprateThread = new Worker(__dirname + "/childThread.js");
      //启动新线程
      console.log("进入线程");
      seprateThread.on("message", () => {
        console.log("启动新线程", i);
      });
      //将数据发送到新线程。
      seprateThread.postMessage(i);
      console.log("发送线程序列", i);
    } catch {
      console.log(i, "线程报错");
      await saveWeiboDataToFile(`第${i}线程报错`, "debug");
      continue;
    }
  }

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  // process.exit(1);
  // console.log("执行thread:", num);
  // console.log("enddate:", end_date);

  // // return;
}
