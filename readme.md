
## 数据库建表

```

CREATE TABLE `markdata` (
  `markdatacol` int NOT NULL AUTO_INCREMENT,
  `postid` varchar(20) NOT NULL,
  `blogger` varchar(20) DEFAULT NULL,
  `articeltime` datetime DEFAULT NULL,
  `commentscount` int DEFAULT '0',
  `repostscount` int DEFAULT '0',
  `likecount` int DEFAULT '0',
  `piccount` int DEFAULT '0',
  `articel` longtext,
  `totalmark` longtext,
  `bloggeruid` varchar(20) DEFAULT NULL,
  `interactive` tinyint DEFAULT '0',
  `since_id` varchar(30) DEFAULT '0',
  `repost_type` tinyint DEFAULT '0',
  `repost_text` longtext,
  PRIMARY KEY (`markdatacol`)
) ENGINE=InnoDB AUTO_INCREMENT=28758 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
