// 导入数据库操作模块
import { db } from "./index";
export function saveToSql(Items: any[]) {
  console.log("开始SQL操作");
  let sqlStr =
    "insert into markdata(postid,blogger,articeltime,commentscount,repostscount,likecount,piccount,articel,totalmark) VALUES (?,?,?,?,?,?,?,?,?)";
  if ((Items.length = 0)) return;
  for (let i = 0; i < Items.length; i++) {
    const modSqlParams = [
      Items[i].postId,
      Items[i].blogger,
      Items[i].articelTime,
      Items[i].commentsCount,
      Items[i].repostsCount,
      Items[i].likeCount,
      Items[i].picCount,
      Items[i].articel,
      Items[i].totalMark,
    ];
    db.query(sqlStr, modSqlParams, (err, results) => {
      if (err) return console.log(err.message);
    });
  }

  console.log("结束SQL操作");
}
