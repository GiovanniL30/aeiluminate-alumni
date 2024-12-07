-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: aeiluminate-db.cfcyu0wcamqe.ap-southeast-2.rds.amazonaws.com    Database: aeiluminate
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `academic_programs`
--

DROP TABLE IF EXISTS `academic_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_programs` (
  `programID` varchar(150) NOT NULL,
  `school_name` varchar(150) NOT NULL,
  `program_name` varchar(150) NOT NULL,
  `specialization` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`programID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_programs`
--

LOCK TABLES `academic_programs` WRITE;
/*!40000 ALTER TABLE `academic_programs` DISABLE KEYS */;
INSERT INTO `academic_programs` VALUES ('1','SAMCIS','Bachelor of Science in Accountancy',NULL),('10','SAMCIS','Bachelor of Multimedia Arts',NULL),('100','SAS','Master of Arts in Education','Inclusive Education'),('101','SAS','Master of Arts in Education','Social Studies'),('102','SAS','Graduate Certificate in Inclusive Education',NULL),('103','SAS','Doctor of Philosophy in Philosophy',NULL),('104','SAS','Master of Arts in Catholic Educational Leadership and Management',NULL),('105','SAS','Master of Arts in Philosophy',NULL),('106','SAS','Master of Arts in Religious Studies',NULL),('107','SAS','Master of Science in Guidance and Counseling',NULL),('108','SAS','Master of Science in Psychology',NULL),('11','SEA','Bachelor of Science in Architecture',NULL),('12','SEA','Bachelor of Science in Chemical Engineering',NULL),('13','SEA','Bachelor of Science in Civil Engineering',NULL),('14','SEA','Bachelor of Science in Electrical Engineering',NULL),('15','SEA','Bachelor of Science in Electronics Engineering',NULL),('16','SEA','Bachelor of Science in Geodetic Engineering',NULL),('17','SEA','Bachelor of Science in Industrial Engineering',NULL),('18','SEA','Bachelor of Science in Mechanical Engineering',NULL),('19','SEA','Bachelor of Science in Mechatronics Engineering',NULL),('2','SAMCIS','Bachelor of Science in Management Accounting',NULL),('20','SEA','Bachelor of Science in Mining Engineering',NULL),('21','SONAHBS','Bachelor of Science in Biology',NULL),('22','SONAHBS','Bachelor of Science in Medical Laboratory Science',NULL),('23','SONAHBS','Bachelor of Science in Nursing',NULL),('24','SONAHBS','Bachelor of Science in Pharmacy',NULL),('25','SONAHBS','Bachelor of Science in Radiologic Technology',NULL),('26','STELA','Bachelor of Arts in Communication',NULL),('27','STELA','Bachelor of Arts in Philosophy',NULL),('28','STELA','Bachelor of Arts in Political Science',NULL),('29','STELA','Bachelor of Elementary Education',NULL),('3','SAMCIS','Bachelor of Science in Business Administration','Financial Management with specialization Business Analytics'),('30','STELA','Bachelor of Physical Education',NULL),('31','STELA','Bachelor of Science in Psychology',NULL),('32','STELA','Bachelor of Secondary Education','English'),('33','STELA','Bachelor of Secondary Education','Filipino'),('34','STELA','Bachelor of Secondary Education','Math'),('35','STELA','Bachelor of Secondary Education','Science'),('36','STELA','Bachelor of Secondary Education','Social Studies'),('37','STELA','Bachelor of Special Needs Education',NULL),('38','STELA','Bachelor of Science in Social Work',NULL),('39','STELA','Certificate in Teaching',NULL),('4','SAMCIS','Bachelor of Science in Business Administration','Marketing Management with specialization in Business Analytics'),('40','SOL','Juris Doctor',NULL),('41','SOL','Master of Laws',NULL),('42','SOM','Doctor of Medicine',NULL),('43','SAS','Doctor of Philosophy in Management',NULL),('44','SAS','Master of Business Administration',NULL),('45','SAS','Master of Entrepreneurship',NULL),('46','SAS','Master of Science in Accountancy',NULL),('47','SAS','Master of Science in Business Administration',NULL),('48','SAS','Master of Science in Public Management',NULL),('49','SAS','Master in Information Technology',NULL),('5','SAMCIS','Bachelor of Science in Entrepreneurship','Business Analytics'),('50','SAS','Master in Library and Information Science',NULL),('51','SAS','Master of Science in Service  Management and Engineering',NULL),('52','SAS','Doctor of Engineering',NULL),('53','SAS','Master of Arts in Environmental and Habitat Planning',NULL),('54','SAS','Master of Engineering','Chemical Engineering'),('55','SAS','Master of Engineering','Electrical Engineering'),('56','SAS','Master of Engineering','Electronics Engineering'),('57','SAS','Master of Engineering','Industrial Engineering'),('58','SAS','Master of Engineering','Mechanical Engineering'),('59','SAS','Master of Science in Environmental Engineering',NULL),('6','SAMCIS','Bachelor of Science in Tourism Management',NULL),('60','SAS','Master of Science in Environmental Engineering','Mining Environmental Measures and Processes'),('61','SAS','Master of Science in Management Engineering',NULL),('62','SAS','Master in Manufacturing Engineering and Management',NULL),('63','SAS','Doctor of Philosophy in Biology','Microbiology'),('64','SAS','Doctor of Philosophy in Biology','Ecology and Conservation Biology'),('65','SAS','Doctor of Philosophy in Biology','Plant Biology'),('66','SAS','Doctor of Philosophy in Biology','Animal Biology'),('67','SAS','Doctor of Philosophy in Pharmacy','Pharmacognosy'),('68','SAS','Doctor of Philosophy in Pharmacy','Medicinal Chemistry'),('69','SAS','Doctor of Philosophy in Pharmacy','Industrial Pharmacy'),('7','SAMCIS','Bachelor of Science in Hospitality Management',NULL),('70','SAS','Master of Science in Biology','Plant Biology'),('71','SAS','Master of Science in Biology','Animal Biology'),('72','SAS','Master of Science in Biology','Microbial Biology'),('73','SAS','Master of Science in Biology','Ecology'),('74','SAS','Master in Environmental Science',NULL),('75','SAS','Master of Science in Environmental and Conservation Biology',NULL),('76','SAS','Master of Science in Pharmacy','Hospital Pharmacy'),('77','SAS','Master of Science in Pharmacy','Manufacturing Pharmacy'),('78','SAS','Master of Science in Medical Technology','Clinical Microbiology'),('79','SAS','Master of Science in Medical Technology','Transfusion Medicine'),('8','SAMCIS','Bachelor of Science in Computer Science',NULL),('80','SAS','Master of Science in Public Health','Epidemiology'),('81','SAS','Master of Science in Public Health','Public Health Management'),('82','SAS','Master of Science in Public Health','Environmental Health'),('83','SAS','Doctor of Philosophy in Nursing',NULL),('84','SAS','Master of Science in Nursing','Adult Health Nursing'),('85','SAS','Master of Science in Nursing','Community Health Nursing'),('86','SAS','Master of Science in Nursing','Mental Health and Psychiatric Nursing'),('87','SAS','Master of Science in Nursing','Maternal and Child Health Nursing'),('88','SAS','Master of Science in Nursing','Nursing Administration'),('89','SAS','Doctor of Philosophy in Science Education',NULL),('9','SAMCIS','Bachelor of Science in Information Technology',NULL),('90','SAS','Doctor of Philosophy in Educational Management',NULL),('91','SAS','Doctor of Philosophy in Language Education',NULL),('92','SAS','Master of Arts in Special Education',NULL),('93','SAS','Master of Arts in Educational Management',NULL),('94','SAS','Master of Science in Physical Education and Sports',NULL),('95','SAS','Master of Arts in Education','Early Childhood Education'),('96','SAS','Master of Arts in Education','Filipino Education'),('97','SAS','Master of Arts in Education','Language Education'),('98','SAS','Master of Arts in Education','Mathematics Education'),('99','SAS','Master of Arts in Education','Science Education');
/*!40000 ALTER TABLE `academic_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_log` (
  `logID` varchar(150) NOT NULL,
  `userID` varchar(150) NOT NULL,
  `action` varchar(150) NOT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `deviceInfo` varchar(150) DEFAULT NULL,
  `osInfo` varchar(150) DEFAULT NULL,
  `browserInfo` varchar(150) DEFAULT NULL,
  `actionDetails` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`logID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `albumId` varchar(150) NOT NULL,
  `albumTitle` text NOT NULL,
  `albumIdOwner` varchar(150) NOT NULL,
  PRIMARY KEY (`albumId`),
  KEY `owner_idx` (`albumIdOwner`),
  CONSTRAINT `owner` FOREIGN KEY (`albumIdOwner`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES ('83dd1923-ea17-4847-a86a-ee68b687ab2b','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','jioavjasvopasopvaosvasv');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumni`
--

DROP TABLE IF EXISTS `alumni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumni` (
  `userID` varchar(150) NOT NULL,
  `year_graduated` year NOT NULL,
  `programID` varchar(150) NOT NULL,
  `isEmployed` tinyint(1) NOT NULL,
  PRIMARY KEY (`userID`),
  KEY `programID` (`programID`),
  CONSTRAINT `alumni_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `alumni_ibfk_2` FOREIGN KEY (`programID`) REFERENCES `academic_programs` (`programID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumni`
--

LOCK TABLES `alumni` WRITE;
/*!40000 ALTER TABLE `alumni` DISABLE KEYS */;
INSERT INTO `alumni` VALUES ('197fba03-e6d9-4f7f-94ac-4b39a9acd476',2004,'1',0),('22d47ae2-6f3a-4a27-904d-d60cd46de9bb',2024,'1',0);
/*!40000 ALTER TABLE `alumni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `appID` varchar(150) NOT NULL,
  `diplomaURL` varchar(150) NOT NULL,
  `schoolIdURL` varchar(150) NOT NULL,
  `userID` varchar(150) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appID`),
  KEY `userID` (`userID`),
  CONSTRAINT `application_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES ('dc971108-a614-4f1e-99ef-b12b7a8e9999','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/67528870779983d169e1/view?project=674c022d00339c9cad92&mode=admin','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/675288716d618d600c86/view?project=674c022d00339c9cad92&mode=admin','22d47ae2-6f3a-4a27-904d-d60cd46de9bb','2024-12-06 05:15:30');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentID` varchar(150) NOT NULL,
  `content` text,
  `createdAt` timestamp NULL DEFAULT NULL,
  `postID` varchar(150) DEFAULT NULL,
  `userID` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`commentID`),
  KEY `postID` (`postID`),
  KEY `userID` (`userID`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`postID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('06b3af2f-6d91-4e3f-9b00-1e1dfa9157d0','muka kang tite donna','2024-12-06 04:40:36','3dc02b36-76db-4596-a924-7734d80d67c3','jioavjasvopasopvaosvasv'),('51f6f478-a018-4178-9a87-0247265ccbd6','tangina mo kalbo','2024-12-06 04:49:34','2001479a-7e45-46d0-8770-b4cb69cdc6e3','25564fc0-db8d-4084-a53b-c579c331aaec'),('7b649028-c37f-43a5-bfdc-c52a02a33f86','HAHAHAHAHHAAHAHAH','2024-12-06 04:49:28','2001479a-7e45-46d0-8770-b4cb69cdc6e3','25564fc0-db8d-4084-a53b-c579c331aaec'),('b36801bd-fdbf-442b-81a1-39ce45fb900c','tnginang muka yan\n','2024-12-06 04:26:23','2001479a-7e45-46d0-8770-b4cb69cdc6e3','jioavjasvopasopvaosvasv'),('b6ab0e80-2188-46fd-9c0e-80f5aeafdddb','namo baks, mamaya ka saken sa gate','2024-12-06 04:47:54','3dc02b36-76db-4596-a924-7734d80d67c3','25564fc0-db8d-4084-a53b-c579c331aaec'),('f38702ff-8413-4899-81c1-79e40e948e4a','baklaaaaaaaaaaaaaaa','2024-12-06 04:35:38','f139823e-a63e-476c-a544-f9ca538fc91c','25564fc0-db8d-4084-a53b-c579c331aaec');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation` (
  `conversationID` varchar(150) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `memberOne` varchar(150) NOT NULL,
  `memberTwo` varchar(150) NOT NULL,
  PRIMARY KEY (`conversationID`),
  KEY `one_idx` (`memberOne`),
  KEY `two_idx` (`memberTwo`),
  CONSTRAINT `one` FOREIGN KEY (`memberOne`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `two` FOREIGN KEY (`memberTwo`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
INSERT INTO `conversation` VALUES ('4c1100fa-91d2-4914-a7c5-b733caa2124c','2024-12-05 19:18:13','asvasgasgbhababd','uid1'),('762a34de-4b57-4f76-bb52-7af0410bac50','2024-12-05 18:39:55','jioavjasvopasopvaosvasv','197fba03-e6d9-4f7f-94ac-4b39a9acd476'),('9f7899ef-8094-4b58-9eed-77b5f7d381dd','2024-12-06 04:40:39','jioavjasvopasopvaosvasv','25564fc0-db8d-4084-a53b-c579c331aaec'),('a3823df0-684f-4013-a428-ba6de65154e7','2024-12-06 04:40:50','uid1','25564fc0-db8d-4084-a53b-c579c331aaec'),('b9d497e2-1171-4019-a920-bedabc584dc8','2024-12-05 19:39:44','asvasgasgbhababd','jioavjasvopasopvaosvasv'),('c77c2e77-38b5-4429-acf0-6b6694696236','2024-12-05 18:39:44','jioavjasvopasopvaosvasv','uid1'),('f00fd6c8-4963-499b-9df2-08a62cde5a6f','2024-12-06 04:37:52','jdslfjskfj','25564fc0-db8d-4084-a53b-c579c331aaec');
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventID` varchar(150) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `description` text,
  `eventDateTime` datetime DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `eventType` enum('reunion','mass','thanksgiving','seminar','webinar','conference','workshop','others') DEFAULT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(150) DEFAULT NULL,
  `imageUrl` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`eventID`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `followerID` varchar(150) NOT NULL,
  `followedID` varchar(150) NOT NULL,
  `followedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`followerID`,`followedID`),
  KEY `followedID` (`followedID`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`followerID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`followedID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES ('25564fc0-db8d-4084-a53b-c579c331aaec','asvasgasgbhababd','2024-12-06 05:24:27'),('25564fc0-db8d-4084-a53b-c579c331aaec','uid1','2024-12-06 04:50:15'),('asvasgasgbhababd','uid1','2024-12-04 21:54:17'),('jdslfjskfj','25564fc0-db8d-4084-a53b-c579c331aaec','2024-12-06 04:37:50'),('jioavjasvopasopvaosvasv','asvasgasgbhababd','2024-12-06 04:27:49'),('jioavjasvopasopvaosvasv','uid1','2024-12-04 21:54:00'),('uid1','25564fc0-db8d-4084-a53b-c579c331aaec','2024-12-06 16:29:17'),('uid1','asvasgasgbhababd','2024-12-06 00:29:15'),('uid1','jioavjasvopasopvaosvasv','2024-12-05 04:12:29');
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interested_users`
--

DROP TABLE IF EXISTS `interested_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interested_users` (
  `userid` varchar(150) NOT NULL,
  `eventid` varchar(150) NOT NULL,
  PRIMARY KEY (`userid`,`eventid`),
  KEY `interested_users_ibfk_2_idx` (`eventid`),
  CONSTRAINT `interested_users_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interested_users_ibfk_2` FOREIGN KEY (`eventid`) REFERENCES `events` (`eventID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interested_users`
--

LOCK TABLES `interested_users` WRITE;
/*!40000 ALTER TABLE `interested_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `interested_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_listing`
--

DROP TABLE IF EXISTS `job_listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_listing` (
  `jobID` varchar(150) NOT NULL,
  `jobTitle` varchar(150) NOT NULL,
  `company` varchar(150) NOT NULL,
  `experienceRequired` varchar(150) DEFAULT NULL,
  `workType` enum('on-site','wfh','hybrid') NOT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `description` text,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`jobID`),
  KEY `CreatedBy` (`createdBy`),
  CONSTRAINT `job_listing_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_listing`
--

LOCK TABLES `job_listing` WRITE;
/*!40000 ALTER TABLE `job_listing` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `postID` varchar(150) NOT NULL,
  `userID` varchar(150) NOT NULL,
  `likedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`postID`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`postID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES ('2001479a-7e45-46d0-8770-b4cb69cdc6e3','uid1','2024-12-06 05:16:41'),('3dc02b36-76db-4596-a924-7734d80d67c3','197fba03-e6d9-4f7f-94ac-4b39a9acd476','2024-12-06 04:42:46'),('3dc02b36-76db-4596-a924-7734d80d67c3','25564fc0-db8d-4084-a53b-c579c331aaec','2024-12-06 04:48:59'),('3dc02b36-76db-4596-a924-7734d80d67c3','jioavjasvopasopvaosvasv','2024-12-06 04:42:14'),('3dc02b36-76db-4596-a924-7734d80d67c3','uid1','2024-12-06 05:16:29'),('4b0d17b6-1000-4317-811c-55084319a6c7','asvasgasgbhababd','2024-12-06 10:13:27'),('4b0d17b6-1000-4317-811c-55084319a6c7','uid1','2024-12-07 00:35:24'),('6bb0be85-fa53-4211-a596-02e9c56a3777','uid1','2024-12-07 00:35:55'),('8fec9f62-41d1-41c0-bdf1-0622906410e2','jioavjasvopasopvaosvasv','2024-12-07 00:23:58'),('dac0d092-0af6-4377-a933-07c22d3801c4','jioavjasvopasopvaosvasv','2024-12-07 00:24:44'),('f139823e-a63e-476c-a544-f9ca538fc91c','25564fc0-db8d-4084-a53b-c579c331aaec','2024-12-06 04:35:45');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `mediaID` varchar(150) NOT NULL,
  `mediaType` varchar(50) DEFAULT NULL,
  `uploadedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `postID` varchar(150) DEFAULT NULL,
  `mediaURL` varchar(225) NOT NULL,
  PRIMARY KEY (`mediaID`),
  KEY `postID` (`postID`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`postID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES ('109d37f1-07e2-4f50-b816-11356ce57be2','image/png','2024-12-06 23:50:59','8fec9f62-41d1-41c0-bdf1-0622906410e2','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/109d37f1-07e2-4f50-b816-11356ce57be2/view?project=674c022d00339c9cad92&mode=admin'),('36393a9a-21cd-4770-b935-c1620d96023f','image/jpeg','2024-12-06 01:06:44','2001479a-7e45-46d0-8770-b4cb69cdc6e3','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/36393a9a-21cd-4770-b935-c1620d96023f/view?project=674c022d00339c9cad92&mode=admin'),('743da839-4ccb-49aa-acf9-b001a31b310e','image/jpeg','2024-12-07 00:14:15','75a816a9-2520-4e0b-844f-940300e3f743','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/743da839-4ccb-49aa-acf9-b001a31b310e/view?project=674c022d00339c9cad92&mode=admin'),('9bbc7a96-56b4-4b41-aa19-f4ad5afbc3d6','image/jpeg','2024-12-07 00:14:15','75a816a9-2520-4e0b-844f-940300e3f743','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/9bbc7a96-56b4-4b41-aa19-f4ad5afbc3d6/view?project=674c022d00339c9cad92&mode=admin'),('bf1c747a-693f-47f8-b9b0-625c5102781f','image/jpeg','2024-12-07 00:22:27','712bea34-4f25-4a1c-8860-fb513865b1b2','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/bf1c747a-693f-47f8-b9b0-625c5102781f/view?project=674c022d00339c9cad92&mode=admin'),('c024175b-d7b3-4302-ac1b-7ae5ac9378c8','image/jpeg','2024-12-07 00:13:36','339d7ba8-ccbe-4486-be00-a962339016d5','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/c024175b-d7b3-4302-ac1b-7ae5ac9378c8/view?project=674c022d00339c9cad92&mode=admin'),('c821e370-1531-4c3a-9f9b-7a3b479af21b','image/jpeg','2024-12-07 00:13:36','339d7ba8-ccbe-4486-be00-a962339016d5','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/c821e370-1531-4c3a-9f9b-7a3b479af21b/view?project=674c022d00339c9cad92&mode=admin'),('ec75da3d-3ac7-4b5a-9618-4ee86a6cf7e4','image/png','2024-12-06 09:15:16','74f0efec-b984-416c-8d23-a80d4fc6f3f9','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/ec75da3d-3ac7-4b5a-9618-4ee86a6cf7e4/view?project=674c022d00339c9cad92&mode=admin');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postID` varchar(150) NOT NULL,
  `userID` varchar(150) NOT NULL,
  `caption` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `albumId` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`postID`),
  KEY `userID` (`userID`),
  KEY `album_idx` (`albumId`),
  CONSTRAINT `album` FOREIGN KEY (`albumId`) REFERENCES `albums` (`albumId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('2001479a-7e45-46d0-8770-b4cb69cdc6e3','asvasgasgbhababd','This is my new post!','2024-12-06 01:06:44',NULL),('339d7ba8-ccbe-4486-be00-a962339016d5','jioavjasvopasopvaosvasv','Members!!!!!!!!!!!!!','2024-12-07 00:13:36',NULL),('3dc02b36-76db-4596-a924-7734d80d67c3','25564fc0-db8d-4084-a53b-c579c331aaec','i love this project so so much !!!','2024-12-06 04:37:25',NULL),('4b0d17b6-1000-4317-811c-55084319a6c7','asvasgasgbhababd','This is my new post!','2024-12-06 01:05:19',NULL),('6bb0be85-fa53-4211-a596-02e9c56a3777','uid1','sssssssssssssssssssssssssssss','2024-12-06 05:17:03',NULL),('712bea34-4f25-4a1c-8860-fb513865b1b2','jioavjasvopasopvaosvasv',' ','2024-12-07 00:22:26','83dd1923-ea17-4847-a86a-ee68b687ab2b'),('74f0efec-b984-416c-8d23-a80d4fc6f3f9','uid1','tngina, pang kakye HAHAHAHAHA','2024-12-06 09:15:16',NULL),('75a816a9-2520-4e0b-844f-940300e3f743','jioavjasvopasopvaosvasv','','2024-12-07 00:14:15',NULL),('8fec9f62-41d1-41c0-bdf1-0622906410e2','jioavjasvopasopvaosvasv',' ','2024-12-06 23:50:58','83dd1923-ea17-4847-a86a-ee68b687ab2b'),('dac0d092-0af6-4377-a933-07c22d3801c4','jioavjasvopasopvaosvasv','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','2024-12-07 00:12:58',NULL),('f139823e-a63e-476c-a544-f9ca538fc91c','asvasgasgbhababd','This is my new post!','2024-12-06 01:06:10',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_messages`
--

DROP TABLE IF EXISTS `private_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_messages` (
  `messageID` varchar(150) NOT NULL,
  `conversationID` varchar(150) NOT NULL,
  `senderID` varchar(150) NOT NULL,
  `receiverID` varchar(150) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL,
  PRIMARY KEY (`messageID`),
  KEY `conversionID_idx` (`conversationID`),
  KEY `senderID_idx` (`senderID`),
  KEY `receiverID_idx` (`receiverID`),
  CONSTRAINT `conversionID` FOREIGN KEY (`conversationID`) REFERENCES `conversation` (`conversationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `receiverID` FOREIGN KEY (`receiverID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `senderID` FOREIGN KEY (`senderID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_messages`
--

LOCK TABLES `private_messages` WRITE;
/*!40000 ALTER TABLE `private_messages` DISABLE KEYS */;
INSERT INTO `private_messages` VALUES ('0789ce81-ce40-403a-ac9d-6d729cba7a34','f00fd6c8-4963-499b-9df2-08a62cde5a6f','jdslfjskfj','25564fc0-db8d-4084-a53b-c579c331aaec','helloooooooo\n','2024-12-06 04:38:09'),('128e973b-e4b3-4223-b6e5-5d618308cfc8','a3823df0-684f-4013-a428-ba6de65154e7','25564fc0-db8d-4084-a53b-c579c331aaec','uid1','aaaaaaaaaaa','2024-12-06 05:18:55'),('25c176ff-5495-460a-9866-c9290cc377d9','b9d497e2-1171-4019-a920-bedabc584dc8','asvasgasgbhababd','jioavjasvopasopvaosvasv','aaaaaaaaaaaaaaaa','2024-12-05 19:39:49'),('278f1d33-3b76-4aa6-87c4-7457a59f120e','a3823df0-684f-4013-a428-ba6de65154e7','uid1','25564fc0-db8d-4084-a53b-c579c331aaec','asssssssssssssssssssssss','2024-12-06 05:18:15'),('28e92b68-1ede-4cb4-92c2-69ff7b199823','9f7899ef-8094-4b58-9eed-77b5f7d381dd','jioavjasvopasopvaosvasv','25564fc0-db8d-4084-a53b-c579c331aaec','donnnaa','2024-12-06 04:40:44'),('44e07dc6-6a0c-416e-a27c-89237417b649','a3823df0-684f-4013-a428-ba6de65154e7','25564fc0-db8d-4084-a53b-c579c331aaec','uid1','wow\n','2024-12-06 04:49:49'),('4ef212b1-936a-4071-a84c-1bdfad1c8438','4c1100fa-91d2-4914-a7c5-b733caa2124c','asvasgasgbhababd','uid1','ascasc','2024-12-05 19:18:17'),('716157b3-a72d-4563-8d44-20ac641893a1','f00fd6c8-4963-499b-9df2-08a62cde5a6f','25564fc0-db8d-4084-a53b-c579c331aaec','jdslfjskfj','yuhhhhhhhhhhhhhhhhh','2024-12-06 04:47:10'),('74ed60d2-739c-4252-92cc-9c3b00d3b33c','a3823df0-684f-4013-a428-ba6de65154e7','uid1','25564fc0-db8d-4084-a53b-c579c331aaec','hoi donnaaa','2024-12-06 04:40:58'),('7c4b6097-2250-4f9c-9795-da75de2b9cde','9f7899ef-8094-4b58-9eed-77b5f7d381dd','jioavjasvopasopvaosvasv','25564fc0-db8d-4084-a53b-c579c331aaec','ssssssssssssssss','2024-12-06 05:18:06'),('88e22b8c-2eea-4b47-b556-1fbf82eaa26d','b9d497e2-1171-4019-a920-bedabc584dc8','asvasgasgbhababd','jioavjasvopasopvaosvasv','mukang tite','2024-12-06 04:30:20'),('babfa14e-8485-4673-9afc-b367e4391891','b9d497e2-1171-4019-a920-bedabc584dc8','jioavjasvopasopvaosvasv','asvasgasgbhababd','ascasc','2024-12-06 04:30:14'),('bc66079f-f22f-43c3-9a95-15a8613b56fc','762a34de-4b57-4f76-bb52-7af0410bac50','jioavjasvopasopvaosvasv','197fba03-e6d9-4f7f-94ac-4b39a9acd476','ascasc','2024-12-05 18:39:58'),('bcbb5a00-23d7-4abe-99cd-6ca5867f359a','a3823df0-684f-4013-a428-ba6de65154e7','uid1','25564fc0-db8d-4084-a53b-c579c331aaec','ssssssssssssssss','2024-12-06 05:17:42'),('bf4ec006-c696-42e5-9bee-a99cbff88090','f00fd6c8-4963-499b-9df2-08a62cde5a6f','25564fc0-db8d-4084-a53b-c579c331aaec','jdslfjskfj','what the frick','2024-12-06 04:40:25'),('ce39a805-dc66-41a4-8116-cca98d9b4546','f00fd6c8-4963-499b-9df2-08a62cde5a6f','jdslfjskfj','25564fc0-db8d-4084-a53b-c579c331aaec','hdkjashdkjashakjshdakjshkjasdhk','2024-12-06 04:39:46'),('de8956ac-bce8-4a5c-b726-e144caa8f7f3','762a34de-4b57-4f76-bb52-7af0410bac50','jioavjasvopasopvaosvasv','197fba03-e6d9-4f7f-94ac-4b39a9acd476','fgnfgn','2024-12-05 18:49:41'),('f1baa75d-b6e2-4095-8248-953281c557ae','c77c2e77-38b5-4429-acf0-6b6694696236','jioavjasvopasopvaosvasv','uid1','ascasc','2024-12-05 18:39:48');
/*!40000 ALTER TABLE `private_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` varchar(150) NOT NULL,
  `role` enum('Alumni','Manager','Admin') DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(150) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `job_role` varchar(150) DEFAULT NULL,
  `bio` longtext,
  `profile_picture` mediumtext,
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isOnline` tinyint(1) DEFAULT '0',
  `isPrivate` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `primary_email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('197fba03-e6d9-4f7f-94ac-4b39a9acd476','Alumni','mork','mork','dela cruz','morkkk','mork@gmail.com','123456','','','','','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/67508cb8422b67469127/view?project=674c022d00339c9cad92&mode=admin','2024-12-04 17:03:33',0,0),('22d47ae2-6f3a-4a27-904d-d60cd46de9bb','Alumni','Giovanni','Modesto','Leo','giovanni123','2232254@slu.edu.ph','123456',NULL,NULL,NULL,NULL,NULL,'2024-12-06 05:15:27',0,0),('25564fc0-db8d-4084-a53b-c579c331aaec','Manager','Julius','Badua','Teodoro','i1uvza','donna@gmail.com','helloworld','','Saint Louis University','','','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/674ebc5c00240f4ca9f2/view?project=674c022d00339c9cad92&project=674c022d00339c9cad92&mode=admin','2024-12-03 15:30:40',0,1),('8918428e-2c9c-4a6b-bf79-7a78e7efe2ed','Manager','agergqwgwse','hgsdsd','bsdnsdn','sdnsdnsdns','sdnsd@c.com','avsasvASa@@123123',NULL,'ascasvasvasv',NULL,NULL,NULL,'2024-12-03 11:47:50',0,0),('asvasgasgbhababd','Manager','Judrey','','Padsuyan','judrey123','judrey@gmail.com','helloworld','124124','Saiitnascas','Studnet','acscascascascascasc','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/67527d5017ad4cbe8735/view?project=674c022d00339c9cad92&mode=admin','2024-12-04 13:53:40',0,0),('fsfdfsfsf','Manager','Manager',NULL,'Manager','manager123','manager@gmail.com','helloworld',NULL,NULL,NULL,NULL,NULL,'2024-12-03 12:54:57',0,0),('jdslfjskfj','Alumni','Arvy',NULL,'Aggabao','arvy123','arvy@gmail.com','helloworld','12345678900','Saint Louis University','Student','jdfskljsdlkjf',NULL,'2024-12-03 12:54:57',0,1),('jioavjasvopasopvaosvasv','Manager','Ace','','Ngaosi','ace123','ace@gmail.com','helloworld','9286040455','Saint Louis University','Student','ascasc',NULL,'2024-12-04 13:53:18',0,0),('uid1','Admin','Giovanni','M.','Leo','admin123','giovanni100@gmail.com','helloworld','','','','','https://cloud.appwrite.io/v1/storage/buckets/674c025e00102761c23f/files/675326fd40defccc7ea6/view?project=674c022d00339c9cad92&mode=admin','2024-12-03 12:54:57',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-07 23:22:24
