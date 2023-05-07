// 导入数据库操作模块
import { db } from "./index";
export function saveToSql(Items: any[]) {
  console.log("开始insert SQL操作");
  
  if (Items.length == 0) {
    console.log("评论数为0");
    return;
  }
  try {
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
        Items[i].since_id,
        Items[i].repost_type,
        Items[i].repost_text,
      ];
      if (!Items[i].bloggerUid) {
        console.log("没有找到表：", Items[i].bloggerUid);
      }
        let sqlStr = `insert into weibo${Items[i].bloggerUid}(postid,blogger,articeltime,commentscount,repostscount,likecount,piccount,articel,totalmark,bloggeruid,interactive,since_id,repost_type,repost_text) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      db.query(sqlStr, modSqlParams, (err, results) => {
        if (err) return console.log(err.message);
      });
    }
  } catch {
    console.log("数据库出错");
    return;
  }
  console.log("结束insert SQL操作");
  return;
}

export function creatNameTableSql(name: string) {
  console.log("开始SQL操作");
  let sqlStr = `
    CREATE TABLE weibo${name} (
  markdatacol int NOT NULL AUTO_INCREMENT,
  postid varchar(20) NOT NULL,
  blogger varchar(20) DEFAULT NULL,
  articeltime datetime DEFAULT NULL,
  commentscount int DEFAULT '0',
  repostscount int DEFAULT '0',
  likecount int DEFAULT '0',
  piccount int DEFAULT '0',
  articel longtext,
  totalmark longtext,
  bloggeruid varchar(20) DEFAULT NULL,
  interactive tinyint DEFAULT '0',
  since_id varchar(30) DEFAULT '0',
  repost_type tinyint DEFAULT '0',
  repost_text longtext,
  PRIMARY KEY (markdatacol)
) ENGINE = InnoDB AUTO_INCREMENT = 28758 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
`;
  
  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
  });
  console.log('建表结束,name:', name)
  console.log('建表语句：',sqlStr)
  console.log("结束SQL操作");
}

export function exportTableSql(name: string) {
  console.log("开始导出SQL操作");
  let sqlStr = `
    SELECT * FROM weibo${name} INTO OUTFILE './weibo${name}.sql';
`;

  db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
  });
  console.log("导出结束,name:", name);
  console.log("导出语句：", sqlStr);
  console.log("结束SQL操作");
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
//   if ((Item.length == 0)) return;
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
