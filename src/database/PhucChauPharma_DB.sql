-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: phucchaupharma
-- ------------------------------------------------------
-- Server version	8.0.41

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (4,'Nguyễn Văn A','vana@gmail.com','84357550219','Phường Minh Khai, Thành phố Hà Giang, Tỉnh Hà Giang'),(5,'Nguyễn Văn B','vana@gmail.com','+84357550219','Xã Má Lé, Huyện Đồng Văn, Tỉnh Hà Giang'),(6,'Nguyễn Văn B','vana@gmail.com','6767676767','Xã Lý Bôn, Huyện Bảo Lâm, Tỉnh Cao Bằng');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (4,4,21,2,121000.0000),(5,4,26,1,121000.0000),(6,5,20,4,22000.0000),(7,6,21,2,50000.0000);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (4,4,'2026-01-12 15:42:53','Đang xử lý',121000.0000,'Ghi chú',1),(5,5,'2026-01-12 15:44:04','Đang xử lý',22000.0000,'Ghi chú',1),(6,6,'2026-01-12 15:44:49','Đang xử lý',50000.0000,'Ghi chú',1);
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
  `image1` varchar(255) NOT NULL COMMENT 'Đường dẫn ảnh sản phẩm',
  `category` varchar(100) NOT NULL COMMENT 'Loại sản phẩm (Vitamin & Khoáng chất, Thực phẩm bổ sung, Hỗ trợ sức khỏe, Chăm sóc sắc đẹp, ...)',
  `unit` varchar(50) NOT NULL DEFAULT 'Hộp' COMMENT 'Đơn vị tính (Hộp, Chai, Viên, Gói, Lọ, Túi, ...)',
  `quantity` int NOT NULL COMMENT 'Số lượng tồn kho',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (20,'Kẹo con vịt hỗ trợ tăng cường đề kháng Vitamin C 10mg Domesco (12 viên)','Kẹo con vịt Vitamin C 10mg Domesco là sự pha trộn độc đáo kết hợp các lợi ích của vitamin C, giúp bảo vệ miễn dịch mạnh mẽ chống lại virus và bệnh tật. Viên kẹo ngậm dễ tan, hấp thu nhanh và hương vị trái cây thơm ngon sẽ kích thích vị giác của trẻ. Những viên kẹo này cũng không chứa gelatin và gluten.',5500.0000,'/1768206333544.jpg','Vitamin & Khoáng chất','Chai',6),(21,'Viên sủi giúp bổ sung Vitamin MyVita Multi SPM vị cam (20 viên)','MyVita Multivitamin Cam bổ sung vitamin và khoáng chất đặc biệt quan trọng trong cơ thể, giúp giảm mệt mỏi, hỗ trợ tăng cường sức khỏe, tăng sức đề kháng cho cơ thể. Duy trì tinh thần tích cực, năng động cho cả ngày dài học tập và làm việc.',25000.0000,'/1768206419865.jpg','Vitamin & Khoáng chất','Tuýp',19),(22,'Viên sủi bổ sung vitamin và khoáng chất Plusssz Max Multivitamin orange flavoured (20 viên)','Dạng bào chế\r\n\r\nViên sủi\r\nQuy cách\r\n\r\nTuýp 20 viên\r\nNhà sản xuất\r\n\r\nNP PHARMA LTD\r\nNước sản xuất\r\n\r\nBa Lan\r\nThành phần\r\n\r\nVitamin B1, Vitamin D3, Vitamin B3, Vitamin E, Vitamin B5, Zinc, Vitamin B6, Vitamin B2, Folic Acid, Biotin, Selenium, Vitamin B12\r\nHạn sử dụng\r\n\r\n24 tháng',40000.0000,'/1768206526773.jpg','Vitamin & Khoáng chất','Tuýp',55),(23,'Cốm lợi sữa MumMilk tăng tiết sữa, tăng chất lượng sữa (20 gói)','Dạng bào chế\r\n\r\nCốm pha dung dịch uống\r\nQuy cách\r\n\r\nHộp 20 Gói x 3g\r\nNhà sản xuất\r\n\r\nGOOD HEALTH\r\nNước sản xuất\r\n\r\nViệt Nam\r\nThành phần\r\n\r\nCalcium lactate, Cao Hạt Bông Gạo, Acid amin, Đông trùng hạ thảo\r\nHạn sử dụng\r\n\r\n36 tháng',43000.0000,'/1768206614859.jpg','Vitamin & Khoáng chất','Hộp',34),(24,'Dung dịch bổ sung kẽm Conipa CPC1 Hà Nội (4 vỉ x 5 ống)','Dạng bào chế\r\n\r\nDung dịch\r\nQuy cách\r\n\r\nHộp 4 Vỉ x 5 Ống x 5ml\r\nNhà sản xuất\r\n\r\nCÔNG TY CỐ PHẨN DƯỢC PHẨM CPC1 HÀ NỘI\r\nNước sản xuất\r\n\r\nViệt Nam\r\nHỗ trợ\r\n\r\nTiêu chảy, Suy dinh dưỡng, Suy giảm hệ miễn dịch\r\nThành phần\r\n\r\nMangan gluconat, Zinc gluconate, Magnesi pidolat\r\nHạn sử dụng\r\n\r\n36 tháng',64000.0000,'/1768206704949.jpg','Vitamin & Khoáng chất','Hộp',12),(26,'Viên hỗ trợ giảm sự tiến triển của u xơ tử cung Trinh Nữ Hoàng Cung Dolexphar (60 viên)','Trinh Nữ Hoàng Cung An Phát là sản phẩm hỗ trợ cải thiện tình trạng u nang buồng trứng, u xơ tử cung, u tuyến vú lành tính. Ngoài ra, sản phẩm còn giúp hoạt huyết, hóa ứ và giảm các triệu chứng u xơ, phì đại lành tính tuyến tiền liệt, tiểu són, tiểu tiện khó ở nam giới rất hiệu quả.',71000.0000,'/1768206939580.jpg','Sinh lý - Nội tiết tố','Hộp',44),(27,'Viên uống hỗ trợ bổ thận, tăng cường sinh lực Sâm Nhung Bổ Thận NV (30 viên)','Sâm Nhung Bổ Thận NV ra đời dựa trên sự kết hợp giữa tinh hoa y học cổ truyền và ứng dụng công nghệ sản xuất hiện đại. Sản phẩm có chứa rất nhiều thành phần quý, đặc biệt tốt cho những nam giới bị suy giảm chức năng thận.',125000.0000,'/1768207074643.jpg','Sinh lý - Nội tiết tố','Hộp',16),(28,'Viên hỗ trợ giảm nguy cơ lão hóa da Emmats TW3 (2 vỉ x 10 viên)','Viên uống Emmats là thực phẩm chức năng giúp hỗ trợ chống lão hóa, tăng cường sức khỏe cho phụ nữ. Sản phẩm là chìa khóa hỗ trợ, cải thiện các vấn đề liên quan đến sức khỏe và sinh lý. Đặc biệt có khả năng làm suy giảm nội tiết tố như nám da, nếp nhăn, mất ngủ, bốc hỏa, mệt mỏi, đồng thời nâng cao chất lượng cuộc sống của họ.',165000.0000,'/1768207181221.jpg','Sinh lý - Nội tiết tố','Hộp',13);
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

-- Dump completed on 2026-01-12 22:18:07
