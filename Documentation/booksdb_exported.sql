-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: books
-- ------------------------------------------------------
-- Server version	5.7.31

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

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `authorID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `nationality` varchar(30) NOT NULL,
  `birthYear` int(10) unsigned NOT NULL,
  `deathYear` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'Miguel','de Cervantes Saavedra','Spanish',1547,1616),(2,'Charles','Dickens','British',1812,1870),(3,'J.R.R.','Tolkien','British',1892,1973),(4,'Antoine','de Saint-Exupery','French',1900,1944),(5,'J.K.','Rowling','British',1965,NULL),(6,'Agatha','Christie','British',1890,1976),(7,'Cao','Xueqin','Chinese',1715,1763),(8,'Henry','Rider Haggard','British',1856,1925),(9,'C.S.','Lewis','British',1898,1963),(10,'Albert','Camus','French',1913,1960),(11,'Kazuo','Ishiguro','Brittish',1954,0),(12,'Margaret','Atwood','Canadian',1939,0),(13,'Jorge Luis','Borges','Argentine',1899,1986);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `bookID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bookTitle` varchar(255) NOT NULL,
  `originalTitle` varchar(255) DEFAULT NULL,
  `yearofPublication` int(11) NOT NULL DEFAULT '0',
  `genre` varchar(30) NOT NULL,
  `millionsSold` int(10) unsigned NOT NULL,
  `languageWritten` varchar(30) NOT NULL,
  `coverImagePath` varchar(255) NOT NULL,
  `authorID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`bookID`),
  KEY `fk_author` (`authorID`),
  CONSTRAINT `fk_author` FOREIGN KEY (`authorID`) REFERENCES `author` (`authorID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Don Quixote','El Ingenioso Hidalgo Don Quixote de la Mancha',1605,'Novel',500,'Spanish','don-quixote-87.jpg',1),(2,'A Tale of Two Cities','A Tale of Two Cities',1859,'Historical Fiction',200,'English','tale_of_two_cities.jpg',2),(3,'The Lord of the Rings','The Lord of the Rings',1954,'Fantasy, Adventure',150,'English','lotr.jpg',3),(4,'The Litle Prince','Le Petit Prince',1943,'Fable',142,'French','the_little_prince.jpg',4),(5,'Harry Potter and the Sorcerer&#x27;s Stone','Harry Potter and the Sorcerer&#x27;s Stone',1997,'Fantasy Fiction',107,'English','harry_potter.jpg',5),(6,'And Then There Were None','Ten Little Niggers',1939,'Mystery',100,'English','and_then_there_were_none.jpg',6),(7,'The Dream of the Red Chamber','The Story of the Stone',1792,'Novel',100,'Chinese','red_chamber.jpg',7),(8,'The Hobbit ','There and Back Again',1937,'High Fantasy',100,'English','hobbit_.jpg',3),(9,'She: A History of Adventure','She',1886,'Fiction',100,'English','she.jpg',8),(10,'The Lion, the Witch and the Wardrobe','The Lion, the Witch and the Wardrobe',1950,'Fantasy',85,'English ','tlwatw.jpg',9),(12,'The Stranger','The Stranger',1942,'Absurdist Fiction',150,'English','camus-albert-the-stranger.jpg',10),(24,'Klara and the Sun','Klara and the Sun',2021,'science fiction, dystopian',13,'English','ishiguro-kazuo-klara-and-the-sun.png',11),(28,'The Handmaid&#x27;s Tale','The Handmaid&#x27;s Tale',1985,'Dystopian Novel, Tragedy',30,'English','handmaids_tale.jpg',12);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookplot`
--

DROP TABLE IF EXISTS `bookplot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookplot` (
  `bookPlotID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `plot` blob NOT NULL,
  `plotSource` varchar(255) NOT NULL,
  `bookID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`bookPlotID`),
  KEY `fk_bookID_P` (`bookID`),
  CONSTRAINT `fk_bookID_P` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookplot`
--

LOCK TABLES `bookplot` WRITE;
/*!40000 ALTER TABLE `bookplot` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookplot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `dateCreated` datetime NOT NULL,
  `dateChanged` datetime DEFAULT NULL,
  `bookID` int(10) unsigned NOT NULL,
  `userID` int(10) unsigned NOT NULL,
  KEY `fk_bookID_C` (`bookID`),
  KEY `fk_userID_C` (`userID`),
  CONSTRAINT `fk_bookID_C` FOREIGN KEY (`bookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userID_C` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES ('2021-11-17 23:45:22','2021-11-17 23:55:31',24,6),('2021-11-17 23:45:22','2021-11-18 12:03:47',1,8),('2021-11-17 23:45:22','2021-11-18 12:04:02',2,8),('2021-11-17 23:45:22','2021-11-18 12:20:01',3,6),('2021-11-17 23:45:22','2021-11-18 12:04:12',4,8),('2021-11-17 23:45:22','2021-11-18 12:05:56',5,8),('2021-11-17 23:45:22','2021-11-18 12:04:24',6,8),('2021-11-17 23:45:22','2021-11-18 12:04:29',7,8),('2021-11-17 23:45:22','2021-11-18 12:04:35',8,8),('2021-11-17 23:45:22','2021-11-18 12:05:07',9,8),('2021-11-17 23:45:22','2021-11-18 12:04:42',10,8),('2021-11-17 23:45:22','2021-11-24 12:47:08',12,8),('2021-11-18 17:58:58','2021-11-18 19:01:35',28,6);
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `accessRights` varchar(200) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Dallas','Little','dallas@hotmail.com','dallasli','$2b$06$kKSTtc3GGTn.wzOPWdaWfeCjPrMOz.iPjapoaEy8J6Z1lhsA3u3MW','admin'),(6,'Clare','Scarce','imfeelingveryolympictoday@gmail.com','klak','$2b$06$AHsaNvprL6i0SSCM38NA2ek6pOoDepKVGTENxD0vqUPdq3SQn5q6a','admin'),(7,'Pamela','Rosel','pamrosel.is@gmail.com','spam','$2b$06$eDq2FcYRJ0zlviekAjPpUe2X0tLL2sY7e8JuBbwVJHCQicrEriulW','admin'),(8,'Gregory','Robertson','gregoryrobertson@hotmail.com','gregro','$2b$06$CsubB41hQRc5uuYIDphF9.Riz6vJN0MyPEppf0w127reSbzt0jbXy','staff'),(9,'Finnian','Crocker','crockerd0g@hotmail.com','finr','$2b$06$95AJuKE5JKGrmV70iyM68uMfFuVAmmJq24bRsxajD85hQKBA9sgdW','staff'),(13,'Jasper','Riedel','jr@gmail.com','jr','$2b$06$8hLBzeFgqiszo8M9etYvF.1vGQkIyt3IW3tL5AfvCQ.jcdXhN3GXu','admin'),(14,'Callum','Galletly','cg@gmail.com','cal','$2b$06$Iut.Y6mVcY6gML1BoxxwYemnZsEB3QvdwVVciKhwdxdpNapzzQd12','admin'),(15,'Mitchell','Perkins','mp@gmail.com','mordranin','$2b$06$UeRhzCwXZjLo0KlR6ciXZ.CRZQb/S4WPU7qdqfsMXmja8cA1qgvIu','staff');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-27 19:45:38
