CREATE TABLE `weibomark`.`markdata` (
  `postid` VARCHAR(20) NOT NULL,
  `blogger` VARCHAR(20) NULL,
  `articeltime` VARCHAR(45) NULL,
  `commentscount` INT NULL DEFAULT 0,
  `repostscount` INT NULL DEFAULT 0,
  `likecount` INT NULL DEFAULT 0,
  `piccount` INT NULL DEFAULT 0,
  `articel` LONGTEXT NULL,
  `totalMark` LONGTEXT NULL,
  PRIMARY KEY (`postid`));