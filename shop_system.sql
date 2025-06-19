-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-06-18 19:00:03
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

CREATE DATABASE IF NOT EXISTS `shop_system`;

USE `shop_system`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `shop_system`
--

-- --------------------------------------------------------

--
-- 資料表結構 `cart_items`
--
-- 建立時間： 2025-06-06 14:50:00
--

CREATE TABLE `cart_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `quantity`, `added_at`) VALUES
(23, 1, 6, 1, '2025-06-07 20:50:50'),
(24, 1, 14, 1, '2025-06-07 20:50:54'),
(25, 1, 20, 1, '2025-06-07 20:51:00'),
(26, 1, 26, 1, '2025-06-07 20:51:10');

-- --------------------------------------------------------

--
-- 資料表結構 `favorites`
--
-- 建立時間： 2025-06-06 14:26:39
-- 最後更新： 2025-06-18 16:02:27
--

CREATE TABLE `favorites` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `product_id`, `added_at`) VALUES
(10, 1, 2, '2025-06-18 16:02:25'),
(11, 1, 7, '2025-06-18 16:02:27');

-- --------------------------------------------------------

--
-- 資料表結構 `members`
--
-- 建立時間： 2025-06-06 14:54:04
--

CREATE TABLE `members` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `birth` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `members`
--

INSERT INTO `members` (`id`, `name`, `birth`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'admin', 'admin', '2025-06-06 22:53:46', '2025-06-06 22:53:57');

-- --------------------------------------------------------

--
-- 資料表結構 `products`
--
-- 建立時間： 2025-06-06 14:28:42
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `subtype` varchar(20) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `type`, `subtype`, `img`) VALUES
(1, '斜條紋背心', 150, '上身類', '短袖', 'https://storage.googleapis.com/shop-img/short_sleeves/short_sleeves-01.png'),
(2, '直條紋黃色短袖', 500, '上身類', '短袖', 'https://storage.googleapis.com/shop-img/short_sleeves/short_sleeves-02.png'),
(3, 'S型圖案短袖', 570, '上身類', '短袖', 'https://storage.googleapis.com/shop-img/short_sleeves/short_sleeves-03.png'),
(4, '經典墨綠長袖', 799, '上身類', '長袖', 'https://storage.googleapis.com/shop-img/long_sleeves/long_sleeves-01.png'),
(5, '舒適外套', 999, '上身類', '休閒外套', 'https://storage.googleapis.com/shop-img/coats/coats-01.png'),
(6, '藍色休閒短褲', 350, '下身類', '短褲', 'https://storage.googleapis.com/shop-img/shorts/shorts-01.png'),
(7, '黑色工作褲', 990, '下身類', '長褲', 'https://storage.googleapis.com/shop-img/pants/pants-01.png'),
(8, '卡其拼接褲', 450, '下身類', '長褲', 'https://storage.googleapis.com/shop-img/pants/pants-02.png'),
(9, '條紋橘綠七分褲', 350, '下身類', '長褲', 'https://storage.googleapis.com/shop-img/pants/pants-03.png'),
(10, '藍色條紋短裙', 1290, '下身類', '裙子', 'https://storage.googleapis.com/shop-img/skirts/skirts-01.png'),
(11, '細肩帶藍色長裙', 1590, '下身類', '裙子', 'https://storage.googleapis.com/shop-img/skirts/skirts-02.png'),
(12, '雛菊短裙', 990, '下身類', '裙子', 'https://storage.googleapis.com/shop-img/skirts/skirts-03.png'),
(13, '日常帆布包', 680, '配件', '包包', 'https://storage.googleapis.com/shop-img/bags/bags-01.png'),
(14, '穿搭墨鏡', 490, '配件', '眼鏡', 'https://storage.googleapis.com/shop-img/glasses/glasses-01.png'),
(15, '藍點休閒遮陽帽', 599, '配件', '帽子', 'https://storage.googleapis.com/shop-img/hats/hats-01.png'),
(16, '黃色圓帽', 399, '配件', '帽子', 'https://storage.googleapis.com/shop-img/hats/hats-02.png'),
(17, '薰衣草紫色緞帶帽', 999, '配件', '帽子', 'https://storage.googleapis.com/shop-img/hats/hats-03.png'),
(18, '經典條紋棒球帽', 300, '配件', '帽子', 'https://storage.googleapis.com/shop-img/hats/hats-04.png'),
(19, '星芒吊墜', 1190, '配件', '項鍊', 'https://storage.googleapis.com/shop-img/necklaces/necklaces-01.png'),
(20, '經典籃球鞋', 3280, '配件', '鞋子', 'https://storage.googleapis.com/shop-img/shoes/shoes-01.png'),
(21, '都會漫步靴', 1990, '配件', '鞋子', 'https://storage.googleapis.com/shop-img/shoes/shoes-02.png'),
(22, '蝴蝶結短襪(雙)', 290, '配件', '襪子', 'https://storage.googleapis.com/shop-img/socks/socks-01.png'),
(23, '復古綠短襪(雙)', 190, '配件', '襪子', 'https://storage.googleapis.com/shop-img/socks/socks-02.png'),
(24, '俏皮圓點長襪(雙)', 300, '配件', '襪子', 'https://storage.googleapis.com/shop-img/socks/socks-03.png'),
(25, '斜紋領帶', 799, '配件', '領帶', 'https://storage.googleapis.com/shop-img/ties/ties-01.png'),
(26, '舒適口罩(10片)', 350, '其他', '口罩', 'https://storage.googleapis.com/shop-img/masks/masks-01.png'),
(27, '雨傘', 399, '其他', '雨傘', 'https://storage.googleapis.com/shop-img/umbrellas/umbrellas-01.png'),
(28, '貼身墨綠三角內褲', 99, '其他', '內褲', 'https://storage.googleapis.com/shop-img/underwear/underwear-01.png'),
(29, '格紋羊毛圍巾', 1800, '配件', '圍巾', 'https://storage.googleapis.com/shop-img/scarves%20/scarfs-01.png'),
(30, '米色紋圍巾', 1100, '配件', '圍巾', 'https://storage.googleapis.com/shop-img/scarves%20/scarfs-02.png'),
(31, '珊瑚紅圍巾', 999, '配件', '圍巾', 'https://storage.googleapis.com/shop-img/scarves%20/scarfs-03.png'),
(32, '文青綠圍巾', 900, '配件', '圍巾', 'https://storage.googleapis.com/shop-img/scarves%20/scarfs-04.png'),
(33, '陽光格紋圍巾', 1500, '配件', '圍巾', 'https://storage.googleapis.com/shop-img/scarves%20/scarfs-05.png');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cart_user` (`user_id`),
  ADD KEY `fk_cart_product` (`product_id`);

--
-- 資料表索引 `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_product_unique` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- 資料表索引 `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;

--
-- 資料表的限制式 `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
