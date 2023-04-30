// import { getPostIdsByDate } from "./getData/getPostIdsByDate";

// import { uidList, end_date } from "./tools/spiderInfo";
import { thread } from "./threads/mainThread";
try {
  thread(0)
} catch {
  console.log
  thread(0);
}


// import { childThread } from "./threads/childThread";
// childThread(4)
// async function main() {
//   try {
//     // let end_date = end_date;
//     await getPostIdsByDate(
//       uidList[2].uid,
//       end_date,
//       "0",
//       (err: any, uid: string) => {
//         console.log("运行获取博主发帖列表 enter date index");
//         if (err) {
//           console.error("getPostIdsByDate err", err);
//         }
//         return;
//       }
//     );
//     console.log('getPostId执行完毕')
//   } catch {
//     console.log("main报错");
//     return;
//   }
//   console.log('退出main')
//   process.exit(1);
//   // return;
// }

// main();
