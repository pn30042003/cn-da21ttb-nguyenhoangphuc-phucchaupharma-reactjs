CREATE DATABASE  IF NOT EXISTS `phucchaupharma` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `phucchaupharma`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: phucchaupharma
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
INSERT INTO `admin` VALUES (1,'Admin PhucChau','admin','admin','0357550219');
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
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
  `image1` varchar(255) NOT NULL COMMENT 'Đường dẫn ảnh sản phẩm',
  `category` varchar(100) NOT NULL COMMENT 'Loại sản phẩm (Vitamin & Khoáng chất, Thực phẩm bổ sung, Hỗ trợ sức khỏe, Chăm sóc sắc đẹp, ...)',
  `unit` varchar(50) NOT NULL DEFAULT 'Hộp' COMMENT 'Đơn vị tính (Hộp, Chai, Viên, Gói, Lọ, Túi, ...)',
  `quantity` int NOT NULL COMMENT 'Số lượng tồn kho',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products` (Dữ liệu mẫu thực phẩm chức năng)
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES 
(1,'Vitamin C 1000mg','Viên sủi Vitamin C 1000mg giúp tăng cường sức đề kháng, hỗ trợ hệ miễn dịch, làm đẹp da. Thành phần chính: Acid ascorbic 1000mg, kẽm, vitamin E. Sử dụng: 1 viên/ngày, hòa tan trong 200ml nước.',150000.0000,'/products-img/vitamin-c-1000mg.jpg','Vitamin & Khoáng chất','Hộp',100),
(2,'Omega-3 Fish Oil','Dầu cá Omega-3 giúp hỗ trợ tim mạch, não bộ và thị lực. Chứa EPA 180mg, DHA 120mg mỗi viên. Chiết xuất từ cá biển sâu, không mùi tanh. Liều dùng: 2-3 viên/ngày sau bữa ăn.',450000.0000,'/products-img/omega-3-fish-oil.jpg','Thực phẩm bổ sung','Chai',80),
(3,'Collagen Peptide','Collagen thủy phân phân tử nhỏ, hấp thu tốt. Giúp làm đẹp da, chống lão hóa, tăng độ đàn hồi cho da. Thành phần: Collagen peptide 5000mg, vitamin C, E. Dùng: 1 gói/ngày pha với nước ấm.',350000.0000,'/products-img/collagen-peptide.jpg','Chăm sóc sắc đẹp','Hộp',120),
(4,'Sữa Non Alpha Lipid','Sữa non New Zealand giàu kháng thể IgG, Lactoferrin. Tăng cường miễn dịch, hỗ trợ tiêu hóa, phù hợp mọi lứa tuổi. Hộp 450g, pha 2 muỗng với 200ml nước ấm.',850000.0000,'/products-img/sua-non-alpha-lipid.jpg','Thực phẩm bổ sung','Hộp',50),
(5,'Viên Uống Đẹp Da Sakura','Viên uống đẹp da chiết xuất từ hoa anh đào Nhật Bản, giúp trắng da, mờ thâm nám. Thành phần: Chiết xuất Sakura, Glutathione, Vitamin E. Dùng: 2 viên/ngày trước bữa ăn sáng.',280000.0000,'/products-img/vien-uong-dep-da-sakura.jpg','Chăm sóc sắc đẹp','Hộp',90),
(6,'Canxi D3K2','Bổ sung canxi kết hợp vitamin D3 và K2 giúp xương chắc khỏe, phòng loãng xương. Canxi 600mg, D3 400IU, K2 45mcg/viên. Phù hợp người trưởng thành, phụ nữ mang thai.',320000.0000,'/products-img/canxi-d3k2.jpg','Vitamin & Khoáng chất','Chai',75),
(7,'Tỏi Đen Fermented','Tỏi đen lên men Hàn Quốc, giàu S-allyl cysteine. Hỗ trợ tim mạch, giảm cholesterol, tăng cường sức khỏe. Chiết xuất tỏi đen 500mg/viên. Dùng: 2 viên/ngày.',180000.0000,'/products-img/toi-den-fermented.jpg','Hỗ trợ sức khỏe','Hộp',110),
(8,'Probiotic 10 tỷ CFU','Men vi sinh đường ruột 10 tỷ CFU, 10 chủng lợi khuẩn. Cải thiện tiêu hóa, tăng cường hệ miễn dịch đường ruột. Bảo quản mát, dùng 1 viên/ngày trước bữa ăn.',250000.0000,'/products-img/probiotic-10-billion.jpg','Hỗ trợ sức khỏe','Hộp',85),
(9,'Sâm Hàn Quốc 6 Năm Tuổi','Hồng sâm Hàn Quốc 6 năm tuổi cao cấp, giúp bồi bổ sức khỏe, tăng cường sinh lực. Chiết xuất sâm 300mg, Saponin 80mg/viên. Dùng: 2 viên/ngày buổi sáng.',680000.0000,'/products-img/sam-han-quoc-6-nam.jpg','Thực phẩm bổ sung','Hộp',45),
(10,'Lutein Eye Health','Bảo vệ mắt với Lutein 20mg, Zeaxanthin 4mg. Giảm mỏi mắt, tăng cường thị lực, bảo vệ võng mạc khỏi ánh sáng xanh. Dùng: 1 viên/ngày sau bữa ăn.',380000.0000,'/products-img/lutein-eye-health.jpg','Hỗ trợ sức khỏe','Chai',70),
(11,'Nghệ Nano Curcumin','Curcumin dạng nano hấp thu cao, kháng viêm, hỗ trợ dạ dày. Curcumin 500mg/viên, tăng sinh khả dụng với tiêu chuẩn Nhật Bản. Dùng: 2 viên/ngày sau bữa ăn.',420000.0000,'/products-img/nghe-nano-curcumin.jpg','Hỗ trợ sức khỏe','Hộp',65),
(12,'Vitamin B Complex','Bổ sung 8 loại vitamin B thiết yếu, giúp tăng cường năng lượng, giảm mệt mỏi, hỗ trợ thần kinh. B1, B2, B6, B12, Acid folic. Dùng: 1 viên/ngày buổi sáng.',180000.0000,'/products-img/vitamin-b-complex.jpg','Vitamin & Khoáng chất','Chai',95),
(13,'Mầm Đậu Nành Isoflavone','Tinh chất mầm đậu nành chứa Isoflavone 40mg, giúp cân bằng nội tiết tố nữ, giảm triệu chứng mãn kinh, làm đẹp da. Dùng: 2 viên/ngày.',290000.0000,'/products-img/mam-dau-nanh-isoflavone.jpg','Chăm sóc sắc đẹp','Hộp',80),
(14,'Spirulina Xoắn Ốc','Tảo Spirulina hữu cơ giàu protein thực vật, vitamin, khoáng chất. Tăng cường sức khỏe tổng thể, bổ máu. 500mg/viên. Dùng: 4-6 viên/ngày.',220000.0000,'/products-img/spirulina-xoan-oc.jpg','Thực phẩm bổ sung','Hộp',100),
(15,'Coenzyme Q10 100mg','CoQ10 hỗ trợ tim mạch, tăng năng lượng tế bào, chống oxy hóa mạnh. CoQ10 100mg, Vitamin E. Phù hợp người trên 40 tuổi. Dùng: 1 viên/ngày.',550000.0000,'/products-img/coenzyme-q10.jpg','Hỗ trợ sức khỏe','Chai',55);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT COMMENT 'Mã định danh chi tiết đơn hàng',
  `order_id` int NOT NULL COMMENT 'Mã đơn hàng',
  `product_id` int DEFAULT NULL COMMENT 'Mã sản phẩm',
  `quantity` int NOT NULL COMMENT 'Số lượng sản phẩm đặt mua',
  `total_amount_product` decimal(15,4) NOT NULL COMMENT 'Tổng giá trị sản phẩm',
  PRIMARY KEY (`order_detail_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-29
