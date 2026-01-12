CREATE DATABASE  IF NOT EXISTS `sneakerstore` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sneakerstore`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sneakerstore
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT COMMENT 'Mã định danh admin.',
  `admin_name` varchar(255) NOT NULL COMMENT 'Họ tên admin',
  `admin_email` varchar(255) NOT NULL COMMENT 'Email admin dùng để đăng nhập',
  `admin_password` varchar(255) NOT NULL COMMENT 'Mật khẩu admin dùng để đăng nhập',
  `admin_phone` varchar(15) NOT NULL COMMENT 'Số điện thoại admin',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Nguyễn Đình Trí','admin','admin','0357550219');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT COMMENT 'Mã định danh khách hàng',
  `fullname` varchar(255) NOT NULL COMMENT 'Họ tên khách hàng',
  `email` varchar(255) NOT NULL COMMENT 'Email khách hàng',
  `phone_number` varchar(15) NOT NULL COMMENT 'Số điện thoại khách hàng',
  `address` varchar(255) NOT NULL COMMENT 'Địa chỉ',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (250,'Nguyễn Đình Trí','tringuyen.21092003@gmail.com','(+84) 357550219','Xã Lũng Táo, Huyện Đồng Văn, Tỉnh Hà Giang'),(251,'Nguyễn Văn A','tringuyen.21092003@gmail.com','(+84) 357550219','Xã Lũng Cú, Huyện Đồng Văn, Tỉnh Hà Giang'),(252,'Nguyễn Đình Trí','tringuyen.21092003@gmail.com','(+84) 357550219','Xã Cô Ba, Huyện Bảo Lạc, Tỉnh Cao Bằng'),(253,'Nguyễn Đình Trí','tringuyen.21092003@gmail.com','(+84) 357550219','Xã Thượng Hà, Huyện Bảo Lạc, Tỉnh Cao Bằng'),(254,'Nguyễn Đình Trí','tringuyen.21092003@gmail.com','(+84) 357550219','Thị trấn Tủa Chùa, Huyện Tủa Chùa, Tỉnh Điện Biên'),(257,'Nguyễn Đình Trí','tringuyen.21092003@gmail.com','(+84) 357550219','Xã Má Lé, Huyện Đồng Văn, Tỉnh Hà Giang');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT COMMENT 'Mã định danh đơn hàng',
  `order_id` int NOT NULL COMMENT 'Mã đơn hàng',
  `product_id` int DEFAULT NULL COMMENT 'Mã sản phẩm',
  `quantity` int NOT NULL COMMENT 'Số lượng sản phẩm đặt mua',
  `total_amount_product` decimal(15,4) NOT NULL COMMENT 'Giá mỗi sản phẩm',
  PRIMARY KEY (`order_detail_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=314 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (303,237,7,4,3580000.0000),(304,238,16,2,6180000.0000),(305,239,7,3,2685000.0000),(306,240,7,3,2685000.0000),(307,241,3,4,6735000.0000),(308,241,5,3,6735000.0000),(309,242,43,9,19800000.0000),(313,245,1,10,8000000.0000);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT COMMENT 'Mã định danh đơn hàng',
  `customer_id` int NOT NULL COMMENT 'Mã khách hàng',
  `order_date` datetime NOT NULL COMMENT 'Ngày đặt hàng',
  `order_status` varchar(50) NOT NULL COMMENT 'Trạng thái đơn hàng',
  `total` decimal(15,4) NOT NULL DEFAULT '0.0000' COMMENT 'Tổng giá trị đơn hàng',
  `order_note` varchar(255) DEFAULT NULL COMMENT 'Ghi chú đặt hàng',
  `payment_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `orders_payment_idx` (`payment_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `orders_payment` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (237,250,'2024-01-12 02:12:58','Đang xử lý',3580000.0000,'',1),(238,251,'2024-01-12 02:15:08','Đang xử lý',6180000.0000,'Khóm 6',1),(239,252,'2024-01-12 02:16:18','Đang xử lý',2685000.0000,'',1),(240,253,'2024-01-12 02:24:48','Đang xử lý',2685000.0000,'Khóm 3',1),(241,253,'2024-01-12 02:27:15','Đang xử lý',6735000.0000,'Khóm 2',1),(242,254,'2024-01-12 03:03:50','Đang xử lý',19800000.0000,'Phường C',1),(245,257,'2024-01-12 03:25:35','Đang xử lý',8000000.0000,'',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL,
  `payment_method` varchar(255) NOT NULL COMMENT '- Thanh toán khi nhận hàng (cod)\n- Chuyển khoản ngân hàng  (bacs)',
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'Thanh toán khi nhận hàng'),(2,'Chuyển khoản ngân hàng');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT COMMENT 'Mã định danh sản phẩm',
  `name` varchar(255) NOT NULL COMMENT 'Tên sản phẩm',
  `description` text NOT NULL COMMENT 'Mô tả sản phẩm',
  `price` decimal(15,4) NOT NULL DEFAULT '0.0000' COMMENT 'Giá của sản phẩm',
  `image1` varchar(255) NOT NULL COMMENT 'Đường dẫn ảnh 1 sản phẩm',
  `brand` varchar(100) NOT NULL COMMENT 'Tên thương hiệu',
  `color` varchar(50) NOT NULL,
  `size` varchar(11) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Adidas Forum 84 Low ADV Shoes Cloud White Blue Bird','Với thiết kế dựa trên mẫu giày thể thao cổ điển Forum, Adidas đã nâng cấp và áp dụng công nghệ tiên tiến vào Giày Adidas Forum 84 Low ADV Shoes ‘Cloud White Blue Bird’. Điều này giúp mang đến sự kết hợp hoàn hảo giữa vẻ đẹp cổ điển và tính năng hiện đại, đáp ứng tối đa nhu cầu của người dùng trong thời đại.',800000.0000,'/products-img/Adidas/Adidas-Forum/Adidas-Forum-84-Low-ADV/Giày-Adidas-Forum-84-Low-ADV-Shoes-Cloud-White-Blue-Bird.jpg','Adidas','Trắng','39',0),(2,'Adidas Forum 84 Low ADV Shoes Cloud White Blue Bird','Với thiết kế dựa trên mẫu giày thể thao cổ điển Forum, Adidas đã nâng cấp và áp dụng công nghệ tiên tiến vào Giày Adidas Forum 84 Low ADV Shoes ‘Cloud White Blue Bird’. Điều này giúp mang đến sự kết hợp hoàn hảo giữa vẻ đẹp cổ điển và tính năng hiện đại, đáp ứng tối đa nhu cầu của người dùng trong thời đại.',800000.0000,'/products-img/Adidas/Adidas-Forum/Adidas-Forum-84-Low-ADV/Giày-Adidas-Forum-84-Low-ADV-Shoes-Cloud-White-Blue-Bird.jpg','Adidas','Trắng','41',94),(3,'Adidas Originals Superstar Cappuccino Full White','Giày Adidas Originals Superstar Cappuccino Full White là một phiên bản đặc biệt và đầy sự tinh tế của dòng giày huyền thoại Adidas Superstar. Với sắc trắng tinh khôi từ trên xuống dưới, đôi giày này mang trong mình vẻ đẹp cổ điển và thanh lịch hiện đại. Bài viết dưới đây sẽ giới thiệu chi tiết về những điểm nổi bật và lý do tại sao Giày Adidas Originals Superstar Cappuccino Full White là một lựa chọn hoàn hảo cho người yêu thích thời trang và phong cách cá nhân.',600000.0000,'/products-img/Adidas/Adidas-Forum/Adidas-originals-superstar-cappuccino/adidas-originals-superstar-cappuccino.jpg','Adidas','Trắng','41',36),(5,'Balenciaga BALENCIAGA TRIPLE S CLEAR SOLE SNEAKER IN GRAY WHITE','Giày được làm từ chất liệu da cao cấp, có độ bền và khả năng chống thấm nước tốt. Phần đế giữa được làm từ chất liệu EVA, mang đến sự êm ái và thoải mái khi mang. Phần đế ngoài bằng cao su có độ bám cao, giúp người dùng di chuyển dễ dàng trên nhiều bề mặt khác nhau.',1445000.0000,'/products-img/Balenciaga/BALENCIAGA_TRIPLE_S_CLEAR_SOLE_SNEAKER_IN_GRAY_WHITE/BALENCIAGA_TRIPLE_S_CLEAR_SOLE_SNEAKER_IN_GRAY_WHITE.jpg','Balenciaga','Trắng','39',47),(6,'Converse Chuck Taylor All Star Classic Low – White','Giày Converse Chuck Taylor All Star Classic Low Top White với thiết kế trẻ trung và năng động, kết hợp với chất liệu bền đẹp, mềm mại, mang lại cảm giác êm ái trên từng bước chân, giúp người mang tự tin thể hiện phong cách cá nhân. Converse sử dụng chất liệu vải canvas dày dặn, bền đẹp may sản phẩm, đường chỉ may tinh tế, tỉ mỉ. Lót giày êm, hỗ trợ di chuyển, thoải mái khi mang. Đế giày có rãnh chống trơn trượt đảm bảo sự an toàn tuyệt đối cho bạn trong suốt quá trình di chuyển. Kiểu giày Converse luôn được ưa chuộng vì dễ kết hợp với nhiều loại trang phục khác nhau: áo thun, sơ mi, jeans,.... Với đôi giày này bạn có thể chọn quần jeans với áo pull đơn giản. Bạn mix theo kiểu tone xuyệt tone để mang tới sự hài hòa trong phong cách.',1450000.0000,'/products-img/Converse/Converse-chuck-taylor-all-star-classic-low-white/converse-chuck-taylor-all-star-classic-low-white-m7652c-768x76.jpg','Converse','Trắng','39',8),(7,'Adidas Alphabounce Beyond Cloud White','Fullbox A.l.p.h.a.bounce Beyond Cloud White. 2 ver Trắng / Đen. Phù hợp: nam nữ, đi học, đi làm, tập gym. Size: 36-44. Êm chân, thoáng khí. Giao hàng toàn quốc. Bảo hành 3 tháng. Đổi trả dễ dàng. Streetwear, trẻ trung năng động.',895000.0000,'/products-img/Adidas/Adidas-Alphabounce/Adidas-Alphabounce-Beyond-Cloud-White/Adidas-Alphabounce-Beyond-Cloud-White.png','Adidas','Trắng','39',90),(8,'Nike Air Max 97 Ultra 17 Triple White','Fullbox A.i.r Max 97 Trắng. Đế giày tăng chiều cao. Phù hợp: nam nữ, đi học, đi làm, hoạt động thể thao. Size: 36-44. Giao hàng toàn quốc. Bảo hành 3 tháng. Đổi trả dễ dàng. Streetwear, trẻ trung năng động.',597500.0000,'/products-img//Nike/Nike-Air-Max/Air-Max-97-Ultra-17-Triple-White/Air-Max-97-Ultra-17-Triple-White.png','Nike','Trắng','39',0),(15,'Adidas Originals Forum 84 Low OG Noble Green','Trong làng giày thể thao, Adidas luôn nổi tiếng với việc kết hợp giữa phong cách cổ điển và hiện đại trong thiết kế sản phẩm của họ. Và đôi giày Adidas Originals Forum 84 Low OG Noble Green không phải là ngoại lệ. Với sự tái hiện tuyệt vời của phong cách cổ điển, đôi giày này mang đến vẻ đẹp lôi cuốn và cá tính độc đáo. Hãy cùng chúng tôi khám phá về thiết kế hấp dẫn này và tại sao nó trở thành một biểu tượng thời trang mà bạn không thể bỏ qua.',800000.0000,'/products-img/Adidas/Adidas-Forum/Adidas-originals-forum-84-low-og-noble-green-sieu-cap/giay-adidas-originals-forum-84-low-og-noble-green-sieu-cap.jpg','Adidas','Trắng','40',100),(16,'Nike Air Max SC SE Red Stardust Deep Jungle','Giày (WMNS) Nike Air Max SC SE ‘Red Stardust Deep Jungle\'  là sự kết hợp hoàn hảo giữa sự thoải mái và phong cách hiện đại, khiến nó trở thành lựa chọn lý tưởng cho những người đam mê giày sneaker yêu thích thiết kế độc đáo.',3090000.0000,'/products-img/Nike/Nike-Air-Max/Air-Max-SC-SE-Red-Stardust-Deep-Jungle-FB8459-600/WMNS-Nike-Air-Max-SC-SE-Red-Stardust-Deep-Jungle-FB8459-600.jpg.png','Nike','Trắng','39',98),(17,'Jason Dill vs Adidas Samba White Black GZ4730','Giày Jason Dill x Adidas Samba ‘White Black’ GZ4730 là một đôi giày thể thao cổ điển được thiết kế lại với sự tham gia của huyền thoại trượt ván Jason Dill. Đôi giày có thiết kế hai tông màu trắng đen với phần mudguard màu trắng, các sọc ba sọc màu đen và phần đế ngoài màu trắng trong mờ.',3890000.0000,'/products-img/Adidas/Jason-Dill-x-Adidas-Samba-White-Black-GZ4730/Giay-Jason-Dill-x-Adidas-Samba-White-Black-GZ4730.jpg.png','Adidas','Trắng','39',100),(18,'Adidas Samba OG White Halo Blue Gum ID2055','Giày Adidas Samba OG ‘Navy White Gum’là một đôi giày thể thao cổ điển được thiết kế với phần thân trên bằng da tổng hợp màu xanh navy, kết hợp với đế ngoài màu gum. Đôi giày có kiểu dáng đơn giản nhưng tinh tế, với các đường nét gọn gàng và thanh lịch.',3890000.0000,'/products-img/Adidas/Adidas Samba OG White Halo Blue Gum ID2055/Adidas-Samba-OG-White-Halo-Blue-Gum-ID2055.png','Adidas','Trắng','39',100),(43,'Converse Chuck Taylor All Star 1970s Low Top','Giày Converse Chuck Taylor All Star 1970s Low Top đã trở thành biểu tượng vượt thời gian trong ngành giày thể thao. Với thiết kế cổ điển, chất lượng đáng kinh ngạc và tính ứng dụng cao, đôi giày này đã trở thành lựa chọn ưa thích của nhiều thế hệ. Bài viết này sẽ tập trung vào việc giới thiệu và đánh giá những đặc điểm nổi bật của giày Converse Chuck Taylor All Star 1970s Low Top, cùng với lý do tại sao đôi giày này luôn thu hút sự quan tâm của đông đảo người tiêu dùng.',2200000.0000,'/1705003140473.jpg','Converse','Đen','40',1),(44,'Converse Chuck Taylor 1970 Parchment Low Top','Giày Converse Chuck Taylor 1970 Parchment Low Top là một phiên bản đặc biệt của giày Converse Chuck Taylor All Star, mang đậm nét cổ điển và phong cách retro.\r\nKỷ niệm sự ra đời của Chuck Taylor All Star: Giày Converse 1970s Kem Cổ Thấp có thể ra đời nhằm kỷ niệm sự thành công và lòng trung thành của dòng giày Converse Chuck Taylor All Star. Đây là một phiên bản đặc biệt để tôn vinh nguồn gốc và sự phổ biến lâu đời của mẫu giày này.',1710000.0000,'/1705006115507.jpg','Converse','Trắng','40',10),(45,'Adidas ULTRABOOST 4.0','Adidas Ultra Boost 4.0 Xám ra đời để đáp ứng nhu cầu của người tiêu dùng trong việc tìm kiếm một đôi giày chạy bộ và thể thao với sự kết hợp hoàn hảo giữa phong cách và hiệu suất.\r\nMàu xám được chọn làm màu chủ đạo cho phiên bản này để tạo nên một diện mạo trung tính, trầm tư và dễ phối đồ. Màu xám thường mang lại một cảm giác thanh lịch và trang nhã, làm cho đôi giày trở nên đa dụng và dễ dàng kết hợp với nhiều trang phục khác nhau.',2500000.0000,'/1705006833640.jpg','Adidas','Xám','40',20);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-12  4:24:38
