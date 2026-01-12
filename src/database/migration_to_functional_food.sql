-- Migration script: Refactor từ bán giày sang thực phẩm chức năng
-- Thay đổi: 
-- 1. Đổi trường 'brand' thành 'category' (loại sản phẩm)
-- 2. Đổi trường 'size' thành 'unit' (đơn vị tính: hộp, chai, viên, gói, ...)
-- 3. Bỏ trường 'color'

USE `sneakerstore`;

-- Bước 1: Thêm cột mới 'category' và 'unit'
ALTER TABLE `products` 
ADD COLUMN `category` VARCHAR(100) NOT NULL COMMENT 'Loại sản phẩm (Vitamin, Khoáng chất, Thực phẩm bổ sung, ...)' AFTER `image1`,
ADD COLUMN `unit` VARCHAR(50) NOT NULL DEFAULT 'Hộp' COMMENT 'Đơn vị tính (Hộp, Chai, Viên, Gói, Lọ, ...)' AFTER `category`;

-- Bước 2: Copy dữ liệu từ 'brand' sang 'category'
UPDATE `products` SET `category` = `brand`;

-- Bước 3: Xóa cột 'brand' và 'color'
ALTER TABLE `products` 
DROP COLUMN `brand`,
DROP COLUMN `color`;

-- Bước 4: Đổi tên cột 'size' thành 'unit' (nếu muốn giữ dữ liệu cũ)
-- Hoặc có thể set giá trị mặc định cho unit từ size
-- ALTER TABLE `products` CHANGE COLUMN `size` `unit` VARCHAR(50) NOT NULL COMMENT 'Đơn vị tính';

-- Bước 5: Xóa cột 'size' cũ (vì đã có 'unit' mới)
ALTER TABLE `products` DROP COLUMN `size`;

-- Cập nhật một số dữ liệu mẫu cho phù hợp với thực phẩm chức năng
-- Ví dụ: đổi category sang các loại thực phẩm chức năng
UPDATE `products` SET 
    `category` = CASE 
        WHEN `category` = 'Adidas' THEN 'Vitamin & Khoáng chất'
        WHEN `category` = 'Nike' THEN 'Thực phẩm bổ sung'
        WHEN `category` = 'Converse' THEN 'Hỗ trợ sức khỏe'
        WHEN `category` = 'Balenciaga' THEN 'Chăm sóc sắc đẹp'
        ELSE 'Thực phẩm chức năng'
    END,
    `unit` = 'Hộp';

-- Kiểm tra kết quả
SELECT product_id, name, category, unit, price, quantity FROM products LIMIT 10;

-- Lưu ý: Sau khi chạy migration, bạn cần:
-- 1. Backup database trước khi thực hiện
-- 2. Cập nhật code backend để sử dụng 'category' và 'unit' thay vì 'brand', 'size', 'color'
-- 3. Test kỹ tất cả các chức năng liên quan đến sản phẩm
