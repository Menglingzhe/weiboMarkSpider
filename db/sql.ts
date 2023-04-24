// 导入数据库操作模块
import { db } from "./index";
export function saveToSql(Items: any[]) {
  console.log("开始insert SQL操作");
  let sqlStr =
    "insert into markdata(postid,blogger,articeltime,commentscount,repostscount,likecount,piccount,articel,totalmark,bloggeruid,interactive) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  if (Items.length == 0) {
    console.log('评论数为0')
    return;
  }
  for (let i = 0; i < Items.length; i++) {
    // console.log('Item:',Items[i])
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
      Items[i].bloggerUid,
      Items[i].interactive,
    ];
    db.query(sqlStr, modSqlParams, (err, results) => {
      if (err) return console.log(err.message);
    });
  }

  console.log("结束insert SQL操作");
}

// export function testSaveToSql() {
//   console.log("开始SQL操作");
//   let sqlStr =
//     "insert into markdata(postid,blogger,articeltime,commentscount,repostscount,likecount,piccount,articel,totalmark) VALUES (?,?,?,?,?,?,?,?,?)";
//   const Item: any = {
//     postId: "4729625417094330",
//     blogger: "武汉发布",
//     articelTime: "2022-01-25T12:33:54.000Z",
//     commentsCount: 3,
//     repostsCount: 2,
//     likeCount: 8,
//     picCount: 0,
//     articel:
//       "生活服务武汉将于日后半夜至日凌晨迎雪是三年来最大降雪月日记者从省气象部门获悉根据最新气象资料分析预计月日全省自西向东将有大范围强降雪天气过程其中武汉的降雪降雨日后半夜或日凌晨到来此次降雪程度为最近三年最大武汉将于日后半夜至日凌晨迎雪是三年来最大降雪",
//     totalMark: "放大招了真下雪不闹眼子了",
//     bloggerUid: "6582815618",
//   };
//   if ((Item.length = 0)) return;
//     const modSqlParams = [
//       Item.postId,
//       Item.blogger,
//       Item.articelTime,
//       Item.commentsCount,
//       Item.repostsCount,
//       Item.likeCount,
//       Item.picCount,
//       Item.articel,
//       Item.totalMark,
//       Item.bloggerUid

//   ];
//   console.log('插入测试')

//     db.query(sqlStr, modSqlParams, (err, results) => {
//       if (err) return console.log(err.message);
//     });

//   console.log("结束SQL操作");
// }

// testSaveToSql();
