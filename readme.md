## 数据库格式

CREATE TABLE `markdata` (
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
  `interactive` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
